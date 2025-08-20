import type { Position } from "../types/game";

interface GameBoardProps {
  boardSize: number;
  snake: Position[];
  food: Position;
}

export function GameBoard({ boardSize, snake, food }: GameBoardProps) {
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
            aspect-square border border-gray-400
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
      className="grid gap-0 border-2 border-gray-800 bg-white"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
        aspectRatio: "1",
        width: "min(100vw - 16px, calc(100vh - 100px))",
        height: "min(100vw - 16px, calc(100vh - 100px))",
      }}
      data-testid="game-board"
    >
      {cells}
    </div>
  );
}
