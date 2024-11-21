import { useCallback, useEffect, useRef, useState } from "react";
import useSettings from "./useSetting";
import { FontFamily } from "./SettingContext";

export const useSideMenuHook = () => {
  const {
    fontFamily,
    setFontFamily,
    fontName,
    setFontName,
    letterSpacing,
    setLetterSpacing,
    lineHeight,
    setLineHeight,
  } = useSettings();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const handleChangeFontFamily = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFontFamily(e.target.value as FontFamily);
      localStorage.setItem("fontFamily", e.target.value);
    },
    [setFontFamily]
  );

  const handleChangeFontName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFontName(e.target.value);
      localStorage.setItem("fontName", e.target.value);
    },
    [setFontName]
  );

  const handleChangeLetterSpacing = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const letterSpacing = Number(e.target.value);
      setLetterSpacing(letterSpacing);
      localStorage.setItem("letterSpacing", String(letterSpacing));
    },
    [setLetterSpacing]
  );

  const handleChangeLineHeight = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const lineHeight = Number(e.target.value);
      setLineHeight(lineHeight);
      localStorage.setItem("lineHeight", String(lineHeight));
    },
    [setLineHeight]
  );

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  const handleReset = useCallback(() => {
    setFontFamily("Default");
    setLetterSpacing(0);
    setFontName("");
    setLineHeight(1.5);
    localStorage.removeItem("fontName");
    localStorage.removeItem("fontFamily");
  }, [setFontFamily, setLetterSpacing, setFontName, setLineHeight]);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return {
    menuOpen,
    toggleMenu,
    handleChangeFontFamily,
    handleChangeLetterSpacing,
    handleChangeFontName,
    handleChangeLineHeight,
    handleReset,
    menuRef,
    fontFamily,
    fontName,
    lineHeight,
    letterSpacing,
  };
};
