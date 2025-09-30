import { useState } from "react";
import Button from "../../../../components/Button";
import { Language } from "../../../../utils/types";
import { GuessArticleWord } from "../models";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface PracticeInterfaceProps {
  language: Language;
  practiceWords: GuessArticleWord[];
}

export default function PracticeInterface({
  language,
  practiceWords,
}: PracticeInterfaceProps) {
  const articles = language.articles;
  const [currentWordIdx, setCurrentWordIdx] = useState(0);

  return (
    <div className="flex justify-evenly">
      <Button
        isDisabled={currentWordIdx === 0}
        onClick={() => setCurrentWordIdx((prev) => prev - 1)}
      >
        <IoIosArrowBack />
      </Button>
      <div>
        <p className="border border-black py-10 mb-8 bg-input-background rounded-xl text-2xl font-semibold">
          {practiceWords[currentWordIdx].text}
        </p>
        {articles.map((article) => (
          <Button extraStyle="m-3 py-4 px-8 text-2xl">{article}</Button>
        ))}
      </div>
      <Button
        isDisabled={currentWordIdx === practiceWords.length - 1}
        onClick={() => setCurrentWordIdx((prev) => prev + 1)}
      >
        <IoIosArrowForward />
      </Button>
    </div>
  );
}
