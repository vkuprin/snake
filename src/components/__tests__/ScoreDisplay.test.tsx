import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScoreDisplay } from "../ScoreDisplay";

describe("ScoreDisplay", () => {
  it("should display current score", () => {
    render(<ScoreDisplay score={15} maxScore={30} />);

    expect(screen.getByTestId("score-value")).toHaveTextContent("15");
  });

  it("should display progress towards max score", () => {
    render(<ScoreDisplay score={15} maxScore={30} />);

    expect(screen.getByTestId("max-score")).toHaveTextContent("15 / 30");
  });

  it("should show correct progress bar width", () => {
    render(<ScoreDisplay score={15} maxScore={30} />);

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveStyle({ width: "50%" });
  });

  it("should show win message when score reaches max", () => {
    render(<ScoreDisplay score={30} maxScore={30} />);

    expect(screen.getByTestId("win-message")).toBeInTheDocument();
    expect(screen.getByTestId("win-message")).toHaveTextContent(
      "🎉 You Win! 🎉",
    );
  });

  it("should not show win message when score is below max", () => {
    render(<ScoreDisplay score={29} maxScore={30} />);

    expect(screen.queryByTestId("win-message")).not.toBeInTheDocument();
  });

  it("should handle score exceeding max (100% progress)", () => {
    render(<ScoreDisplay score={35} maxScore={30} />);

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveStyle({ width: "100%" });
    expect(screen.getByTestId("win-message")).toBeInTheDocument();
  });

  it("should handle zero score", () => {
    render(<ScoreDisplay score={0} maxScore={30} />);

    expect(screen.getByTestId("score-value")).toHaveTextContent("0");
    expect(screen.getByTestId("max-score")).toHaveTextContent("0 / 30");

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveStyle({ width: "0%" });
  });

  it("should apply custom className", () => {
    render(<ScoreDisplay score={15} maxScore={30} className="custom-class" />);

    const scoreDisplay = screen.getByTestId("score-display");
    expect(scoreDisplay).toHaveClass("custom-class");
  });
});
