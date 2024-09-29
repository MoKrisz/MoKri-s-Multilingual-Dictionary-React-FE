import { LanguageCodeEnum, Word, WordDto, WordTypeEnum } from "./models";

export const fetchWords = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<Word[]> => {
  const response = await fetch("https://localhost:7113/words", { signal });

  if (!response.ok) {
    throw new Error("Something went wrong...");
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
