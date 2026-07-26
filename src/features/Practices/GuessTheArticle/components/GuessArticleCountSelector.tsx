import { useTranslation } from "react-i18next";
import Button from "../../../../components/Button";

const countSelectorOptions = [1, 5, 10];

interface GuessArticleCountSelectorProps {
  onClick: (count: number) => void;
}

export default function GuessArticleCountSelector({
  onClick,
}: GuessArticleCountSelectorProps) {
  const { t } = useTranslation("practices");

  return (
    <div>
      <h2 className="mb-8">{t("guessArticleCountSelector")}</h2>
      {countSelectorOptions.map((c) => (
        <Button
          key={`guess-article-count-${c}`}
          onClick={() => onClick(c)}
          extraStyle="px-5 py-3 mx-3 text-2xl"
        >
          {c}
        </Button>
      ))}
    </div>
  );
}
