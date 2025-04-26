import { Palette } from "./Palette/palettle";
import { SpriteVramPreview } from "./SpriteVramPreview/sprite-vram-preview";
import { VramViewer } from "./VramViewer/vram-viewer";

import "./snes-vram-viewer.styles.css";

export function SNESVramViewer() {
  return (
    <div className="snes-vram-viewer-container">
      <h1>SNES image.pic Viewer</h1>

      <div className="snes-vram-viewer-content">
        <Palette />
        <VramViewer />
        <SpriteVramPreview />
      </div>
    </div>
  );
}
