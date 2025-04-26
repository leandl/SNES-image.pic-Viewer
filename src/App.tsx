import { SNESVramViewer } from "./components/SNESVramViewer/snes-vram-viewer";
import { ImagePicProvider } from "./contexts/image-pic-context";
import { PaletteProvider } from "./contexts/palette-context";
import { StudioAnimationProvider } from "./contexts/studio-animition-context";
import { StudioAnimation } from "./components/StudioAnimation/studio-animation";

export function App() {
  return (
    <ImagePicProvider>
      <PaletteProvider>
        <SNESVramViewer />
        <StudioAnimationProvider>
          <StudioAnimation />
        </StudioAnimationProvider>
      </PaletteProvider>
    </ImagePicProvider>
  );
}
