// 3×5 bitmap font for in-canvas text (attract line, score popups, debris
// labels). No webfont dependency — the DOM HUD uses site fonts instead.

// Each glyph is 15 bits, row-major, 3 wide × 5 tall, MSB = top-left.
const G = (rows: string): number => parseInt(rows, 2);

const GLYPHS: Record<string, number> = {
  A: G("010101111101101"),
  B: G("110101110101110"),
  C: G("011100100100011"),
  D: G("110101101101110"),
  E: G("111100110100111"),
  F: G("111100110100100"),
  G: G("011100101101011"),
  H: G("101101111101101"),
  I: G("111010010010111"),
  J: G("001001001101010"),
  K: G("101101110101101"),
  L: G("100100100100111"),
  M: G("101111111101101"),
  N: G("110101101101101"),
  O: G("010101101101010"),
  P: G("110101110100100"),
  Q: G("010101101010001"),
  R: G("110101110101101"),
  S: G("011100010001110"),
  T: G("111010010010010"),
  U: G("101101101101111"),
  V: G("101101101101010"),
  W: G("101101111111101"),
  X: G("101101010101101"),
  Y: G("101101010010010"),
  Z: G("111001010100111"),
  "0": G("111101101101111"),
  "1": G("010110010010111"),
  "2": G("111001111100111"),
  "3": G("111001111001111"),
  "4": G("101101111001001"),
  "5": G("111100111001111"),
  "6": G("111100111101111"),
  "7": G("111001001010010"),
  "8": G("111101111101111"),
  "9": G("111101111001111"),
  "+": G("000010111010000"),
  "-": G("000000111000000"),
  "/": G("001001010100100"),
  " ": 0,
};

export const GLYPH_W = 3;
export const GLYPH_H = 5;
const ADVANCE = 4; // 3px glyph + 1px spacing

export function textWidth(text: string, px: number): number {
  return (text.length * ADVANCE - 1) * px;
}

/**
 * Draw `text` with the top-left corner at (x, y). `px` is the size of one
 * font pixel in canvas units. Unknown characters render as spaces.
 */
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  px: number,
  color: string,
): void {
  ctx.fillStyle = color;
  const upper = text.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    const bits = GLYPHS[upper[i]] ?? 0;
    if (bits === 0) continue;
    const gx = x + i * ADVANCE * px;
    for (let row = 0; row < GLYPH_H; row++) {
      for (let col = 0; col < GLYPH_W; col++) {
        const bit = 1 << (14 - (row * 3 + col));
        if (bits & bit) {
          ctx.fillRect(gx + col * px, y + row * px, px, px);
        }
      }
    }
  }
}

/** Draw text horizontally centered on cx. */
export function drawTextCentered(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  px: number,
  color: string,
): void {
  drawText(ctx, text, Math.round(cx - textWidth(text, px) / 2), y, px, color);
}
