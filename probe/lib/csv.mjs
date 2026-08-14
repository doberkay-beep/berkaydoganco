// Küçük CSV yardımcıları. Bunun için kütüphane kurmaya değmez.

// Bir hücreyi RFC 4180'e göre kaçışlar: virgül, tırnak veya satır sonu
// içeriyorsa çift tırnağa alır, içteki tırnakları ikiye katlar.
function cell(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsvRow(values) {
  return values.map(cell).join(",");
}

export function toCsv(header, rows) {
  const lines = [toCsvRow(header)];
  for (const row of rows) lines.push(toCsvRow(row));
  return lines.join("\n") + "\n";
}
