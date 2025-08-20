import { useEffect } from "react";
import { Direction } from "../types/game";

interface UseKeyboardControlsProps {
  onDirectionChange: (direction: Direction) => void;
  onPause?: () => void;
  onReset?: () => void;
  onStart?: () => void;
  isGameActive: boolean;
}

export const useKeyboardControls = ({
  onDirectionChange,
  onPause,
  onReset,
  onStart,
  isGameActive,
}: UseKeyboardControlsProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault();
      }

      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (isGameActive) {
            onDirectionChange(Direction.UP);
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (isGameActive) {
            onDirectionChange(Direction.DOWN);
          }
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (isGameActive) {
            onDirectionChange(Direction.LEFT);
          }
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (isGameActive) {
            onDirectionChange(Direction.RIGHT);
          }
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          if (onPause) {
            onPause();
          }
          break;
        case "r":
        case "R":
          if (onReset) {
            onReset();
          }
          break;
        case "Enter":
          if (onStart) {
            onStart();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onDirectionChange, onPause, onReset, onStart, isGameActive]);
};
