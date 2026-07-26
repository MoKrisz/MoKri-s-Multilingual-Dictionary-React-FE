import Button from "../../../../components/Button";
import { Language } from "../../../../utils/types";
import { GuessArticleWord } from "../models";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface PracticeInterfaceProps {
  language: Language;
  currentWordIdx: number;
  practiceWords: GuessArticleWord[];
  answers: Record<number, string | undefined>;
  setCurrentWordIdx: (idx: number) => void;
  onAnswerSelect: (article: string) => void;
  onSubmit: () => void;
  canSubmit: boolean;
  isSubmitting: boolean;
}

export default function PracticeInterface({
  language,
  currentWordIdx,
  practiceWords,
  answers,
  setCurrentWordIdx,
  onAnswerSelect,
  onSubmit,
  canSubmit,
  isSubmitting
}: PracticeInterfaceProps) {
  const articles = language.articles;
  const wordId = practiceWords[currentWordIdx].wordId;

  return (
    <div className="flex flex-col gap-5">
      <div className="mx-auto flex overflow-hidden rounded-full">
        {practiceWords.map((word, idx) => (
          <Button
            key={`practice_navigation_${idx}`}
            extraStyle="py-0 px-6 rounded-none"
            isActive={currentWordIdx === idx}
            onClick={() => setCurrentWordIdx(idx)}
          >
            <span className="flex gap-1 items-center">
              {idx + 1}
              {answers[word.wordId] && <span>✓</span>}
            </span>
          </Button>
        ))}
      </div>
      <div className="flex justify-evenly">
        <Button
          isDisabled={currentWordIdx === 0}
          onClick={() => setCurrentWordIdx(currentWordIdx - 1)}
        >
          <IoIosArrowBack />
        </Button>
        <div>
          <p className="border border-black py-10 mb-8 bg-input-background rounded-xl text-2xl font-semibold">
            {practiceWords[currentWordIdx].text}
          </p>
          {articles.map((article) => (
            <Button
              key={`guess_article_${article}`}
              extraStyle="m-3 py-4 px-8 text-2xl"
              isActive={answers[wordId] === article}
              onClick={() => onAnswerSelect(article)}
            >
              {article}
            </Button>
          ))}
        </div>
        <Button
          isDisabled={currentWordIdx === practiceWords.length - 1}
          onClick={() => setCurrentWordIdx(currentWordIdx + 1)}
        >
          <IoIosArrowForward />
        </Button>
      </div>
      <div className="font-bold"></div>
      <Button 
        extraStyle="mx-auto px-6 mt-8 text-xl font-bold"
        isDisabled={!canSubmit}
        onClick={onSubmit}>
        {isSubmitting ? "Checking..." : "Check answers"}
      </Button>
    </div>
  );
}
