import { useEffect } from "react";

interface KeyboardNavigationOptions {
  onLeftArrow?: () => void;
  onRightArrow?: () => void;
  onSpace?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  disabled?: boolean;
}

export const useKeyboardNavigation = ({
  onLeftArrow,
  onRightArrow,
  onSpace,
  onEnter,
  onEscape,
  disabled = false,
}: KeyboardNavigationOptions) => {
  useEffect(() => {
    if (disabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onLeftArrow?.();
          break;
        case "ArrowRight":
          e.preventDefault();
          onRightArrow?.();
          break;
        case " ":
          e.preventDefault();
          onSpace?.();
          break;
        case "Enter":
          e.preventDefault();
          onEnter?.();
          break;
        case "Escape":
          e.preventDefault();
          onEscape?.();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onLeftArrow, onRightArrow, onSpace, onEnter, onEscape, disabled]);
};