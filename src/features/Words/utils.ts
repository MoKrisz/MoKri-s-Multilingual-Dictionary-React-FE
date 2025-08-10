import { Option } from "./components/FormInput";
import { LanguageCodeEnum, WordTypeEnum } from "./models";

export function getLanguageLongNameKey(languageEnum: LanguageCodeEnum): string {
  switch (languageEnum) {
    case LanguageCodeEnum.EN:
      return "en";
    case LanguageCodeEnum.DE:
      return "de";
    case LanguageCodeEnum.HU:
      return "hu";
    default:
      return "unknown";
  }
}

export function getLanguageName(languageEnum: LanguageCodeEnum): string {
  return LanguageCodeEnum[languageEnum] || "Unknown language";
}

export function getWordTypeNameKey(typeEnum: WordTypeEnum): string {
  return WordTypeEnum[typeEnum].toLowerCase() || "unknown";
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
        name: getLanguageLongNameKey(enumValue),
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
        name: getWordTypeNameKey(enumValue),
      })
    );

  return wordTypeOptions;
}
