import { SpritePreview } from "../../SNESVramViewer/SpritePreview/sprite-preview";
import "./sprite-animation-preview.styles.css";
import { useStudioAnimation } from "../../../contexts/studio-animition-context";

type SpriteAnimationPreviewProps = {
  animationId: number;
  frameId: number;
  frame: number;
  size: number;
};

export function SpriteAnimationPreview({
  animationId,
  frameId,
  frame,
  size,
}: SpriteAnimationPreviewProps) {
  const { changeFrameInAnimation } = useStudioAnimation();
  const classNameSpriteSize = "sprite-size-" + size;

  return (
    <div
      className={`sprite-animation-preview-container ${classNameSpriteSize}`}
    >
      <h3>Sprite: {frameId}</h3>

      <SpritePreview spriteOffset={frame} spriteSize={size} />

      <label>Sprite Offset:</label>
      <input
        type="number"
        value={frame}
        onChange={(e) =>
          changeFrameInAnimation(
            animationId,
            frameId,
            parseInt(e.target.value) || 0
          )
        }
      />
    </div>
  );
}
