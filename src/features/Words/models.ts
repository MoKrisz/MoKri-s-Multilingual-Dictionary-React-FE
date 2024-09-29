export enum LanguageCodeEnum {
  None = 0,
  EN = 1,
  DE = 2,
  HU = 3,
}

export enum WordTypeEnum {
  None = 0,
  Noun = 1,
  Verb = 2,
  Adjective = 3,
}

export interface WordDto {
  article?: string;
  text: string;
  plural?: string;
  type: number;
  conjugation?: string;
  languageCode: number;
}

export interface Word {
  article?: string;
  text: string;
  plural?: string;
  type: WordTypeEnum;
  conjugation?: string;
  languageCode: LanguageCodeEnum;
}
