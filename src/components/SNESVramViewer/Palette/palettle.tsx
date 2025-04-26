import { useCallback, useLayoutEffect, useRef } from "react";
import { usePalette } from "../../../contexts/palette-context";
import { SCALE_IN_CANVAS } from "../../../utils/snes";

import "./palette.styles.css";

export function Palette() {
  const { palette, onReadPaletteFile } = usePalette();

  const paletteCanvasRef = useRef<HTMLCanvasElement>(null);
  const paletteInputRef = useRef<HTMLInputElement>(null);

  const renderPalette = useCallback(() => {
    const canvas = paletteCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 32;
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = `${size * SCALE_IN_CANVAS}px`;
    canvas.style.height = `${size * SCALE_IN_CANVAS}px`;

    const tilesPerRow = 4;
    const squareSize = 8;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    palette.forEach((color, i) => {
      const x = (i % tilesPerRow) * squareSize;
      const y = Math.floor(i / tilesPerRow) * squareSize;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, squareSize, squareSize);
    });
  }, [palette]);

  useLayoutEffect(renderPalette, [renderPalette]);

  return (
    <div className="palette-container">
      <h3>Palette Viewer</h3>
      <canvas ref={paletteCanvasRef} />
      <input
        type="file"
        accept=".pal"
        onChange={onReadPaletteFile}
        ref={paletteInputRef}
      />
      <button onClick={() => paletteInputRef.current?.click()}>
        Load Palette
      </button>
    </div>
  );
}
