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
            return "Unknown value."
    }
}

export function getLanguageName(languageEnum: LanguageCodeEnum): string {
    return LanguageCodeEnum[languageEnum] || "Unknown value";
}

export function getWordTypeName(typeEnum: WordTypeEnum): string {
    return WordTypeEnum[typeEnum] || "Unknown value";
}