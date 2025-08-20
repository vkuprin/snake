import { GameBoard } from "./GameBoard";
import { useSnakeGame } from "../hooks/useSnakeGame";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { DEFAULT_CONFIG } from "../utils/gameLogic";
import { GameStatus } from "../types/game";
import type { GameConfig } from "../utils/gameLogic";

interface SnakeGameProps {
  config?: GameConfig;
  className?: string;
}

export function SnakeGame({
  config = DEFAULT_CONFIG,
  className = "",
}: SnakeGameProps) {
  const {
    gameState,
    changeDirection,
    resetGame,
    togglePause,
    startGame,
    isGameRunning,
  } = useSnakeGame(config);

  // Set up keyboard controls
  useKeyboardControls({
    onDirectionChange: changeDirection,
    onPause: togglePause,
    onReset: resetGame,
    onStart: startGame,
    isGameActive: isGameRunning,
  });

  return (
    <div
      className={`min-h-screen bg-gray-100 flex flex-col ${className}`}
      data-testid="snake-game"
    >
      {/* Top Bar with Score and Controls */}
      <div className="bg-white shadow-sm border-b p-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-gray-800">Snake Game</h1>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-blue-600">
                Score: {gameState.score}
              </span>
              <span className="text-sm text-gray-600">/ {config.maxScore}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {gameState.gameStatus === GameStatus.GAME_OVER ? (
              <button
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                data-testid="play-again-button"
              >
                Play Again
              </button>
            ) : gameState.gameStatus === GameStatus.PAUSED ? (
              <button
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                data-testid="resume-button"
              >
                Resume
              </button>
            ) : (
              <button
                onClick={togglePause}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                data-testid="pause-button"
              >
                Pause
              </button>
            )}

            <button
              onClick={resetGame}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              data-testid="reset-button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Game Board - Full Screen */}
      <div className="flex-1 p-2">
        <GameBoard
          boardSize={gameState.boardSize}
          snake={gameState.snake}
          food={gameState.food}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
