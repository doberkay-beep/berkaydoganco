import os, subprocess, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
D = os.path.dirname(os.path.abspath(__file__))
SRC, OUT, FONTS = f"{D}/src", f"{D}/out", f"{D}/fonts"
os.makedirs(OUT, exist_ok=True)
W, H, FPS, XF = 1080, 1920, 30, 0.5

def font(w, s): return ImageFont.truetype(f"{FONTS}/Poppins-{w}.ttf", s)

def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)

photo = Image.open(f"{SRC}/photo.jpg").convert("RGB")
photo = ImageEnhance.Color(photo).enhance(1.08)
PW, PH = photo.size

# --- circular couple badge ---------------------------------------------------
def badge(size=230):
    cx, cy, side = 700, 1090, 1150
    face = photo.crop((cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)).resize((size, size), Image.LANCZOS)
    b = Image.new("RGBA", (size + 16, size + 16), (0, 0, 0, 0))
    ring = ImageDraw.Draw(b)
    ring.ellipse((0, 0, size + 15, size + 15), fill=(255, 255, 255, 255))
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).ellipse((0, 0, size - 1, size - 1), fill=255)
    b.paste(face, (8, 8), m)
    return b
BADGE = badge()

# --- caption overlay -----------------------------------------------------------
def pill_text(draw, img, text, y, f, pad=(44, 22), fill=(255, 255, 255), bg=(20, 20, 20, 170)):
    l, t, r, b = draw.textbbox((0, 0), text, font=f)
    tw, th = r - l, b - t
    x0 = (W - tw) // 2 - pad[0]
    box = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(box).rounded_rectangle((x0, y, x0 + tw + 2 * pad[0], y + th + 2 * pad[1]), radius=(th + 2 * pad[1]) // 2, fill=bg)
    img.alpha_composite(box)
    ImageDraw.Draw(img).text(((W - tw) // 2 - l, y + pad[1] - t), text, font=f, fill=fill)

def caption_png(name, title, sub=None, with_badge=True):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    # soft bottom gradient for legibility
    g = Image.new("L", (1, 700))
    for i in range(700): g.putpixel((0, i), int(150 * (i / 699) ** 1.6))
    grad = Image.new("RGBA", (W, 700), (0, 0, 0, 255)); grad.putalpha(g.resize((W, 700)))
    img.alpha_composite(grad, (0, H - 700))
    d = ImageDraw.Draw(img)
    ft = font("ExtraBold", 78)
    l, t, r, b = d.textbbox((0, 0), title, font=ft)
    y = H - 360 if sub else H - 300
    # shadow
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).text(((W - (r - l)) // 2 - l + 3, y - t + 5), title, font=ft, fill=(0, 0, 0, 160))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(6)))
    ImageDraw.Draw(img).text(((W - (r - l)) // 2 - l, y - t), title, font=ft, fill=(255, 255, 255))
    if sub:
        pill_text(d, img, sub, y + (b - t) + 40, font("SemiBold", 40), bg=(255, 122, 69, 230))
    if with_badge:
        img.alpha_composite(BADGE, (48, 90))
    img.save(f"{OUT}/{name}.png")
    return f"{OUT}/{name}.png"

# --- stock segment ---------------------------------------------------------------
def stock_seg(idx, clip, ss, dur, cx, title, sub=None, speed=1.0):
    cap = caption_png(f"cap{idx}", title, sub)
    fit = (f"crop='min(iw,ih*9/16)':ih:'max(0,min(iw-ih*9/16,iw*{cx}-ih*9/32))':0,"
           f"scale={W}:{H}:flags=lanczos,setsar=1")
    vf = (f"[0:v]setpts=PTS/{speed},{fit},fps={FPS},eq=saturation=1.08:contrast=1.03,format=yuv420p[v];"
          f"[1:v]format=rgba,fade=in:st=0.35:d=0.5:alpha=1[c];"
          f"[v][c]overlay=0:0:shortest=0,format=yuv420p[o]")
    out = f"{OUT}/seg{idx:02d}.mp4"
    run([FF, "-y", "-ss", str(ss), "-i", f"{SRC}/{clip}", "-loop", "1", "-t", str(dur), "-i", cap,
         "-filter_complex", vf, "-map", "[o]", "-t", str(dur), "-an",
         "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-r", str(FPS), out])
    return out

# --- photo segment (smooth Ken Burns rendered in Python) ---------------------------
def ease(t): return 0.5 - 0.5 * math.cos(math.pi * t)

def photo_seg(idx, dur, start, end, texts):
    """start/end: (cx, cy, crop_height) in photo px. texts: list of (t_in, t_out, overlay_rgba)."""
    out = f"{OUT}/seg{idx:02d}.mp4"
    p = subprocess.Popen([FF, "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                          "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", out],
                         stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    n = int(round(dur * FPS))
    for i in range(n):
        t = i / (n - 1)
        e = ease(t)
        cx = start[0] + (end[0] - start[0]) * e
        cy = start[1] + (end[1] - start[1]) * e
        ch = start[2] + (end[2] - start[2]) * e
        cw = ch * 9 / 16
        cx = min(max(cx, cw / 2), PW - cw / 2); cy = min(max(cy, ch / 2), PH - ch / 2)
        fr = photo.transform((W, H), Image.EXTENT, (cx - cw / 2, cy - ch / 2, cx + cw / 2, cy + ch / 2), Image.BICUBIC).convert("RGBA")
        ts = i / FPS
        for tin, tout, ov in texts:
            if tin <= ts <= tout:
                a = min(1, (ts - tin) / 0.5, (tout - ts) / 0.4 if tout < dur else 1)
                if a < 1:
                    o = ov.copy(); o.putalpha(o.getchannel("A").point(lambda v: int(v * a)))
                else:
                    o = ov
                fr.alpha_composite(o)
        p.stdin.write(fr.convert("RGB").tobytes())
    p.stdin.close(); p.wait()
    return out

def overlay(lines, y0, dark=True):
    """lines: list of (text, weight, size, color)."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    if dark:
        g = Image.new("L", (1, 900))
        for i in range(900): g.putpixel((0, i), int(190 * (i / 899) ** 1.4))
        grad = Image.new("RGBA", (W, 900), (0, 0, 0, 255)); grad.putalpha(g.resize((W, 900)))
        img.alpha_composite(grad, (0, H - 900))
    y = y0
    for text, wgt, size, col in lines:
        if wgt == "pill":
            d = ImageDraw.Draw(img)
            pill_text(d, img, text, y, font("SemiBold", size), bg=(255, 122, 69, 235))
            y += size + 80
            continue
        f = font(wgt, size)
        d = ImageDraw.Draw(img)
        l, t, r, b = d.textbbox((0, 0), text, font=f)
        x = (W - (r - l)) // 2 - l
        sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(sh).text((x + 3, y - t + 5), text, font=f, fill=(0, 0, 0, 170))
        img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(7)))
        ImageDraw.Draw(img).text((x, y - t), text, font=f, fill=col)
        y += (b - t) + int(size * 0.45)
    return img

WHITE, PEACH = (255, 255, 255), (255, 214, 170)
segs = []
# 1 intro: wide -> slowly into the couple
segs.append(photo_seg(1, 7.0, (900, 1300, 2576), (760, 1250, 2050), [
    (0.4, 3.4, overlay([("Bir yaz günü...", "SemiBold", 56, PEACH)], H - 330)),
    (3.6, 7.0, overlay([("MAMA SAATİ", "ExtraBold", 118, WHITE), ("kedi & köpek besleme günlüğü", "pill", 40, WHITE)], H - 420)),
]))
segs.append(stock_seg(2, "c1.mov", 1.0, 5.5, 0.45, "Mama hazır!", "1. adım: kaplar dolsun"))
segs.append(stock_seg(3, "c2.mov", 2.0, 5.5, 0.72, "İlk misafir geldi", "afiyet olsun, dostum"))
segs.append(stock_seg(4, "c5.mov", 1.0, 5.0, 0.32, "Sıra kedilerde", "mırr... teşekkürler"))
# 5 interlude: push in on the faces
segs.append(photo_seg(5, 5.5, (720, 1150, 1500), (700, 1120, 1180), [
    (0.3, 5.5, overlay([("Biz doyururuz,", "ExtraBold", 84, WHITE), ("onlar mutlu olur", "ExtraBold", 84, PEACH)], H - 430)),
]))
segs.append(stock_seg(6, "c3.mov", 2.0, 5.5, 0.5, "Biraz sevgi", "bir pati, bir mama"))
segs.append(stock_seg(7, "c4.mov", 2.0, 5.0, 0.5, "Bahçede keyif", "çimenlerde ziyafet"))
segs.append(stock_seg(8, "c6.mov", 1.0, 4.5, 0.62, "Biraz da şımartma", "kucak her zaman açık"))
segs.append(stock_seg(9, "c7.mov", 1.0, 5.0, 0.78, "Herkes doydu!", "kaplar boş, kalpler dolu"))
# 10 outro: pull back out
segs.append(photo_seg(10, 6.0, (700, 1150, 1400), (880, 1290, 2500), [
    (0.4, 6.0, overlay([("Bir kap mama,", "ExtraBold", 88, WHITE), ("bir dünya mutluluk.", "ExtraBold", 88, PEACH),
                         ("Sokaktaki dostlarımızı unutmayalım", "pill", 38, WHITE)], H - 520)),
]))

# --- stitch with crossfades + music ---------------------------------------------------
durs = [7.0, 5.5, 5.5, 5.0, 5.5, 5.5, 5.0, 4.5, 5.0, 6.0]
total = sum(durs) - XF * (len(durs) - 1)
inputs = sum([["-i", s] for s in segs], [])
fc, prev, off = [], "[0:v]", 0.0
for i in range(1, len(segs)):
    off += durs[i - 1] - XF
    lbl = f"[x{i}]"
    fc.append(f"{prev}[{i}:v]xfade=transition=fade:duration={XF}:offset={off:.3f}{lbl}")
    prev = lbl
fc.append(f"{prev}fade=in:st=0:d=0.6,fade=out:st={total-1.2:.2f}:d=1.2,format=yuv420p[v]")
na = len(segs)
fc.append(f"[{na}:a]aloop=loop=1:size=2e9,atrim=0:{total},afade=in:st=0:d=0.8,afade=out:st={total-2.5:.2f}:d=2.5,volume=0.9[a]")
run([FF, "-y", *inputs, "-i", f"{SRC}/music.wav", "-filter_complex", ";".join(fc),
     "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p",
     "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-t", f"{total}", f"{OUT}/final.mp4"])
print("done", total)
