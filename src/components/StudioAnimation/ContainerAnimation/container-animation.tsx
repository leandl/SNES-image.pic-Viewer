import {
  Animation as AnimationType,
  useStudioAnimation,
} from "../../../contexts/studio-animition-context";
import { Animation } from "../Animation/animation";
import { SpriteAnimationPreview } from "../SpriteAnimationPreview/sprite-animation-preview";
import "./container-animation.styles.css";

type ContainerAnimationProps = {
  animation: AnimationType;
};

export function ContainerAnimation({ animation }: ContainerAnimationProps) {
  const { addFrameInAnimation } = useStudioAnimation();

  return (
    <div className="container-animation">
      <div className="container-animation-main">
        <Animation animation={animation} />
      </div>
      <div className="container-animation-list">
        {animation.frames.map((frame, frameIndex) => (
          <SpriteAnimationPreview
            key={frameIndex}
            animationId={animation.id}
            frameId={frameIndex}
            frame={frame}
            size={animation.size}
          />
        ))}
        <button onClick={() => addFrameInAnimation(animation.id)}>
          Add Frame
        </button>
      </div>
    </div>
  );
}
