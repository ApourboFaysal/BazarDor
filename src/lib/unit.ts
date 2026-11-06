const units: Record<string, string> = {
  kg: "কেজি",
  kgs: "কেজি",
  kilogram: "কেজি",
  g: "গ্রাম",
  gm: "গ্রাম",
  gram: "গ্রাম",
  l: "লিটার",
  ltr: "লিটার",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  doz: "ডজন",
  dz: "ডজন",
  piece: "পিস",
  pieces: "পিস",
  pcs: "পিস",
  pc: "পিস",
};

export function unitName(unit?: string) {
  if (!unit) return "";
  return units[unit.trim().toLowerCase()] || unit;
}

export function unitLabel(unit?: string) {
  const name = unitName(unit);
  return name ? `প্রতি ${name}` : "";
}

export function pctText(pct?: number) {
  return Math.abs(pct || 0).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}