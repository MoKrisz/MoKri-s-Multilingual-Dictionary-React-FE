import { QueryClient } from "@tanstack/react-query";
import { LanguageCodeEnum, Word, WordDto, WordOdataList, WordTypeEnum } from "./models";
import { PaginationData } from "../../components/Pagination";

export const queryClient = new QueryClient();

interface FetchSignal {
  wordId: number;
  signal: AbortSignal;
}

interface OdataFetchSignal {
  pagination: PaginationData;
  orderby?: string;
  signal: AbortSignal;
}

export interface PostOrPutData {
  wordId?: number;
  data: string;
}

export const fetchWords = async ({ pagination, orderby, signal }: OdataFetchSignal): Promise<WordOdataList> => {
  const ordering = orderby ? `&orderby=${orderby}` : '';
  const skipCount = (pagination.currentPage-1) * pagination.dataPerPage;
  const response = await fetch(`https://localhost:7113/odata/WordList?$count=true&top=${pagination.dataPerPage}&skip=${skipCount}${ordering}`, { signal });

  if (!response.ok) {
    throw new Error("Something went wrong while getting the words...");
  }

  const jsonData = await response.json();

  const odataList: WordOdataList = {
    count: jsonData['@odata.count'],
    words: []
  };

  //TODO: refact
  odataList.words = jsonData.value.map((wordData: WordDto): Word => {
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

  return odataList;
};

export const fetchWord = async ({ wordId, signal }: FetchSignal): Promise<Word> => {
  if (!wordId) {
    throw new Error("Word id was not provided while trying to fetch a specific word's data.");
  }

  const response = await fetch("https://localhost:7113/word?wordId="+wordId, { signal });

  if (!response.ok) {
    throw new Error("Something went wrong while getting the word...");
  }

  const wordData: WordDto = await response.json();

  //TODO: refact
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
};

export const postWord = async ({ data }: PostOrPutData): Promise<number> => {
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

//TODO: wordId is not needed, or it needs refact.
export const PutWord = async ({wordId, data}: PostOrPutData): Promise<void> => {
  if (!wordId) {
    throw new Error("Word id was not provided while calling the update function.");
  }

  const response = await fetch("https://localhost:7113/word", {
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
