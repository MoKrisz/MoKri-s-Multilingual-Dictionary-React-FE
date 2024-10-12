import { QueryClient } from "@tanstack/react-query";
import { LanguageCodeEnum, Word, WordDto, WordTypeEnum } from "./models";

export const queryClient = new QueryClient();

interface FetchSignal {
  signal: AbortSignal;
}

interface PostData {
  data: string;
}

export const fetchWords = async ({ signal }: FetchSignal): Promise<Word[]> => {
  const response = await fetch("https://localhost:7113/words", { signal });

  if (!response.ok) {
    throw new Error("Something went wrong while getting the words...");
  }

  const jsonData = await response.json();

  return jsonData.map((wordData: WordDto): Word => {
    const type =
      wordData.type in WordTypeEnum
        ? (wordData.type as WordTypeEnum)
        : WordTypeEnum.None;

    const language =
      wordData.languageCode in LanguageCodeEnum
        ? (wordData.languageCode as LanguageCodeEnum)
        : LanguageCodeEnum.None;

    return {
      ...wordData,
      type: type,
      languageCode: language,
    };
  });
};

export const postWord = async ({ data }: PostData): Promise<number> => {
  const response = await fetch("https://localhost:7113/word", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Word creation failed.");
  }

  const resJson = await response.json();
  
  return resJson;
};
