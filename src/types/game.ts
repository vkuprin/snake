export interface Position {
  x: number;
  y: number;
}

export const Direction = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
} as const;

export type Direction = (typeof Direction)[keyof typeof Direction];

export const GameStatus = {
  PLAYING: "PLAYING",
  GAME_OVER: "GAME_OVER",
  PAUSED: "PAUSED",
} as const;

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  gameStatus: GameStatus;
  boardSize: number;
}

export interface GameConfig {
  boardSize: number;
  tickInterval: number;
  maxScore: number;
}
