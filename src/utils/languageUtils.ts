import { LANGUAGE_DATA, LANGUAGES } from "../config/languageConfig";
import { Option } from "../features/Words/components/FormInput";
import { WordTypeEnum } from "../features/Words/models";
import { LanguageCodeEnum } from "./types";

export function getLanguageName(languageEnum: LanguageCodeEnum): string {
  return LanguageCodeEnum[languageEnum] || "Unknown language";
}

export function getArticles(
  language: LanguageCodeEnum,
  wordType: WordTypeEnum
): string[] | null {
  if (wordType !== WordTypeEnum.Noun) {
    return null;
  }

  const articles = LANGUAGE_DATA[language]?.articles;
  return articles && articles.length > 0 ? articles : null;
}

export function getFormLanguageOptions(): Option[] {
  return LANGUAGES.map((language) => ({
    value: language.code,
    name: language.nameKey,
  }));
}
