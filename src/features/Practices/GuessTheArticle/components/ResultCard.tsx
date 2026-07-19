import { EvaluateGuessArticleResponseItem } from "../models";

interface ResultCardProps {
  result: EvaluateGuessArticleResponseItem;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="flex bg-complementary-background-primary border-complementary-border-primary border my-2 rounded-md">
      <div className="flex-col">
        <p>{result.text}</p>
        <p>answer: {result.answer}</p>
        <p>correct: {result.correctArticle}</p>
      </div>
      <p>{result.isCorrect ? "✓" : "X"}</p>
    </div>
  );
}
