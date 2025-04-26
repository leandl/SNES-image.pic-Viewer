import { useCallback, useLayoutEffect, useRef } from "react";
import { useImagePic } from "../../../contexts/image-pic-context";
import { usePalette } from "../../../contexts/palette-context";
import { decodeTile, drawTile, SCALE_IN_CANVAS } from "../../../utils/snes";

type SpritePreviewProps = {
  spriteOffset: number;
  spriteSize: number;
};

export function SpritePreview({
  spriteOffset,
  spriteSize,
}: SpritePreviewProps) {
  const { imagePicData } = useImagePic();
  const { palette } = usePalette();

  const spriteViCanvasRef = useRef<HTMLCanvasElement>(null);

  const renderSpritePreview = useCallback(() => {
    const canvas = spriteViCanvasRef.current;
    if (!canvas || !imagePicData) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = spriteSize;
    const tilesPerRow = size / 8;

    canvas.width = size;
    canvas.height = size;
    canvas.style.width = `${size * SCALE_IN_CANVAS}px`;
    canvas.style.height = `${size * SCALE_IN_CANVAS}px`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let ty = 0; ty < tilesPerRow; ty++) {
      for (let tx = 0; tx < tilesPerRow; tx++) {
        const tileOffset = spriteOffset + ty * 16 + tx;
        const pixels = decodeTile(imagePicData, tileOffset);
        drawTile(ctx, pixels, palette, tx * 8, ty * 8, 1);
      }
    }
  }, [imagePicData, palette, spriteOffset, spriteSize]);

  useLayoutEffect(renderSpritePreview, [renderSpritePreview]);

  return <canvas ref={spriteViCanvasRef} />;
}
