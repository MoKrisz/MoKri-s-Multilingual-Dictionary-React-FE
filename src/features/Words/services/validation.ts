import { ErrorState, WordRefs, WordState } from "../models";

interface WordValidationElement {
  wordState: WordState;
  wordRefs: WordRefs;
}

export default function validate({
  wordState,
  wordRefs,
}: WordValidationElement): ErrorState[] {
  const errors: ErrorState[] = [];

  if (!wordState.articles && wordRefs.articleRef.current?.value) {
    errors.push({ name: "article", error: "words:errors.article.mustBeEmpty" });
  }
  if (
    wordState.articles &&
    (!wordRefs.articleRef.current?.value ||
      wordRefs.articleRef.current.disabled)
  ) {
    errors.push({ name: "article", error: "words:errors.article.required" });
  }
  if (!wordState.hasPluralForm && wordRefs.pluralRef.current?.value) {
    errors.push({ name: "plural", error: "words:errors.plural.mustBeEmpty" });
  }
  if (wordState.hasPluralForm && !wordRefs.pluralRef.current?.value) {
    errors.push({ name: "plural", error: "words:errors.plural.required" });
  }
  if (!wordState.hasConjugation && wordRefs.conjugationRef.current?.value) {
    errors.push({
      name: "conjugation",
      error: "words:errors.conjugation.mustBeEmpty",
    });
  }
  if (wordState.hasConjugation && !wordRefs.conjugationRef.current?.value) {
    errors.push({
      name: "conjugation",
      error: "words:errors.conjugation.required",
    });
  }
  if (
    !wordRefs.languageRef.current?.value ||
    wordRefs.languageRef.current.disabled
  ) {
    errors.push({ name: "language", error: "words:errors.language.required" });
  }
  if (!wordRefs.typeRef.current?.value || wordRefs.typeRef.current.disabled) {
    errors.push({ name: "type", error: "words:errors.type.required" });
  }
  if (!wordRefs.wordTextRef.current?.value) {
    errors.push({ name: "wordText", error: "words:errors.wordText.required" });
  }

  return errors;
}
