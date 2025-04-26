import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

export type Animation = {
  id: number;
  name: string;
  size: 8 | 16 | 32 | 64;
  frames: number[];
};

type StudioAnimationContextData = {
  animations: Record<number, Animation>;

  // Animation
  removeAnimation: (id: number) => void;
  addAnimation: () => void;
  changeAnimationName: (id: number, name: string) => void;
  changeAnimationSize: (id: number, size: 8 | 16 | 32 | 64) => void;

  // Frame
  addFrameInAnimation: (id: number) => void;
  changeFrameInAnimation: (
    id: number,
    frameIndex: number,
    frame: number
  ) => void;
};

const StudioAnimationContext = createContext<StudioAnimationContextData>({
  animations: {},

  // Animation
  removeAnimation: () => {},
  addAnimation: () => {},
  changeAnimationName: () => {},
  changeAnimationSize: () => {},

  // Frame
  addFrameInAnimation: () => {},
  changeFrameInAnimation: () => {},
});

interface StudioAnimationProviderProps {
  children: ReactNode;
}

export const StudioAnimationProvider: React.FC<
  StudioAnimationProviderProps
> = ({ children }) => {
  const [animations, setAnimations] = useState<Record<number, Animation>>({});

  const addAnimation = useCallback(() => {
    const animationId = Date.now();
    const newAnimation: Animation = {
      id: animationId,
      name: `Animation ${animationId}`,
      size: 32,
      frames: [],
    };

    setAnimations((prevAnimations) => ({
      ...prevAnimations,
      [animationId]: newAnimation,
    }));
  }, []);

  const removeAnimation = useCallback((id: number) => {
    setAnimations((prevAnimations) =>
      Object.fromEntries(
        Object.entries(prevAnimations).filter(([key]) => Number(key) !== id)
      )
    );
  }, []);

  const changeAnimationName = useCallback((id: number, name: string) => {
    setAnimations((prevAnimations) => {
      if (prevAnimations[id]) {
        prevAnimations[id].name = name;
        return { ...prevAnimations };
      }
      return prevAnimations;
    });
  }, []);

  const changeAnimationSize = useCallback(
    (id: number, size: 8 | 16 | 32 | 64) => {
      setAnimations((prevAnimations) => {
        if (prevAnimations[id]) {
          prevAnimations[id].size = size;
          return { ...prevAnimations };
        }
        return prevAnimations;
      });
    },
    []
  );

  const addFrameInAnimation = useCallback((id: number) => {
    setAnimations((prevAnimations) => {
      if (prevAnimations[id]) {
        prevAnimations[id].frames.push(0);
        return { ...prevAnimations };
      }
      return prevAnimations;
    });
  }, []);

  const changeFrameInAnimation = useCallback(
    (id: number, frameIndex: number, frame: number) => {
      setAnimations((prevAnimations) => {
        if (
          prevAnimations[id] &&
          prevAnimations[id].frames[frameIndex] !== undefined
        ) {
          prevAnimations[id].frames[frameIndex] = frame;
          return { ...prevAnimations };
        }
        return prevAnimations;
      });
    },
    []
  );

  return (
    <StudioAnimationContext.Provider
      value={{
        animations,
        // Animation
        addAnimation,
        removeAnimation,
        changeAnimationName,
        changeAnimationSize,

        // Frame
        addFrameInAnimation,
        changeFrameInAnimation,
      }}
    >
      {children}
    </StudioAnimationContext.Provider>
  );
};

export function useStudioAnimation(): StudioAnimationContextData {
  const context = useContext(StudioAnimationContext);
  if (!context) {
    throw new Error(
      "useStudioAnimation must be used within an StudioAnimationProvider"
    );
  }
  return context;
}
