import { useCallback, useLayoutEffect, useRef } from "react";
import { usePalette } from "../../../contexts/palette-context";
import { useImagePic } from "../../../contexts/image-pic-context";
import { decodeTile, drawTile, SCALE_IN_CANVAS } from "../../../utils/snes";

import "./vram-viewer.styles.css";

export function VramViewer() {
  const { palette } = usePalette();
  const { imagePicData, onReadImagePicFile } = useImagePic();

  const vramViewerInputRef = useRef<HTMLInputElement>(null);
  const vramViewerCanvasRef = useRef<HTMLCanvasElement>(null);

  const renderPic = useCallback(() => {
    const canvas = vramViewerCanvasRef.current;
    if (!canvas || !imagePicData) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tileCount = Math.floor(imagePicData.length / 32);
    const tilesPerRow = 16;

    canvas.width = tilesPerRow * 8;
    canvas.height = Math.ceil(tileCount / tilesPerRow) * 8;
    canvas.style.width = `${canvas.width * SCALE_IN_CANVAS}px`;
    canvas.style.height = `${canvas.height * SCALE_IN_CANVAS}px`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < tileCount; i++) {
      const pixels = decodeTile(imagePicData, i);
      const x = (i % tilesPerRow) * 8;
      const y = Math.floor(i / tilesPerRow) * 8;
      drawTile(ctx, pixels, palette, x, y, 1);
    }
  }, [imagePicData, palette]);

  useLayoutEffect(renderPic, [renderPic]);

  return (
    <div className="vram-viewer-container">
      <h3>SNES VRAM Viewer</h3>
      <canvas ref={vramViewerCanvasRef} />
      <input
        type="file"
        accept=".pic"
        onChange={onReadImagePicFile}
        ref={vramViewerInputRef}
      />
      <button onClick={() => vramViewerInputRef.current?.click()}>
        Load Vram
      </button>
    </div>
  );
}
