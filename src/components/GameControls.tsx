import { GameStatus } from "../types/game";

interface GameControlsProps {
  gameStatus: GameStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  className?: string;
}

export function GameControls({
  gameStatus,
  onStart,
  onPause,
  onReset,
  className = "",
}: GameControlsProps) {
  const getStatusText = () => {
    switch (gameStatus) {
      case GameStatus.PLAYING:
        return "Playing";
      case GameStatus.PAUSED:
        return "Paused";
      case GameStatus.GAME_OVER:
        return "Game Over";
      default:
        return "Ready";
    }
  };

  const getStatusColor = () => {
    switch (gameStatus) {
      case GameStatus.PLAYING:
        return "text-green-600";
      case GameStatus.PAUSED:
        return "text-yellow-600";
      case GameStatus.GAME_OVER:
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 ${className}`}
      data-testid="game-controls"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Game Status</h2>
        <span
          className={`text-lg font-semibold ${getStatusColor()}`}
          data-testid="game-status"
        >
          {getStatusText()}
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        {gameStatus === GameStatus.GAME_OVER ||
        gameStatus === GameStatus.PAUSED ? (
          <button
            onClick={onStart}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            data-testid="start-button"
          >
            {gameStatus === GameStatus.GAME_OVER ? "New Game" : "Resume"}
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            data-testid="pause-button"
          >
            Pause
          </button>
        )}

        <button
          onClick={onReset}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          data-testid="reset-button"
        >
          Reset
        </button>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <div className="font-semibold">Controls:</div>
        <div>• Arrow keys or WASD to change direction</div>
        <div>• Spacebar to pause/resume</div>
        <div>• R to reset game</div>
        <div>• Enter to start new game</div>
      </div>
    </div>
  );
}
