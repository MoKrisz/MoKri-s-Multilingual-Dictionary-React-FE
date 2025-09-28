import { useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../../../../components/Title";
import { LANGUAGE_DATA } from "../../../../config/languageConfig";
import { LanguageCodeEnum } from "../../../../utils/types";
import { getLanguageCodeEnum } from "../../../../utils/languageUtils";
import Flag from "../../../../components/Flag";
import GuessArticleCountSelector from "../components/GuessArticleCountSelector";

type PracticeStatus =
  | "CONFIGURING"
  | "LOADING"
  | "PRACTICING"
  | "SUBMITTING"
  | "RESULTS";

type GuessArticleParam = {
  languageCode: string;
};

export default function GuessArticlePage() {
  const { languageCode } = useParams<GuessArticleParam>();
  const enumValue = getLanguageCodeEnum(languageCode);

  if (enumValue === undefined) {
    //TODO: handle error.
  }

  const language = LANGUAGE_DATA[enumValue!];

  const [status, setStatus] = useState<PracticeStatus>("CONFIGURING");
  const [wordCount, setWordCount] = useState<number>();
  const [words, setWords] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  const handleCountSelect = (count: number) => {
    setStatus("LOADING");
    setWordCount(count);
  };

  const renderContent = () => {
    switch (status) {
      case "CONFIGURING":
        return <GuessArticleCountSelector onClick={handleCountSelect} />;
      case "LOADING":
      case "SUBMITTING":
        return <div>Loading...</div>;
      case "PRACTICING":
        return <div>Practicing...</div>;
      case "RESULTS":
        return <div>Results...</div>;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 mb-8">
        <Flag flagCode={language.flagCode} />
        <Title
          localeTitleKey={`languages.${language.nameKey}`}
          extraStyle="m-0"
        />
      </div>
      {renderContent()}
    </>
  );
}
