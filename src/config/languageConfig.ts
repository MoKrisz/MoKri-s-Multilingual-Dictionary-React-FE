import { Language, LanguageCodeEnum } from "../utils/types";

export const LANGUAGE_DATA: Record<LanguageCodeEnum, Language> = {
  [LanguageCodeEnum.None]: {
    code: LanguageCodeEnum.None,
    nameKey: "unknown",
    articles: [],
    flagCode: "",
  },
  [LanguageCodeEnum.EN]: {
    code: LanguageCodeEnum.EN,
    nameKey: "en",
    articles: ["the"],
    flagCode: "us",
  },
  [LanguageCodeEnum.DE]: {
    code: LanguageCodeEnum.DE,
    nameKey: "de",
    articles: ["der", "die", "das"],
    flagCode: "de",
  },
  [LanguageCodeEnum.HU]: {
    code: LanguageCodeEnum.HU,
    nameKey: "hu",
    articles: ["a", "az"],
    flagCode: "hu",
  },
};

export const LANGUAGES: Language[] = Object.values(LANGUAGE_DATA);
