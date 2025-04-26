import { useState } from "react";
import { SpritePreview } from "../SpritePreview/sprite-preview";
import "./sprite-vram-preview.styles.css";

export function SpriteVramPreview() {
  const [subSpriteOffset, setSubSpriteOffset] = useState(0);
  const [subSpriteSize, setSubSpriteSize] = useState(16);

  const classNameSpriteSize = "sprite-size-" + subSpriteSize;

  return (
    <div className={`sprite-vram-preview-container ${classNameSpriteSize}`}>
      <h3>Sprite VRAM Preview</h3>

      <SpritePreview
        spriteOffset={subSpriteOffset}
        spriteSize={subSpriteSize}
      />

      <label>Sprite Offset:</label>
      <input
        type="number"
        value={subSpriteOffset}
        onChange={(e) => setSubSpriteOffset(parseInt(e.target.value) || 0)}
      />
      <label>Sprite Size:</label>
      <select
        value={subSpriteSize}
        onChange={(e) => setSubSpriteSize(parseInt(e.target.value))}
        style={{ marginTop: 10 }}
      >
        <option value={8}>8x8</option>
        <option value={16}>16x16</option>
        <option value={32}>32x32</option>
        <option value={64}>64x64</option>
      </select>
    </div>
  );
}
