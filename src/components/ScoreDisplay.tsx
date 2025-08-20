interface ScoreDisplayProps {
  score: number;
  maxScore: number;
  className?: string;
}

export function ScoreDisplay({
  score,
  maxScore,
  className = "",
}: ScoreDisplayProps) {
  const progress = (score / maxScore) * 100;

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 ${className}`}
      data-testid="score-display"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-800">Score</h2>
        <span
          className="text-2xl font-bold text-blue-600"
          data-testid="score-value"
        >
          {score}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>Progress to win</span>
        <span data-testid="max-score">
          {score} / {maxScore}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
          data-testid="progress-bar"
        />
      </div>

      {score >= maxScore && (
        <div
          className="mt-2 text-center text-green-600 font-semibold"
          data-testid="win-message"
        >
          🎉 You Win! 🎉
        </div>
      )}
    </div>
  );
}
