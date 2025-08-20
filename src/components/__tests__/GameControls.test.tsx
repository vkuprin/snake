import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GameControls } from "../GameControls";
import { GameStatus } from "../../types/game";

describe("GameControls", () => {
  const defaultProps = {
    gameStatus: GameStatus.PLAYING,
    onStart: vi.fn(),
    onPause: vi.fn(),
    onReset: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display correct status for playing game", () => {
    render(<GameControls {...defaultProps} gameStatus={GameStatus.PLAYING} />);

    expect(screen.getByTestId("game-status")).toHaveTextContent("Playing");
    expect(screen.getByTestId("game-status")).toHaveClass("text-green-600");
  });

  it("should display correct status for paused game", () => {
    render(<GameControls {...defaultProps} gameStatus={GameStatus.PAUSED} />);

    expect(screen.getByTestId("game-status")).toHaveTextContent("Paused");
    expect(screen.getByTestId("game-status")).toHaveClass("text-yellow-600");
  });

  it("should display correct status for game over", () => {
    render(
      <GameControls {...defaultProps} gameStatus={GameStatus.GAME_OVER} />,
    );

    expect(screen.getByTestId("game-status")).toHaveTextContent("Game Over");
    expect(screen.getByTestId("game-status")).toHaveClass("text-red-600");
  });

  it("should show pause button when game is playing", () => {
    render(<GameControls {...defaultProps} gameStatus={GameStatus.PLAYING} />);

    expect(screen.getByTestId("pause-button")).toBeInTheDocument();
    expect(screen.getByTestId("pause-button")).toHaveTextContent("Pause");
  });

  it("should show resume button when game is paused", () => {
    render(<GameControls {...defaultProps} gameStatus={GameStatus.PAUSED} />);

    expect(screen.getByTestId("start-button")).toBeInTheDocument();
    expect(screen.getByTestId("start-button")).toHaveTextContent("Resume");
  });

  it("should show new game button when game is over", () => {
    render(
      <GameControls {...defaultProps} gameStatus={GameStatus.GAME_OVER} />,
    );

    expect(screen.getByTestId("start-button")).toBeInTheDocument();
    expect(screen.getByTestId("start-button")).toHaveTextContent("New Game");
  });

  it("should call onPause when pause button is clicked", () => {
    render(<GameControls {...defaultProps} gameStatus={GameStatus.PLAYING} />);

    fireEvent.click(screen.getByTestId("pause-button"));
    expect(defaultProps.onPause).toHaveBeenCalledTimes(1);
  });

  it("should call onStart when start/resume button is clicked", () => {
    render(<GameControls {...defaultProps} gameStatus={GameStatus.PAUSED} />);

    fireEvent.click(screen.getByTestId("start-button"));
    expect(defaultProps.onStart).toHaveBeenCalledTimes(1);
  });

  it("should call onReset when reset button is clicked", () => {
    render(<GameControls {...defaultProps} />);

    fireEvent.click(screen.getByTestId("reset-button"));
    expect(defaultProps.onReset).toHaveBeenCalledTimes(1);
  });

  it("should always show reset button", () => {
    const statuses = [
      GameStatus.PLAYING,
      GameStatus.PAUSED,
      GameStatus.GAME_OVER,
    ];

    statuses.forEach((status) => {
      const { unmount } = render(
        <GameControls {...defaultProps} gameStatus={status} />,
      );
      expect(screen.getByTestId("reset-button")).toBeInTheDocument();
      unmount();
    });
  });

  it("should display control instructions", () => {
    render(<GameControls {...defaultProps} />);

    expect(screen.getByText("Controls:")).toBeInTheDocument();
    expect(screen.getByText(/Arrow keys or WASD/)).toBeInTheDocument();
    expect(screen.getByText(/Spacebar to pause/)).toBeInTheDocument();
    expect(screen.getByText(/R to reset/)).toBeInTheDocument();
    expect(screen.getByText(/Enter to start/)).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<GameControls {...defaultProps} className="custom-class" />);

    const gameControls = screen.getByTestId("game-controls");
    expect(gameControls).toHaveClass("custom-class");
  });
});
