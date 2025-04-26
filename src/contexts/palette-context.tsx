import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Palette, PALETTE_DEFAULT, parsePalette } from "../utils/snes";

interface PaletteContextData {
  palette: Palette;
  onReadPaletteFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaletteContext = createContext<PaletteContextData>({
  palette: PALETTE_DEFAULT,
  onReadPaletteFile: () => {},
});

interface PaletteProviderProps {
  children: ReactNode;
}

function PaletteProvider({ children }: PaletteProviderProps) {
  const [palette, setPalette] = useState<Palette>(PALETTE_DEFAULT);

  const onReadPaletteFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        console.error("No file selected");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPalette(parsePalette(reader.result as ArrayBuffer));
      };
      reader.readAsArrayBuffer(file);
    },
    [setPalette]
  );

  return (
    <PaletteContext.Provider value={{ palette, onReadPaletteFile }}>
      {children}
    </PaletteContext.Provider>
  );
}

function usePalette(): PaletteContextData {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return context;
}

export { PaletteProvider, usePalette };
