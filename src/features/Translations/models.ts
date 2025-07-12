import { TranslationGroup } from "../TranslationGroups/models";

export interface PostTranslationRequest {
  sourceWordId: number;
  targetWordId: number;
  linkedTranslationGroups: TranslationGroup[];
}
