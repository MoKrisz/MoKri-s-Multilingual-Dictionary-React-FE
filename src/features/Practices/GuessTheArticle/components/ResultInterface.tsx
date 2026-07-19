import { EvaluateGuessArticleResponseItem } from "../models";
import ResultCard from "./ResultCard";

interface ResultInterfaceProps {
  results: EvaluateGuessArticleResponseItem[];
}

export default function ResultInterface({ results }: ResultInterfaceProps) {
  return (
    <div>
      {results.map((result) => (
        <ResultCard result={result} />
      ))}
    </div>
  );
}
