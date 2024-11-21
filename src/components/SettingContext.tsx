import { createContext, ReactNode, useMemo, useState } from "react";

export type FontFamily = "Default" | "UD" | "Custom";

export type Setting = {
  fontFamily: FontFamily;
  setFontFamily: (fontFamily: FontFamily) => void;
  fontName: string;
  font: string;
  setFontName: (fontName: string) => void;
  letterSpacing: number;
  setLetterSpacing: (letterSpacing: number) => void;
  lineHeight: number;
  setLineHeight: (lineHeight: number) => void;
};

export const SettingContext = createContext<Setting | undefined>(undefined);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [fontFamily, setFontFamily] = useState<FontFamily>(
    (localStorage.getItem("fontFamily") as FontFamily) || "Default"
  );
  const [letterSpacing, setLetterSpacing] = useState<number>(
    Number(localStorage.getItem("letterSpacing"))
  );

  const [lineHeight, setLineHeight] = useState<number>(
    Number(localStorage.getItem("lineHeight")) || 1.5
  );

  const [fontName, setFontName] = useState<string>("");

  const font = useMemo(() => {
    switch (fontFamily) {
      case "Default":
        return "Noto Sans JP";
      case "UD":
        return "BIZ UDGothic";
      case "Custom":
        return fontName;
      default:
        return "Noto Sans JP";
    }
  }, [fontFamily, fontName]);
  const value = {
    fontFamily,
    setFontFamily,
    fontName,
    font,
    setFontName,
    letterSpacing,
    setLetterSpacing,
    lineHeight,
    setLineHeight,
  };
  return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
};
