import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSnakeGame } from "../useSnakeGame";
import { Direction, GameStatus } from "../../types/game";

describe("useSnakeGame", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() => useSnakeGame());

    expect(result.current.gameState.snake).toHaveLength(3);
    expect(result.current.gameState.direction).toBe(Direction.RIGHT);
    expect(result.current.gameState.score).toBe(0);
    expect(result.current.gameState.gameStatus).toBe(GameStatus.PLAYING);
    expect(result.current.gameState.boardSize).toBe(20);
    expect(result.current.isGameRunning).toBe(true);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.isPaused).toBe(false);
  });

  it("should change direction when valid", () => {
    const { result } = renderHook(() => useSnakeGame());

    act(() => {
      result.current.changeDirection(Direction.UP);
    });

    expect(result.current.gameState.direction).toBe(Direction.UP);
  });

  it("should not change direction when invalid (reverse)", () => {
    const { result } = renderHook(() => useSnakeGame());

    act(() => {
      result.current.changeDirection(Direction.LEFT);
    });

    expect(result.current.gameState.direction).toBe(Direction.RIGHT);
  });

  it("should reset game to initial state", () => {
    const { result } = renderHook(() => useSnakeGame());

    act(() => {
      result.current.changeDirection(Direction.UP);
    });

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.gameState.direction).toBe(Direction.RIGHT);
    expect(result.current.gameState.score).toBe(0);
    expect(result.current.gameState.gameStatus).toBe(GameStatus.PLAYING);
  });

  it("should toggle pause correctly", () => {
    const { result } = renderHook(() => useSnakeGame());

    act(() => {
      result.current.togglePause();
    });

    expect(result.current.gameState.gameStatus).toBe(GameStatus.PAUSED);
    expect(result.current.isPaused).toBe(true);
    expect(result.current.isGameRunning).toBe(false);

    act(() => {
      result.current.togglePause();
    });

    expect(result.current.gameState.gameStatus).toBe(GameStatus.PLAYING);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.isGameRunning).toBe(true);
  });

  it("should start game correctly", () => {
    const { result } = renderHook(() => useSnakeGame());

    act(() => {
      result.current.startGame();
    });

    expect(result.current.gameState.gameStatus).toBe(GameStatus.PLAYING);
    expect(result.current.isGameRunning).toBe(true);
  });

  it("should update game state automatically with timer", () => {
    const { result } = renderHook(() =>
      useSnakeGame({
        boardSize: 20,
        tickInterval: 100,
        maxScore: 30,
      }),
    );

    const initialHeadPosition = result.current.gameState.snake[0];

    act(() => {
      vi.advanceTimersByTime(100);
    });

    const newHeadPosition = result.current.gameState.snake[0];

    expect(newHeadPosition.x).toBe(initialHeadPosition.x + 1);
    expect(newHeadPosition.y).toBe(initialHeadPosition.y);
  });

  it("should not update when game is paused", () => {
    const { result } = renderHook(() =>
      useSnakeGame({
        boardSize: 20,
        tickInterval: 100,
        maxScore: 30,
      }),
    );

    act(() => {
      result.current.togglePause();
    });

    const initialHeadPosition = result.current.gameState.snake[0];

    act(() => {
      vi.advanceTimersByTime(100);
    });

    const newHeadPosition = result.current.gameState.snake[0];

    expect(newHeadPosition).toEqual(initialHeadPosition);
  });

  it("should use custom config", () => {
    const customConfig = {
      boardSize: 10,
      tickInterval: 50,
      maxScore: 15,
    };

    const { result } = renderHook(() => useSnakeGame(customConfig));

    expect(result.current.gameState.boardSize).toBe(10);

    expect(result.current.gameState.snake[0]).toEqual({ x: 5, y: 5 });
  });
});
