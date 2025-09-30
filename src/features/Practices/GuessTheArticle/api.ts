import axios from "axios";
import { GuessArticlePracticeData } from "./models";

export const getRandomWordsForArticlePractice = async (
  languageCode: number,
  count: number,
  signal: AbortSignal
): Promise<GuessArticlePracticeData> => {
  return {
    practiceWords: [
      { wordId: 1, text: "test 1" },
      { wordId: 2, text: "test 2" },
      { wordId: 3, text: "test 3" },
    ],
  };

  //   const response = await axios.get<GuessArticlePracticeData>(
  //     `https://localhost:7113/word/guess-article-random-words?language=${languageCode}&count=${count}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       signal,
  //     }
  //   );
  //   return response.data;
};
