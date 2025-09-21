export enum LanguageCodeEnum {
  None = 0,
  EN = 1,
  DE = 2,
  HU = 3,
}

export interface Language {
  code: LanguageCodeEnum;
  nameKey: string;
  articles: string[];
}
