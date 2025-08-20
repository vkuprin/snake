import { useState, useEffect, useCallback, useRef } from "react";
import type { GameState, GameConfig } from "../types/game";
import { Direction, GameStatus } from "../types/game";
import {
  createInitialGameState,
  updateGameState,
  isValidDirectionChange,
  DEFAULT_CONFIG,
} from "../utils/gameLogic";

export const useSnakeGame = (config: GameConfig = DEFAULT_CONFIG) => {
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialGameState(config),
  );
  const gameLoopRef = useRef<number | null>(null);
  const configRef = useRef(config);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const startGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    gameLoopRef.current = window.setInterval(() => {
      setGameState((currentState) => {
        if (currentState.gameStatus === GameStatus.PLAYING) {
          return updateGameState(currentState, configRef.current);
        }
        return currentState;
      });
    }, configRef.current.tickInterval);
  }, []);

  const stopGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState((currentState) => {
      if (
        currentState.gameStatus === GameStatus.PLAYING &&
        isValidDirectionChange(currentState.direction, newDirection)
      ) {
        return {
          ...currentState,
          direction: newDirection,
        };
      }
      return currentState;
    });
  }, []);

  const resetGame = useCallback(() => {
    stopGameLoop();
    setGameState(createInitialGameState(configRef.current));
  }, [stopGameLoop]);

  const togglePause = useCallback(() => {
    setGameState((currentState) => {
      if (currentState.gameStatus === GameStatus.PLAYING) {
        stopGameLoop();
        return {
          ...currentState,
          gameStatus: GameStatus.PAUSED,
        };
      } else if (currentState.gameStatus === GameStatus.PAUSED) {
        startGameLoop();
        return {
          ...currentState,
          gameStatus: GameStatus.PLAYING,
        };
      }
      return currentState;
    });
  }, [startGameLoop, stopGameLoop]);

  const startGame = useCallback(() => {
    if (gameState.gameStatus === GameStatus.PLAYING) {
      return;
    }

    if (gameState.gameStatus === GameStatus.GAME_OVER) {
      resetGame();
    }

    setGameState((currentState) => ({
      ...currentState,
      gameStatus: GameStatus.PLAYING,
    }));

    startGameLoop();
  }, [gameState.gameStatus, resetGame, startGameLoop]);

  useEffect(() => {
    return () => {
      stopGameLoop();
    };
  }, [stopGameLoop]);

  useEffect(() => {
    if (gameState.gameStatus === GameStatus.PLAYING && !gameLoopRef.current) {
      startGameLoop();
    } else if (
      gameState.gameStatus !== GameStatus.PLAYING &&
      gameLoopRef.current
    ) {
      stopGameLoop();
    }
  }, [gameState.gameStatus, startGameLoop, stopGameLoop]);

  return {
    gameState,
    changeDirection,
    resetGame,
    togglePause,
    startGame,
    isGameRunning: gameState.gameStatus === GameStatus.PLAYING,
    isGameOver: gameState.gameStatus === GameStatus.GAME_OVER,
    isPaused: gameState.gameStatus === GameStatus.PAUSED,
  };
};
