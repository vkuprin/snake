import type { Position, GameState, GameConfig } from "../types/game";
import { Direction, GameStatus } from "../types/game";

export const DEFAULT_CONFIG: GameConfig = {
  boardSize: 20,
  tickInterval: 200,
  maxScore: 30,
};

export type { GameConfig } from "../types/game";
export const createInitialGameState = (
  config: GameConfig = DEFAULT_CONFIG,
): GameState => {
  const centerX = Math.floor(config.boardSize / 2);
  const centerY = Math.floor(config.boardSize / 2);

  const initialSnake: Position[] = [
    { x: centerX, y: centerY },
    { x: centerX - 1, y: centerY },
    { x: centerX - 2, y: centerY },
  ];

  return {
    snake: initialSnake,
    food: generateFood(initialSnake, config.boardSize),
    direction: Direction.RIGHT,
    score: 0,
    gameStatus: GameStatus.PLAYING,
    boardSize: config.boardSize,
  };
};

export const generateFood = (
  snake: Position[],
  boardSize: number,
): Position => {
  const occupiedPositions = new Set(snake.map((pos) => `${pos.x},${pos.y}`));

  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (occupiedPositions.has(`${food.x},${food.y}`));

  return food;
};

export const getNextPosition = (
  head: Position,
  direction: Direction,
): Position => {
  switch (direction) {
    case Direction.UP:
      return { x: head.x, y: head.y - 1 };
    case Direction.DOWN:
      return { x: head.x, y: head.y + 1 };
    case Direction.LEFT:
      return { x: head.x - 1, y: head.y };
    case Direction.RIGHT:
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
};

export const isOutOfBounds = (
  position: Position,
  boardSize: number,
): boolean => {
  return (
    position.x < 0 ||
    position.x >= boardSize ||
    position.y < 0 ||
    position.y >= boardSize
  );
};

export const isCollisionWithSelf = (
  position: Position,
  snake: Position[],
): boolean => {
  return snake.some(
    (segment) => segment.x === position.x && segment.y === position.y,
  );
};

export const positionsEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

export const isValidDirectionChange = (
  currentDirection: Direction,
  newDirection: Direction,
): boolean => {
  const opposites = {
    [Direction.UP]: Direction.DOWN,
    [Direction.DOWN]: Direction.UP,
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT,
  };

  return opposites[currentDirection] !== newDirection;
};

export const updateGameState = (
  currentState: GameState,
  config: GameConfig = DEFAULT_CONFIG,
): GameState => {
  if (currentState.gameStatus !== GameStatus.PLAYING) {
    return currentState;
  }

  const head = currentState.snake[0];
  const nextPosition = getNextPosition(head, currentState.direction);

  // Check for wall collision
  if (isOutOfBounds(nextPosition, currentState.boardSize)) {
    return {
      ...currentState,
      gameStatus: GameStatus.GAME_OVER,
    };
  }

  // Check for self collision
  if (isCollisionWithSelf(nextPosition, currentState.snake)) {
    return {
      ...currentState,
      gameStatus: GameStatus.GAME_OVER,
    };
  }

  // Create new snake with new head
  const newSnake = [nextPosition, ...currentState.snake];

  // Check if food is eaten
  const foodEaten = positionsEqual(nextPosition, currentState.food);

  if (foodEaten) {
    const newScore = currentState.score + 3;

    // Check for win condition
    if (newScore >= config.maxScore) {
      return {
        ...currentState,
        snake: newSnake,
        score: newScore,
        gameStatus: GameStatus.GAME_OVER,
      };
    }

    // Generate new food and keep snake length
    return {
      ...currentState,
      snake: newSnake,
      food: generateFood(newSnake, currentState.boardSize),
      score: newScore,
    };
  } else {
    // Remove tail if no food eaten
    newSnake.pop();
    return {
      ...currentState,
      snake: newSnake,
    };
  }
};
