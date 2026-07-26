import { apiClient } from "../../../utils/apiClient";
import { EvaluateGuessArticleRequest, EvaluateGuessArticleResponseItem, GuessArticleWord } from "./models";

export const getRandomWordsForArticlePractice = async (
  languageCode: number,
  amount: number,
  signal?: AbortSignal,
): Promise<GuessArticleWord[]> => {
  const response = await apiClient.get<GuessArticleWord[]>(
    "/practice/guess-article-random-words",
    {
      params: {
        languageCode,
        amount,
      },
      signal,
    },
  );

  return response.data;
};

export const postGuessArticleEvaluation = async(
  request: EvaluateGuessArticleRequest,
  signal?: AbortSignal
): Promise<EvaluateGuessArticleResponseItem[]> => {
  const response = await apiClient.post<EvaluateGuessArticleResponseItem[]>(
    "/practice/guess-article-evaluation",
    request,
    {
      signal
    }
  )

  return response.data;
};
