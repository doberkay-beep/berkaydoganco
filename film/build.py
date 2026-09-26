"""Mama Saati v2 — the couple is animated (cut out into layers and moved)."""
import os, subprocess, math, random
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
D = os.path.dirname(os.path.abspath(__file__))
SRC, OUT, FONTS = f"{D}/src", f"{D}/out2", f"{D}/fonts"
os.makedirs(OUT, exist_ok=True)
W, H, FPS, XF = 1080, 1920, 30, 0.5
WHITE, PEACH, ORANGE = (255, 255, 255), (255, 214, 170), (255, 122, 69)

def font(w, s): return ImageFont.truetype(f"{FONTS}/Poppins-{w}.ttf", s)
def run(cmd): subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
def ease(t): return 0.5 - 0.5 * math.cos(math.pi * min(max(t, 0), 1))
def back_out(t):  # overshooting pop
    t = min(max(t, 0), 1); c = 1.9
    return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2

# ---------------------------------------------------------------- layers ------
photo = ImageEnhance.Color(Image.open(f"{SRC}/photo.jpg").convert("RGB")).enhance(1.08)
PW, PH = photo.size
arr = np.array(photo)
people = np.array(Image.open(f"{SRC}/mask.png").convert("L"))

# split: man (front-left) vs woman (behind-right); polygon in full-res photo px
man_poly = np.array([(0, 520), (820, 520), (800, 1200), (720, 1380), (860, 1600), (1040, 2000), (1200, 2400), (1240, PH), (0, PH)], np.int32)
man_region = np.zeros_like(people); cv2.fillPoly(man_region, [man_poly], 255)
man_a = (people.astype(np.float32) * (man_region > 0)).astype(np.uint8)
wom_a = (people.astype(np.float32) * (man_region == 0)).astype(np.uint8)

def inpaint(img, hole, scale=4, radius=12):
    small = cv2.resize(img, (img.shape[1] // scale, img.shape[0] // scale), interpolation=cv2.INTER_AREA)
    hs = cv2.resize(hole, (small.shape[1], small.shape[0]), interpolation=cv2.INTER_NEAREST)
    fill = cv2.inpaint(small, hs, radius, cv2.INPAINT_TELEA)
    return cv2.GaussianBlur(cv2.resize(fill, (img.shape[1], img.shape[0]), interpolation=cv2.INTER_CUBIC), (0, 0), 6)

# background plate: people removed, softened for depth
hole = cv2.dilate((people > 20).astype(np.uint8) * 255, np.ones((45, 45), np.uint8))
bg_fill = inpaint(arr, hole)
k = (cv2.GaussianBlur(hole, (0, 0), 12) / 255.0)[..., None]
bg = (arr * (1 - k) + bg_fill * k).astype(np.uint8)
bg = cv2.GaussianBlur(bg, (0, 0), 2.2)
BG = Image.fromarray(bg).convert("RGBA")

# woman layer extended under the man so gaps never show when they move apart
band = cv2.dilate((wom_a > 128).astype(np.uint8), np.ones((161, 161), np.uint8)) & (man_region > 0)
wom_rgb = arr.copy()
fillw = inpaint(arr, ((man_region > 0) & (people > 20)).astype(np.uint8) * 255, scale=2, radius=20)
sel = (band > 0) & (people > 20)
wom_rgb[sel] = fillw[sel]
wom_alpha = np.maximum(wom_a, (band * 255).astype(np.uint8))
WOMAN = Image.fromarray(np.dstack([wom_rgb, wom_alpha]))
MAN = Image.fromarray(np.dstack([arr, man_a]))
WOMAN_CLEAN = Image.fromarray(np.dstack([wom_rgb, np.minimum(wom_alpha, people)]))

# pivots (photo px)
MAN_PIV = (560, 2300)     # hips/seat
WOM_PIV = (1150, 1900)
SWING_PIV = (1350, -1400) # top beam of the swing, far above frame

# ------------------------------------------------------ affine composition ------
def cam_matrix(cx, cy, ch):
    s = ch / H  # photo px per output px
    return np.array([[s, 0, cx - s * W / 2], [0, s, cy - ch / 2], [0, 0, 1.0]])

def layer_inv(angle_deg=0.0, pivot=(0, 0), tx=0.0, ty=0.0, scale=1.0):
    """Inverse of: q -> R*S*(q - pivot) + pivot + t  (maps displayed photo pt back to layer pt)."""
    a = math.radians(angle_deg)
    c, s_ = math.cos(a), math.sin(a)
    fwd = np.array([[c * scale, -s_ * scale, 0], [s_ * scale, c * scale, 0], [0, 0, 1.0]])
    T1 = np.array([[1, 0, -pivot[0]], [0, 1, -pivot[1]], [0, 0, 1.0]])
    T2 = np.array([[1, 0, pivot[0] + tx], [0, 1, pivot[1] + ty], [0, 0, 1.0]])
    return np.linalg.inv(T2 @ fwd @ T1)

def warp(img, M):
    return img.transform((W, H), Image.AFFINE, tuple(M[:2].flatten()), resample=Image.BICUBIC)

def compose(cam, bgshift, man_t, wom_t, group_t=None):
    C = cam_matrix(*cam)
    fr = warp(BG, np.linalg.inv(np.array([[1, 0, bgshift[0]], [0, 1, bgshift[1]], [0, 0, 1.0]])) @ C)
    G = layer_inv(**group_t) if group_t else np.eye(3)
    fr.alpha_composite(warp(WOMAN, layer_inv(**wom_t) @ G @ C))
    fr.alpha_composite(warp(MAN, layer_inv(**man_t) @ G @ C))
    return fr

# ---------------------------------------------------------------- text ----------
def shadow_text(img, xy, text, f, col):
    sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).text((xy[0] + 3, xy[1] + 5), text, font=f, fill=(0, 0, 0, 170))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(7)))
    ImageDraw.Draw(img).text(xy, text, font=f, fill=col)

def pill(img, text, y, f, bg=(*ORANGE, 235), pad=(44, 22)):
    d = ImageDraw.Draw(img)
    l, t, r, b = d.textbbox((0, 0), text, font=f)
    tw, th = r - l, b - t
    x0 = (W - tw) // 2 - pad[0]
    box = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(box).rounded_rectangle((x0, y, x0 + tw + 2 * pad[0], y + th + 2 * pad[1]), radius=(th + 2 * pad[1]) // 2, fill=bg)
    img.alpha_composite(box)
    ImageDraw.Draw(img).text(((W - tw) // 2 - l, y + pad[1] - t), text, font=f, fill=WHITE)
    return th + 2 * pad[1]

def gradient(img, top, height, strength, from_top=False):
    g = Image.new("L", (1, height))
    for i in range(height):
        v = i / (height - 1)
        g.putpixel((0, i), int(strength * ((1 - v) if from_top else v) ** 1.4))
    layer = Image.new("RGBA", (W, height), (0, 0, 0, 255)); layer.putalpha(g.resize((W, height)))
    img.alpha_composite(layer, (0, top))

def overlay(lines, y0, top=False):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    if top: gradient(img, 0, 700, 170, from_top=True)
    else: gradient(img, H - 900, 900, 190)
    y = y0
    for text, wgt, size, col in lines:
        if wgt == "pill":
            y += pill(img, text, y + 10, font("SemiBold", size)) + 30; continue
        f = font(wgt, size); d = ImageDraw.Draw(img)
        l, t, r, b = d.textbbox((0, 0), text, font=f)
        shadow_text(img, ((W - (r - l)) // 2 - l, y - t), text, f, col)
        y += (b - t) + int(size * 0.45)
    return img

def fade_ov(ov, a):
    if a >= 1: return ov
    o = ov.copy(); o.putalpha(o.getchannel("A").point(lambda v: int(v * max(a, 0)))); return o

# ------------------------------------------------------------- particles ---------
def heart(size, col):
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    r = size // 4
    d.ellipse((0, 0, 2 * r, 2 * r), fill=col); d.ellipse((2 * r, 0, 4 * r, 2 * r), fill=col)
    d.polygon([(0, r + 2), (4 * r, r + 2), (2 * r, size - 1)], fill=col)
    return im

def paw(size, col):
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    s = size
    d.ellipse((s * .22, s * .45, s * .78, s * .95), fill=col)
    for x, y in [(.05, .32), (.27, .08), (.53, .08), (.75, .32)]:
        d.ellipse((s * x, s * y, s * x + s * .2, s * y + s * .26), fill=col)
    return im

random.seed(7)
PARTS = [dict(x=random.uniform(60, W - 60), y0=H + random.uniform(0, 900), v=random.uniform(170, 300),
              ph=random.uniform(0, 6.28), img=(heart if i % 2 else paw)(random.randint(46, 90),
              random.choice([(255, 122, 69, 230), (255, 255, 255, 220), (255, 90, 110, 225), (255, 214, 170, 230)])))
         for i in range(26)]

def draw_particles(fr, ts, alpha=1.0):
    for p in PARTS:
        y = p["y0"] - p["v"] * ts
        if -120 < y < H:
            x = p["x"] + 40 * math.sin(ts * 1.6 + p["ph"])
            im = p["img"].rotate(18 * math.sin(ts * 2 + p["ph"]), resample=Image.BICUBIC, expand=True)
            fr.alpha_composite(fade_ov(im, alpha), (int(x - im.width / 2), int(y)))

# ------------------------------------------------------ photo segments -----------
def encoder(path):
    return subprocess.Popen([FF, "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                             "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", path],
                            stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def photo_seg(idx, dur, cam0, cam1, motion, texts, particles=False):
    out = f"{OUT}/seg{idx:02d}.mp4"; p = encoder(out)
    n = int(round(dur * FPS))
    for i in range(n):
        ts = i / FPS; e = ease(i / (n - 1))
        cam = [a + (b - a) * e for a, b in zip(cam0, cam1)]
        cw = cam[2] * 9 / 16
        cam[0] = min(max(cam[0], cw / 2), PW - cw / 2); cam[1] = min(max(cam[1], cam[2] / 2), PH - cam[2] / 2)
        fr = compose(cam, *motion(ts))
        if particles: draw_particles(fr, ts, min(1, ts / 0.8))
        for tin, tout, ov in texts:
            if tin <= ts <= tout:
                fr.alpha_composite(fade_ov(ov, min(1, (ts - tin) / 0.5, (tout - ts) / 0.4 if tout < dur else 1)))
        p.stdin.write(fr.convert("RGB").tobytes())
    p.stdin.close(); p.wait(); return out

BEAT = 60 / 100  # music feel, ~100 bpm

def swing_motion(ts):  # intro: the swing rocks, both lean into it
    ang = 1.3 * math.sin(2 * math.pi * ts / 2.4)
    grp = dict(angle_deg=ang, pivot=SWING_PIV)
    man = dict(angle_deg=0.8 * math.sin(2 * math.pi * ts / 2.4 + 0.6), pivot=MAN_PIV)
    wom = dict(angle_deg=1.4 * math.sin(2 * math.pi * ts / 2.4 + 1.3), pivot=WOM_PIV)
    return (-8 * math.sin(2 * math.pi * ts / 2.4), 0), man, wom, grp

def dance_motion(ts):  # interlude: bobbing to the beat, out of phase
    b = ts / BEAT * math.pi
    man = dict(angle_deg=1.1 * math.sin(b), pivot=MAN_PIV, ty=-16 * abs(math.sin(b)))
    wom = dict(angle_deg=-1.8 * math.sin(b + 0.9), pivot=WOM_PIV, ty=-20 * abs(math.sin(b + 0.9)))
    return (0, 0), man, wom, None

def outro_motion(ts):  # together sway + lean in towards each other
    lean = ease(ts / 2.0)
    s = math.sin(2 * math.pi * ts / (BEAT * 2))
    man = dict(angle_deg=1.0 * s - 0.8 * lean, pivot=MAN_PIV, ty=-10 * abs(s))
    wom = dict(angle_deg=1.2 * s + 1.8 * lean, pivot=WOM_PIV, tx=-24 * lean, ty=-10 * abs(s))
    return (0, 0), man, wom, None

# ------------------------------------------------------ couple sticker -----------
def sticker_layers(width=780):
    """Upper-body cut-outs of both with a white sticker outline, same canvas & scale."""
    box = (0, 450, PW, 2150)  # heads down to waist
    sc = width / (box[2] - box[0])
    size = (width, int((box[3] - box[1]) * sc))
    wom_small = WOMAN_CLEAN.crop(box).resize(size, Image.LANCZOS).getchannel("A").filter(ImageFilter.MaxFilter(15))
    g = Image.linear_gradient("L").resize(size).point(lambda v: 255 if v < 190 else int(255 * (255 - v) / 65))
    def one(layer, avoid=None):
        im = layer.crop(box).resize(size, Image.LANCZOS)
        a = Image.fromarray(np.minimum(np.array(im.getchannel("A")), np.array(g)))
        im.putalpha(a)
        outline = a.filter(ImageFilter.MaxFilter(13)).point(lambda v: 255 if v > 90 else 0)
        if avoid is not None:  # no outline where this person overlaps the other one
            outline = Image.fromarray(np.where(np.array(avoid) > 90, np.array(a), np.array(outline)).astype(np.uint8))
        outline = outline.filter(ImageFilter.GaussianBlur(1))
        st = Image.new("RGBA", size, (255, 255, 255, 0)); st.putalpha(outline)
        sh = Image.new("RGBA", size, (0, 0, 0, 0)); sh.putalpha(outline.point(lambda v: v * 0.45).filter(ImageFilter.GaussianBlur(10)))
        return sh, st, im
    piv = lambda p: ((p[0] - box[0]) * sc, (p[1] - box[1]) * sc)
    return one(WOMAN_CLEAN), one(MAN, wom_small), piv((1150, 1650)), piv((560, 2000)), size

WOM_ST, MAN_ST, WOM_SP, MAN_SP, ST_SIZE = sticker_layers()

def sticker_frame(ts, dur, side, variant):
    pad = 140
    canvas = Image.new("RGBA", (ST_SIZE[0] + 2 * pad, ST_SIZE[1] + 2 * pad), (0, 0, 0, 0))
    b = ts / BEAT * math.pi
    if variant == "hop":   wa, ma, wy, my = -4 * math.sin(b + 1), 3 * math.sin(b), -22 * abs(math.sin(b + 1)), -18 * abs(math.sin(b))
    elif variant == "lean": wa, ma, wy, my = 6 * ease(ts / 1.2) + 2 * math.sin(b), -3 * ease(ts / 1.2) + 2 * math.sin(b + 1), 0, -10 * abs(math.sin(b))
    else:                   wa, ma, wy, my = 3 * math.sin(b * 0.5), -3 * math.sin(b * 0.5 + 1), -12 * abs(math.sin(b)), -12 * abs(math.sin(b + 1.5))
    for (sh, st, im), piv, ang, dy in ((WOM_ST, WOM_SP, wa, wy), (MAN_ST, MAN_SP, ma, my)):
        c = (piv[0] + pad, piv[1] + pad)
        for lay, off in ((sh, (6, 14)), (st, (0, 0)), (im, (0, 0))):
            L = Image.new("RGBA", canvas.size, (0, 0, 0, 0)); L.paste(lay, (pad + off[0], pad + off[1] + int(dy)))
            canvas.alpha_composite(L.rotate(ang, center=c, resample=Image.BICUBIC))
    # pop in / out
    tin = back_out(ts / 0.7)
    tout = 1 - ease((ts - (dur - 0.7)) / 0.6)
    s = max(0.01, tin * tout)
    tilt = (8 if side == "right" else -8) * (1 - min(1, ts / 0.7))
    canvas = canvas.resize((int(canvas.width * s), int(canvas.height * s)), Image.BICUBIC).rotate(tilt, resample=Image.BICUBIC, expand=True)
    x = W - canvas.width + int(60 * s) if side == "right" else -int(60 * s)
    y = H - canvas.height + int(170 * s)
    return canvas, (x, y)

# ------------------------------------------------------ stock segments -----------
def caption_top(title, sub):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gradient(img, 0, 620, 160, from_top=True)
    f = font("ExtraBold", 80); d = ImageDraw.Draw(img)
    l, t, r, b = d.textbbox((0, 0), title, font=f)
    shadow_text(img, ((W - (r - l)) // 2 - l, 150 - t), title, f, WHITE)
    pill(img, sub, 150 + (b - t) + 36, font("SemiBold", 40))
    return img

def stock_seg(idx, clip, ss, dur, cx, title, sub, side, variant):
    base = f"{OUT}/base{idx:02d}.mp4"
    fit = (f"crop='min(iw,ih*9/16)':ih:'max(0,min(iw-ih*9/16,iw*{cx}-ih*9/32))':0,"
           f"scale={W}:{H}:flags=lanczos,setsar=1,fps={FPS},eq=saturation=1.08:contrast=1.03")
    run([FF, "-y", "-ss", str(ss), "-i", f"{SRC}/{clip}", "-vf", fit, "-t", str(dur), "-an",
         "-f", "rawvideo", "-pix_fmt", "rgb24", base + ".raw"])
    cap = caption_top(title, sub)
    out = f"{OUT}/seg{idx:02d}.mp4"; p = encoder(out)
    n = int(round(dur * FPS)); fsz = W * H * 3
    with open(base + ".raw", "rb") as fh:
        last = None
        for i in range(n):
            buf = fh.read(fsz)
            if len(buf) == fsz: last = buf
            fr = Image.frombytes("RGB", (W, H), last).convert("RGBA")
            ts = i / FPS
            st, pos = sticker_frame(max(0, ts - 0.4), dur - 0.4, side, variant)
            if ts >= 0.4: fr.alpha_composite(st, pos) if pos[0] >= 0 and pos[1] >= 0 else paste_clip(fr, st, pos)
            fr.alpha_composite(fade_ov(cap, min(1, (ts - 0.25) / 0.5)))
            p.stdin.write(fr.convert("RGB").tobytes())
    p.stdin.close(); p.wait(); os.remove(base + ".raw"); return out

def paste_clip(fr, im, pos):
    x, y = pos
    l, t = max(0, -x), max(0, -y)
    cropped = im.crop((l, t, min(im.width, W - x), min(im.height, H - y)))
    if cropped.width > 0 and cropped.height > 0:
        fr.alpha_composite(cropped, (max(0, x), max(0, y)))

# ------------------------------------------------------------ build ----------------
segs, durs = [], [7.0, 5.5, 5.5, 5.0, 5.5, 5.5, 5.0, 4.5, 5.0, 6.0]
segs.append(photo_seg(1, 7.0, (880, 1250, 2576), (760, 1230, 2150), swing_motion, [
    (0.4, 3.4, overlay([("Bir yaz günü...", "SemiBold", 56, PEACH)], H - 330)),
    (3.6, 7.0, overlay([("MAMA SAATİ", "ExtraBold", 118, WHITE), ("kedi & köpek besleme günlüğü", "pill", 40, WHITE)], H - 430)),
]))
segs.append(stock_seg(2, "c1.mov", 1.0, 5.5, 0.45, "Mama hazır!", "1. adım: kaplar dolsun", "right", "hop"))
segs.append(stock_seg(3, "c2.mov", 2.0, 5.5, 0.72, "İlk misafir geldi", "afiyet olsun, dostum", "left", "lean"))
segs.append(stock_seg(4, "c5.mov", 1.0, 5.0, 0.32, "Sıra kedilerde", "mırr... teşekkürler", "right", "sway"))
segs.append(photo_seg(5, 5.5, (720, 1180, 1650), (700, 1150, 1350), dance_motion, [
    (0.3, 5.5, overlay([("Biz doyururuz,", "ExtraBold", 84, WHITE), ("onlar mutlu olur", "ExtraBold", 84, PEACH)], H - 430)),
]))
segs.append(stock_seg(6, "c3.mov", 2.0, 5.5, 0.5, "Biraz sevgi", "bir pati, bir mama", "right", "lean"))
segs.append(stock_seg(7, "c4.mov", 2.0, 5.0, 0.5, "Bahçede keyif", "çimenlerde ziyafet", "left", "hop"))
segs.append(stock_seg(8, "c6.mov", 1.0, 4.5, 0.62, "Biraz da şımartma", "kucak her zaman açık", "left", "sway"))
segs.append(stock_seg(9, "c7.mov", 1.0, 5.0, 0.78, "Herkes doydu!", "kaplar boş, kalpler dolu", "left", "hop"))
segs.append(photo_seg(10, 6.0, (720, 1180, 1500), (860, 1260, 2300), outro_motion, [
    (0.4, 6.0, overlay([("Bir kap mama,", "ExtraBold", 88, WHITE), ("bir dünya mutluluk.", "ExtraBold", 88, PEACH),
                         ("Sokaktaki dostlarımızı unutmayalım", "pill", 38, WHITE)], H - 520)),
], particles=True))

total = sum(durs) - XF * (len(durs) - 1)
inputs = sum([["-i", s] for s in segs], [])
fc, prev, off = [], "[0:v]", 0.0
for i in range(1, len(segs)):
    off += durs[i - 1] - XF
    fc.append(f"{prev}[{i}:v]xfade=transition=fade:duration={XF}:offset={off:.3f}[x{i}]"); prev = f"[x{i}]"
fc.append(f"{prev}fade=in:st=0:d=0.6,fade=out:st={total-1.2:.2f}:d=1.2,format=yuv420p[v]")
fc.append(f"[{len(segs)}:a]aloop=loop=1:size=2e9,atrim=0:{total},afade=in:st=0:d=0.8,afade=out:st={total-2.5:.2f}:d=2.5,volume=0.9[a]")
run([FF, "-y", *inputs, "-i", f"{SRC}/music.wav", "-filter_complex", ";".join(fc),
     "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-pix_fmt", "yuv420p",
     "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-t", f"{total}", f"{OUT}/final.mp4"])
print("done", total)
