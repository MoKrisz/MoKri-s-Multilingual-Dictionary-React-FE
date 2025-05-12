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
  wordId: number;
  article?: string;
  text: string;
  plural?: string;
  type: number;
  conjugation?: string;
  languageCode: number;
}

export interface Word {
  wordId: number;
  article?: string;
  text: string;
  plural?: string;
  type: WordTypeEnum;
  conjugation?: string;
  languageCode: LanguageCodeEnum;
}

export interface WordOdataList {
  count: number;
  words: Word[];
}

export interface WordRefs {
  articleRef: React.RefObject<HTMLSelectElement>;
  pluralRef: React.RefObject<HTMLInputElement>;
  conjugationRef: React.RefObject<HTMLInputElement>;
  wordTextRef: React.RefObject<HTMLInputElement>;
  languageRef: React.RefObject<HTMLSelectElement>;
  typeRef: React.RefObject<HTMLSelectElement>;
}

export interface WordState {
  hasPluralForm: boolean;
  hasConjugation: boolean;
  articles: string[] | null;
  errors: ErrorState[] | null;
}

export interface ErrorState {
  name: string;
  error: string;
}

export interface Tab {
  key: string;
  label: string;
  content: React.ReactNode;
}
