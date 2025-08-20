import { describe, it, expect, beforeEach } from "vitest";
import {
  createInitialGameState,
  generateFood,
  getNextPosition,
  isOutOfBounds,
  isCollisionWithSelf,
  positionsEqual,
  isValidDirectionChange,
  updateGameState,
  DEFAULT_CONFIG,
} from "../gameLogic";
import { Direction, GameStatus } from "../../types/game";
import type { Position } from "../../types/game";

describe("gameLogic", () => {
  describe("createInitialGameState", () => {
    it("should create initial game state with correct defaults", () => {
      const state = createInitialGameState();

      expect(state.snake).toHaveLength(3);
      expect(state.snake[0]).toEqual({ x: 10, y: 10 }); // head at center
      expect(state.snake[1]).toEqual({ x: 9, y: 10 });
      expect(state.snake[2]).toEqual({ x: 8, y: 10 });
      expect(state.direction).toBe(Direction.RIGHT);
      expect(state.score).toBe(0);
      expect(state.gameStatus).toBe(GameStatus.PLAYING);
      expect(state.boardSize).toBe(20);
      expect(state.food).toBeDefined();
    });

    it("should create initial game state with custom config", () => {
      const customConfig = { ...DEFAULT_CONFIG, boardSize: 10 };
      const state = createInitialGameState(customConfig);

      expect(state.boardSize).toBe(10);
      expect(state.snake[0]).toEqual({ x: 5, y: 5 }); // head at center of 10x10
    });
  });

  describe("generateFood", () => {
    it("should generate food that does not overlap with snake", () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
      ];

      const food = generateFood(snake, 20);

      expect(food.x).toBeGreaterThanOrEqual(0);
      expect(food.x).toBeLessThan(20);
      expect(food.y).toBeGreaterThanOrEqual(0);
      expect(food.y).toBeLessThan(20);

      // Food should not be on any snake segment
      const foodPosition = `${food.x},${food.y}`;
      const snakePositions = snake.map((pos) => `${pos.x},${pos.y}`);
      expect(snakePositions).not.toContain(foodPosition);
    });
  });

  describe("getNextPosition", () => {
    const head: Position = { x: 5, y: 5 };

    it("should move up correctly", () => {
      const next = getNextPosition(head, Direction.UP);
      expect(next).toEqual({ x: 5, y: 4 });
    });

    it("should move down correctly", () => {
      const next = getNextPosition(head, Direction.DOWN);
      expect(next).toEqual({ x: 5, y: 6 });
    });

    it("should move left correctly", () => {
      const next = getNextPosition(head, Direction.LEFT);
      expect(next).toEqual({ x: 4, y: 5 });
    });

    it("should move right correctly", () => {
      const next = getNextPosition(head, Direction.RIGHT);
      expect(next).toEqual({ x: 6, y: 5 });
    });
  });

  describe("isOutOfBounds", () => {
    it("should return true for positions outside board", () => {
      expect(isOutOfBounds({ x: -1, y: 5 }, 20)).toBe(true);
      expect(isOutOfBounds({ x: 20, y: 5 }, 20)).toBe(true);
      expect(isOutOfBounds({ x: 5, y: -1 }, 20)).toBe(true);
      expect(isOutOfBounds({ x: 5, y: 20 }, 20)).toBe(true);
    });

    it("should return false for positions inside board", () => {
      expect(isOutOfBounds({ x: 0, y: 0 }, 20)).toBe(false);
      expect(isOutOfBounds({ x: 19, y: 19 }, 20)).toBe(false);
      expect(isOutOfBounds({ x: 10, y: 10 }, 20)).toBe(false);
    });
  });

  describe("isCollisionWithSelf", () => {
    const snake: Position[] = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ];

    it("should return true when position collides with snake", () => {
      expect(isCollisionWithSelf({ x: 4, y: 5 }, snake)).toBe(true);
      expect(isCollisionWithSelf({ x: 3, y: 5 }, snake)).toBe(true);
    });

    it("should return false when position does not collide with snake", () => {
      expect(isCollisionWithSelf({ x: 6, y: 5 }, snake)).toBe(false);
      expect(isCollisionWithSelf({ x: 5, y: 6 }, snake)).toBe(false);
    });
  });

  describe("positionsEqual", () => {
    it("should return true for equal positions", () => {
      expect(positionsEqual({ x: 5, y: 5 }, { x: 5, y: 5 })).toBe(true);
    });

    it("should return false for different positions", () => {
      expect(positionsEqual({ x: 5, y: 5 }, { x: 5, y: 6 })).toBe(false);
      expect(positionsEqual({ x: 5, y: 5 }, { x: 6, y: 5 })).toBe(false);
    });
  });

  describe("isValidDirectionChange", () => {
    it("should prevent direct reversal", () => {
      expect(isValidDirectionChange(Direction.UP, Direction.DOWN)).toBe(false);
      expect(isValidDirectionChange(Direction.DOWN, Direction.UP)).toBe(false);
      expect(isValidDirectionChange(Direction.LEFT, Direction.RIGHT)).toBe(
        false,
      );
      expect(isValidDirectionChange(Direction.RIGHT, Direction.LEFT)).toBe(
        false,
      );
    });

    it("should allow perpendicular direction changes", () => {
      expect(isValidDirectionChange(Direction.UP, Direction.LEFT)).toBe(true);
      expect(isValidDirectionChange(Direction.UP, Direction.RIGHT)).toBe(true);
      expect(isValidDirectionChange(Direction.DOWN, Direction.LEFT)).toBe(true);
      expect(isValidDirectionChange(Direction.DOWN, Direction.RIGHT)).toBe(
        true,
      );
    });
  });

  describe("updateGameState", () => {
    let initialState: ReturnType<typeof createInitialGameState>;

    beforeEach(() => {
      initialState = createInitialGameState();
    });

    it("should move snake forward when no food eaten", () => {
      const newState = updateGameState(initialState);

      expect(newState.snake).toHaveLength(3);
      expect(newState.snake[0]).toEqual({ x: 11, y: 10 }); // moved right
      expect(newState.score).toBe(0);
    });

    it("should end game when hitting wall", () => {
      const stateNearWall = {
        ...initialState,
        snake: [{ x: 19, y: 10 }], // at right edge
        direction: Direction.RIGHT,
      };

      const newState = updateGameState(stateNearWall);
      expect(newState.gameStatus).toBe(GameStatus.GAME_OVER);
    });

    it("should end game when hitting self", () => {
      const stateWithSelfCollision = {
        ...initialState,
        snake: [
          { x: 5, y: 5 }, // head
          { x: 4, y: 5 },
          { x: 3, y: 5 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 4 }, // this will be hit when moving up
        ],
        direction: Direction.UP,
      };

      const newState = updateGameState(stateWithSelfCollision);
      expect(newState.gameStatus).toBe(GameStatus.GAME_OVER);
    });

    it("should increase score and grow snake when eating food", () => {
      const stateWithFoodAhead = {
        ...initialState,
        food: { x: 11, y: 10 }, // food directly ahead
      };

      const newState = updateGameState(stateWithFoodAhead);

      expect(newState.score).toBe(3);
      expect(newState.snake).toHaveLength(4); // grew by 1
      expect(newState.food).not.toEqual({ x: 11, y: 10 }); // new food generated
    });

    it("should end game when reaching max score", () => {
      const stateNearWin = {
        ...initialState,
        score: 27, // 3 points away from winning
        food: { x: 11, y: 10 }, // food directly ahead
      };

      const newState = updateGameState(stateNearWin, {
        ...DEFAULT_CONFIG,
        maxScore: 30,
      });

      expect(newState.score).toBe(30);
      expect(newState.gameStatus).toBe(GameStatus.GAME_OVER);
    });
  });
});
