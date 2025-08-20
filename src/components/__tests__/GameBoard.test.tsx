import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GameBoard } from "../GameBoard";
import type { Position } from "../../types/game";

describe("GameBoard", () => {
  const defaultProps = {
    boardSize: 5,
    snake: [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ] as Position[],
    food: { x: 4, y: 4 } as Position,
  };

  it("should render the correct number of cells", () => {
    render(<GameBoard {...defaultProps} />);

    const board = screen.getByTestId("game-board");
    expect(board).toBeInTheDocument();

    const cells = screen.getAllByTestId(/^cell-\d+-\d+$/);
    expect(cells).toHaveLength(25);
  });

  it("should render snake head correctly", () => {
    render(<GameBoard {...defaultProps} />);

    const headCell = screen.getByTestId("cell-2-2");
    expect(headCell).toHaveAttribute("data-cell-type", "snake-head");
    expect(headCell).toHaveClass("bg-green-600");
  });

  it("should render snake body correctly", () => {
    render(<GameBoard {...defaultProps} />);

    const bodyCell1 = screen.getByTestId("cell-1-2");
    expect(bodyCell1).toHaveAttribute("data-cell-type", "snake-body");
    expect(bodyCell1).toHaveClass("bg-green-400");

    const bodyCell2 = screen.getByTestId("cell-0-2");
    expect(bodyCell2).toHaveAttribute("data-cell-type", "snake-body");
    expect(bodyCell2).toHaveClass("bg-green-400");
  });

  it("should render food correctly", () => {
    render(<GameBoard {...defaultProps} />);

    const foodCell = screen.getByTestId("cell-4-4");
    expect(foodCell).toHaveAttribute("data-cell-type", "food");
    expect(foodCell).toHaveClass("bg-blue-500");
  });

  it("should render empty cells correctly", () => {
    render(<GameBoard {...defaultProps} />);

    const emptyCell = screen.getByTestId("cell-3-3");
    expect(emptyCell).toHaveAttribute("data-cell-type", "empty");
    expect(emptyCell).toHaveClass("bg-white");
  });

  it("should handle different board sizes", () => {
    render(<GameBoard {...defaultProps} boardSize={3} />);

    const cells = screen.getAllByTestId(/^cell-\d+-\d+$/);
    expect(cells).toHaveLength(9);
  });

  it("should handle empty snake", () => {
    render(<GameBoard {...defaultProps} snake={[]} />);

    const emptyCells = screen
      .getAllByTestId(/^cell-\d+-\d+$/)
      .filter((cell) => cell.getAttribute("data-cell-type") === "empty");
    expect(emptyCells).toHaveLength(24);
  });
});
