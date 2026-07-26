import { useTranslation } from "react-i18next";
import { EvaluateGuessArticleResponseItem } from "../models";
import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";

interface ResultCardProps {
  result: EvaluateGuessArticleResponseItem;
}

export default function ResultCard({ result }: ResultCardProps) {
  const { t } = useTranslation("practices");

  const statusText = result.isCorrect
    ? t("answerCorrect")
    : t("answerIncorrect");
  const statusIcon = result.isCorrect ? (
    <ImCheckmark></ImCheckmark>
  ) : (
    <ImCross></ImCross>
  );

  return (
    <div
      key={`articleResult_${result.wordId}`}

      className="
        my-2
        grid grid-cols-2 justify-between
        gap-x-6 gap-y-2
        rounded-xl border
        border-complementary-border-primary
        bg-complementary-background-primary
        px-5 py-4
        shadow-md
      "
    >
      <h2 className="text-text-primary text-xl font-bold text-left">{result.text}</h2>

      <div
        className={`
        flex items-center justify-end gap-2
        font-semibold
        ${result.isCorrect ? "text-correct-answer" : "text-wrong-answer"}`}
      >
        <span>{statusIcon}</span>
        <p>{statusText}</p>
      </div>

      <p className="text-text-primary text-left">
        <span className="font-semibold">{result.correctArticle}</span>{" "}
        {result.text}
      </p>

      <p className="text-text-primary text-right">
        {t("userAnswer")} <span className="font-semibold">{result.answer}</span>
      </p>
    </div>
  );
}
