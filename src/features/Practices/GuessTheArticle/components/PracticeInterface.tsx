import { useState } from "react";
import Button from "../../../../components/Button";
import { Language } from "../../../../utils/types";
import { GuessArticleWord } from "../models";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface PracticeInterfaceProps {
  language: Language;
  wordCount: number;
  currentWordIdx: number;
  practiceWords: GuessArticleWord[];
  answers: Record<number, string | undefined>;
  setCurrentWordIdx: (idx: number) => void;
}

export default function PracticeInterface({
  language,
  wordCount,
  currentWordIdx,
  practiceWords,
  answers,
  setCurrentWordIdx,
}: PracticeInterfaceProps) {
  const articles = language.articles;

  return (
    <div className="flex flex-col gap-5">
      <div className="mx-auto flex overflow-hidden rounded-full">
        {practiceWords.map((_, idx) => (
          <Button
            key={`practice_navigation_${idx}`}
            extraStyle="py-0 px-8 rounded-none"
            isActive={currentWordIdx === idx}
            onClick={() => setCurrentWordIdx(idx)}
          >
            {idx + 1}
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
            <Button key={`guess_article_${article}`} extraStyle="m-3 py-4 px-8 text-2xl">{article}</Button>
          ))}
        </div>
        <Button
          isDisabled={currentWordIdx === practiceWords.length - 1}
          onClick={() => setCurrentWordIdx(currentWordIdx + 1)}
        >
          <IoIosArrowForward />
        </Button>
      </div>
    </div>
  );
}
