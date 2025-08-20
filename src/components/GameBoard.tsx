import type { Position } from "../types/game";

interface GameBoardProps {
  boardSize: number;
  snake: Position[];
  food: Position;
  className?: string;
}

export function GameBoard({
  boardSize,
  snake,
  food,
  className = "",
}: GameBoardProps) {
  const snakePositions = new Set(snake.map((pos) => `${pos.x},${pos.y}`));
  const headPosition = snake.length > 0 ? `${snake[0].x},${snake[0].y}` : "";
  const foodPosition = `${food.x},${food.y}`;

  const cells = [];
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const position = `${x},${y}`;
      let cellType = "empty";

      if (position === headPosition) {
        cellType = "snake-head";
      } else if (snakePositions.has(position)) {
        cellType = "snake-body";
      } else if (position === foodPosition) {
        cellType = "food";
      }

      cells.push(
        <div
          key={position}
          className={`
            w-full h-full border border-gray-400 aspect-square
            ${cellType === "snake-head" ? "bg-green-600" : ""}
            ${cellType === "snake-body" ? "bg-green-400" : ""}
            ${cellType === "food" ? "bg-blue-500" : ""}
            ${cellType === "empty" ? "bg-white" : ""}
          `}
          data-testid={`cell-${x}-${y}`}
          data-cell-type={cellType}
        />,
      );
    }
  }

  return (
    <div
      className={`
        grid gap-0 border-2 border-gray-800 bg-white
        ${className}
      `}
      style={{
        gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`,
        width: "100%",
        height: "100%",
        maxWidth: "100vw",
        maxHeight: "calc(100vh - 80px)", // Account for top bar
        aspectRatio: "1",
      }}
      data-testid="game-board"
    >
      {cells}
    </div>
  );
}
