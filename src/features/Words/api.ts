import { QueryClient } from "@tanstack/react-query";
import { LanguageCodeEnum, Word, WordDto, WordTypeEnum } from "./models";

export const queryClient = new QueryClient();

interface FetchSignal {
  signal: AbortSignal;
}

export interface PostData {
  data: string;
}

export interface PutData extends PostData {
  wordId: number;
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

export const PutWord = async ({wordId, data}: PutData): Promise<void> => {
  const response = await fetch("https://localhost:7113/word/"+wordId, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Updating the word failed.");
  }
};
