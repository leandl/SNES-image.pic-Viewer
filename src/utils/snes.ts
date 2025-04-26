export const SCALE_IN_CANVAS = 4;

export type Palette = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export const PALETTE_DEFAULT: Palette = [
  "#000000",
  "#555555",
  "#AAAAAA",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#880000",
  "#008800",
  "#000088",
  "#888800",
  "#880088",
  "#008888",
];

export function decodeTile(data: Uint8Array, tileIndex: number): number[] {
  const tileData = data.slice(tileIndex * 32, tileIndex * 32 + 32);
  const pixels: number[] = [];

  for (let y = 0; y < 8; y++) {
    const plane0 = tileData[y * 2];
    const plane1 = tileData[y * 2 + 1];
    const plane2 = tileData[16 + y * 2];
    const plane3 = tileData[16 + y * 2 + 1];

    for (let x = 0; x < 8; x++) {
      const bit0 = (plane0 >> (7 - x)) & 1;
      const bit1 = (plane1 >> (7 - x)) & 1;
      const bit2 = (plane2 >> (7 - x)) & 1;
      const bit3 = (plane3 >> (7 - x)) & 1;
      const color = (bit3 << 3) | (bit2 << 2) | (bit1 << 1) | bit0;
      pixels.push(color);
    }
  }

  return pixels;
}

export function drawTile(
  ctx: CanvasRenderingContext2D,
  pixels: number[],
  palette: string[],
  x: number,
  y: number,
  scale: number = 1
) {
  if (!pixels) return;

  for (let ty = 0; ty < 8; ty++) {
    for (let tx = 0; tx < 8; tx++) {
      const colorIndex = pixels[ty * 8 + tx];
      ctx.fillStyle = palette[colorIndex] || "#000";
      ctx.fillRect((x + tx) * scale, (y + ty) * scale, scale, scale);
    }
  }
}

export function parsePalette(data: ArrayBuffer): Palette {
  const view = new DataView(data);
  const colors = Array(16).fill(() => `rgb(0,0,0)`) as Palette;
  let colorIndex = 0;
  for (let i = 0; i < view.byteLength; i += 2) {
    const color16 = view.getUint16(i, true);
    const r = ((color16 & 0x1f) << 3) | ((color16 & 0x1f) >> 2);
    const g = (((color16 >> 5) & 0x1f) << 3) | (((color16 >> 5) & 0x1f) >> 2);
    const b = (((color16 >> 10) & 0x1f) << 3) | (((color16 >> 10) & 0x1f) >> 2);

    colors[colorIndex] = `rgb(${r},${g},${b})`;
    colorIndex++;
  }

  return colors;
}
