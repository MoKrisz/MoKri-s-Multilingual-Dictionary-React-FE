import { Option } from "./components/FormInput";
import { LanguageCodeEnum, WordTypeEnum } from "./models";

export function getLanguageLongName(languageEnum: LanguageCodeEnum): string {
  switch (languageEnum) {
    case LanguageCodeEnum.EN:
      return "English";
    case LanguageCodeEnum.DE:
      return "German";
    case LanguageCodeEnum.HU:
      return "Hungarian";
    default:
      return "Unknown value.";
  }
}

export function getLanguageName(languageEnum: LanguageCodeEnum): string {
  return LanguageCodeEnum[languageEnum] || "Unknown value";
}

export function getWordTypeName(typeEnum: WordTypeEnum): string {
  return WordTypeEnum[typeEnum] || "Unknown value";
}

export function getArticles(
  language: LanguageCodeEnum,
  wordType: WordTypeEnum
): string[] | null {
  if (wordType !== WordTypeEnum.Noun) {
    return null;
  }

  switch (language) {
    case LanguageCodeEnum.DE:
      return ["der", "die", "das"];
    default:
      return null;
  }
}

export function hasPluralForm(wordType: WordTypeEnum) {
  if (wordType === WordTypeEnum.Noun) {
    return true;
  }

  return false;
}

export function hasConjugation(wordType: WordTypeEnum) {
  if (wordType === WordTypeEnum.Verb) {
    return true;
  }

  return false;
}

export function getFormLanguageOptions(): Option[] {
  const languageOptions = Object.values(LanguageCodeEnum)
    .filter(
      (enumValue) =>
        typeof enumValue === "number" && enumValue !== LanguageCodeEnum.None
    )
    .map(
      (enumValue): Option => ({
        value: enumValue,
        name: getLanguageLongName(enumValue),
      })
    );

  return languageOptions;
}

export function getFormWordTypeOptions(): Option[] {
  const wordTypeOptions = Object.values(WordTypeEnum)
    .filter(
      (enumValue) =>
        typeof enumValue === "number" && enumValue !== WordTypeEnum.None
    )
    .map(
      (enumValue): Option => ({
        value: enumValue,
        name: getWordTypeName(enumValue),
      })
    );

  return wordTypeOptions;
}
