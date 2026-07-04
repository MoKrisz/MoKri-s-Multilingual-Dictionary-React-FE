import { apiClient } from "../../../utils/apiClient";
import { GuessArticleWord } from "./models";

export const getRandomWordsForArticlePractice = async (
  languageCode: number,
  amount: number,
  signal?: AbortSignal
): Promise<GuessArticleWord[]> => {
    const response = await apiClient.get<GuessArticleWord[]>(
      "/practice/guess-article-random-words",
      {
        params: {
          language: languageCode,
          amount
        },
        signal
      }
    );

    return response.data;
};
