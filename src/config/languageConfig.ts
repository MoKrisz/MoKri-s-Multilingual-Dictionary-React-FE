import { Language, LanguageCodeEnum } from "../utils/types";

export const LANGUAGE_DATA: Record<LanguageCodeEnum, Language> = {
  [LanguageCodeEnum.None]: {
    code: LanguageCodeEnum.None,
    nameKey: "unknown",
    articles: [],
  },
  [LanguageCodeEnum.EN]: {
    code: LanguageCodeEnum.EN,
    nameKey: "en",
    articles: ["the"],
  },
  [LanguageCodeEnum.DE]: {
    code: LanguageCodeEnum.DE,
    nameKey: "de",
    articles: ["der", "die", "das"],
  },
  [LanguageCodeEnum.HU]: {
    code: LanguageCodeEnum.HU,
    nameKey: "hu",
    articles: ["a", "az"],
  },
};

export const LANGUAGES: Language[] = Object.values(LANGUAGE_DATA);
