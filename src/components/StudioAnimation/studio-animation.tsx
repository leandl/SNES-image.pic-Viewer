import { useMemo } from "react";
import { useStudioAnimation } from "../../contexts/studio-animition-context";
import { ContainerAnimation } from "./ContainerAnimation/container-animation";

import "./studio-animation.styles.css";

export function StudioAnimation() {
  const { animations: animationsInObject, addAnimation } = useStudioAnimation();
  const animations = useMemo(
    () => Object.values(animationsInObject),
    [animationsInObject]
  );

  return (
    <div className="studio-animation">
      <h1>Studio Animation</h1>
      <button onClick={addAnimation}>Add Animation</button>
      <div className="animation-list">
        {animations.map((animation) => (
          <ContainerAnimation key={animation.id} animation={animation} />
        ))}
      </div>
    </div>
  );
}
