import { Tag } from "../Tags/models";

export interface TranslationGroup {
  translationGroupId: number;
  description: string;
  tags?: Tag[];
}

export interface WordRelatedTranslationGroups {
  potentialTranslationGroups: TranslationGroup[];
  linkedTranslationGroups: TranslationGroup[];
}
