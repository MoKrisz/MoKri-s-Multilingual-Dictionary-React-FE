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
    errors.push({ name: "article", error: "Article must not have a value." });
  }
  if (
    wordState.articles &&
    (!wordRefs.articleRef.current?.value ||
      wordRefs.articleRef.current.disabled)
  ) {
    errors.push({ name: "article", error: "Article must have a value." });
  }
  if (!wordState.hasPluralForm && wordRefs.pluralRef.current?.value) {
    errors.push({ name: "plural", error: "Plural must not have a value." });
  }
  if (wordState.hasPluralForm && !wordRefs.pluralRef.current?.value) {
    errors.push({ name: "plural", error: "Plural must have a value." });
  }
  if (!wordState.hasConjugation && wordRefs.conjugationRef.current?.value) {
    errors.push({
      name: "conjugation",
      error: "Conjugation must not have a value.",
    });
  }
  if (wordState.hasConjugation && !wordRefs.conjugationRef.current?.value) {
    errors.push({
      name: "conjugation",
      error: "Conjugation must have a value.",
    });
  }
  if (
    !wordRefs.languageRef.current?.value ||
    wordRefs.languageRef.current.disabled
  ) {
    errors.push({ name: "language", error: "Language must have a value." });
  }
  if (!wordRefs.typeRef.current?.value || wordRefs.typeRef.current.disabled) {
    errors.push({ name: "type", error: "Type must have a value." });
  }
  if (!wordRefs.wordTextRef.current?.value) {
    errors.push({ name: "wordText", error: "Word text must have a value." });
  }

  return errors;
}
