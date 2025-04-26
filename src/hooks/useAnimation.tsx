import { useEffect, useRef, useState } from "react";

export function useAnimation(
  isPlaying: boolean,
  frameCount: number,
  fps: number = 10
) {
  const [frame, setFrame] = useState(0);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    let animationId: number;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;

      const delta = time - lastTimeRef.current;
      const frameDuration = 1000 / fps;

      if (delta >= frameDuration) {
        frameRef.current = (frameRef.current + 1) % frameCount;
        setFrame(frameRef.current);
        lastTimeRef.current = time;
      }

      animationId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, frameCount, fps]);

  return frame;
}
