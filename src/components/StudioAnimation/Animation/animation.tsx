import { useState } from "react";
import { SpritePreview } from "../../SNESVramViewer/SpritePreview/sprite-preview";
import { useAnimation } from "../../../hooks/useAnimation";
import {
  Animation as AnimationType,
  useStudioAnimation,
} from "../../../contexts/studio-animition-context";
import "./animation.styles.css";

type AnimationProps = {
  animation: AnimationType;
};

export function Animation({ animation }: AnimationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fps, setFps] = useState(10);

  const { changeAnimationName, changeAnimationSize } = useStudioAnimation();

  const currentFrame = useAnimation(isPlaying, animation.frames.length, fps);

  return (
    <div className="animation-main">
      <div className="animation-header">
        {animation.frames.length === 0 ? (
          <>
            <div className="animation-empty" />
            <p>No frames available</p>
          </>
        ) : (
          <>
            <SpritePreview
              spriteOffset={animation.frames[currentFrame]}
              spriteSize={animation.size}
            />
            {/* <p>Current Frame: {currentFrame}</p> */}
          </>
        )}
      </div>
      <div className="animation-info">
        <h4>Animation Info</h4>
        <label>Name:</label>
        <input
          type="text"
          value={animation.name}
          onChange={(e) => changeAnimationName(animation.id, e.target.value)}
        />
        <label>Size:</label>
        <select
          value={animation.size}
          onChange={(e) =>
            changeAnimationSize(
              animation.id,
              parseInt(e.target.value) as 8 | 16 | 32 | 64
            )
          }
          style={{ marginTop: 10 }}
        >
          <option value={8}>8x8</option>
          <option value={16}>16x16</option>
          <option value={32}>32x32</option>
          <option value={64}>64x64</option>
        </select>
      </div>
      <div className="animation-controls">
        <h4>Animation Controls</h4>
        <label>FPS:</label>
        <input
          type="number"
          value={fps}
          onChange={(e) => setFps(Number(e.target.value))}
        />
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
