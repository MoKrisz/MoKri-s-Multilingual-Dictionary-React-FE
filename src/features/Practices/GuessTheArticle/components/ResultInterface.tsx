import { useTranslation } from "react-i18next";
import { EvaluateGuessArticleResponseItem } from "../models";
import ResultCard from "./ResultCard";
import Button from "../../../../components/Button";
import { Link } from "react-router-dom";

interface ResultInterfaceProps {
  results: EvaluateGuessArticleResponseItem[];
  restart: () => void;
}

export default function ResultInterface({
  results,
  restart,
}: ResultInterfaceProps) {
  const { t } = useTranslation("practices");

  const correctAnswerCount = results.filter((r) => r.isCorrect).length;

  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-text-primary mb-8 text-2xl">
        <span className="font-semibold">{t("correctAnswerCount")}</span>{" "}
        {results.length}/{correctAnswerCount}
      </p>
      {results.map((result) => (
        <ResultCard result={result} />
      ))}
      <div className="flex justify-center gap-12">
        <Button
          extraStyle="mt-8 text-2xl px-6 py-4 font-bold"
          onClick={restart}
        >
          {t("startAgain")}
        </Button>
        <Link to="/practice/guess-the-article">
          <Button extraStyle="mt-8 text-2xl px-6 py-4 font-bold">
            {t("leavePractice")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
