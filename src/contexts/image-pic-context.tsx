import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type ImagePicContextData = {
  imagePicData: Uint8Array | null;
  onReadImagePicFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImagePicContext = createContext<ImagePicContextData>({
  imagePicData: null,
  onReadImagePicFile: () => {},
});

interface ImagePicProviderProps {
  children: ReactNode;
}

export function ImagePicProvider({ children }: ImagePicProviderProps) {
  const [imagePicData, setImagePicData] = useState<Uint8Array | null>(null);

  const onReadImagePicFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        console.error("No file selected");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImagePicData(new Uint8Array(reader.result as ArrayBuffer));
      };
      reader.readAsArrayBuffer(file);
    },
    [setImagePicData]
  );

  return (
    <ImagePicContext.Provider value={{ imagePicData, onReadImagePicFile }}>
      {children}
    </ImagePicContext.Provider>
  );
}

export function useImagePic(): ImagePicContextData {
  const context = useContext(ImagePicContext);
  if (!context) {
    throw new Error("useImagePic must be used within an ImagePicProvider");
  }
  return context;
}
