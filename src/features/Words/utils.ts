import { Option } from "./components/FormInput";
import { WordTypeEnum } from "./models";

export function getWordTypeNameKey(typeEnum: WordTypeEnum): string {
  return WordTypeEnum[typeEnum].toLowerCase() || "unknown";
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
