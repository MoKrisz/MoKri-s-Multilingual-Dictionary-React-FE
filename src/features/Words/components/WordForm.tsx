import FormInput, { Option } from "./FormInput";
import { LanguageCodeEnum, Word, WordRefs, WordState, WordTypeEnum } from "../models";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  getArticles,
  getFormLanguageOptions,
  getFormWordTypeOptions,
  hasConjugation,
  hasPluralForm,
} from "../utils";
import validate from "../services/validation";
import { useMutation } from "@tanstack/react-query";
import { PostOrPutData } from "../api";

interface WordDependencyState {
  language: LanguageCodeEnum;
  wordType: WordTypeEnum;
}

interface WordFormParams {
  mutationFunction: (params: PostOrPutData) => Promise<number | void>;
  onSuccessFunction?: () => void;
  wordData?: Word;
}

export default function WordForm({
  mutationFunction,
  onSuccessFunction,
  wordData,
}: WordFormParams) {
  const [wordDependencyState, setWordDependencyState] =
    useState<WordDependencyState>({
      language: wordData?.languageCode || LanguageCodeEnum.EN,
      wordType: wordData?.type || WordTypeEnum.Noun,
    });
  const [wordState, setWordState] = useState<WordState>({
    hasPluralForm: false,
    hasConjugation: false,
    articles: null,
    errors: null,
  });

  const wordRefs: WordRefs = {
    articleRef: useRef<HTMLSelectElement>(null),
    pluralRef: useRef<HTMLInputElement>(null),
    conjugationRef: useRef<HTMLInputElement>(null),
    wordTextRef: useRef<HTMLInputElement>(null),
    languageRef: useRef<HTMLSelectElement>(null),
    typeRef: useRef<HTMLSelectElement>(null),
  };

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFunction,
    onSuccess: onSuccessFunction
  });

  useEffect(() => {
    const articles = getArticles(
      wordDependencyState.language,
      wordDependencyState.wordType
    );

    setWordState((prevState) => {
      return {
        ...prevState,
        hasPluralForm: hasPluralForm(wordDependencyState.wordType),
        hasConjugation: hasConjugation(wordDependencyState.wordType),
        articles: articles,
      };
    });
  }, [wordDependencyState]);

  const languageOptions = getFormLanguageOptions();
  const typeOptions = getFormWordTypeOptions();

  function handleLanguageChange(language: number) {
    const languageEnumValue = language as LanguageCodeEnum;

    setWordDependencyState((prevState) => {
      return { ...prevState, language: languageEnumValue };
    });
  }

  function handleWordTypeChange(type: number) {
    const wordTypeEnumValue = type as WordTypeEnum;

    setWordDependencyState((prevState) => {
      return { ...prevState, wordType: wordTypeEnumValue };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validate({ wordState, wordRefs });

    if (errors.length > 0) {
      setWordState((prevState) => {
        return {
          ...prevState,
          errors: errors,
        };
      });

      return;
    } else {
      setWordState((prevState) => {
        return {
          ...prevState,
          errors: null,
        };
      });
    }

    const formData = new FormData(event.currentTarget);
    if (wordData) {
      formData.append("wordId", ""+wordData.wordId);
    }
    const data = Object.fromEntries(formData);

    const json = JSON.stringify(data);
    mutate({ wordId: wordData?.wordId,  data: json });
  }

  let articleOptions: Option[] = [];
  if (wordState.articles) {
    articleOptions = wordState.articles.map(
      (article): Option => ({
        value: article,
        name: article,
      })
    );
  }

  let errors: ReactNode;
  if (wordState.errors) {
    errors = wordState.errors.map((error) => (
      <p key={`${error.name}_error`} className="text-red-700">
        {error.error}
      </p>
    ));
  }

  console.log(wordState);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl pb-10 pt-5">
        Create a new word
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 px-12 grid grid-cols-4 gap-4 md:grid-cols-5"
      >
        <FormInput
          id="language"
          name="languageCode"
          type="select"
          options={languageOptions}
          onChange={handleLanguageChange}
          reference={wordRefs.languageRef}
          className="w-32 md:col-start-2"
          defaultValue={wordData ? ""+wordData!.languageCode : undefined}
        >
          Language:
        </FormInput>

        <FormInput
          id="type"
          name="type"
          type="select"
          options={typeOptions}
          onChange={handleWordTypeChange}
          reference={wordRefs.typeRef}
          className="w-32 col-start-3 md:col-start-3"
          defaultValue={wordData ? ""+wordData!.type : undefined}
        >
          Type:
        </FormInput>

        <FormInput
          id="article"
          name="article"
          type="select"
          options={articleOptions}
          disabled={wordState.articles === null}
          reference={wordRefs.articleRef}
          className="row-start-2 w-16 md:justify-self-end"
          defaultValue={wordData?.article}
        >
          Article:
        </FormInput>

        <FormInput
          id="wordText"
          name="text"
          reference={wordRefs.wordTextRef}
          className="row-start-3 col-span-4 md:row-start-2 md:col-span-2"
          defaultValue={wordData?.text}
        >
          Text:
        </FormInput>

        <FormInput
          id="plural"
          name="plural"
          disabled={!wordState.hasPluralForm}
          reference={wordRefs.pluralRef}
          className="row-start-4 col-span-4 md:row-start-2 md:col-span-2"
          defaultValue={wordData?.plural}
        >
          Plural:
        </FormInput>

        <FormInput
          id="conjugation"
          name="conjugation"
          disabled={!wordState.hasConjugation}
          reference={wordRefs.conjugationRef}
          className=" row-start-5 col-span-4 md:row-start-3 md:col-start-2 md:col-span-3"
          defaultValue={wordData?.conjugation}
        >
          Conjugation:
        </FormInput>

        {errors && (
          <div className="row-start-6 col-span-4 md:row-start-4 md:col-start-2 md:col-span-3">
            {errors}
          </div>
        )}

        <button
          type="submit"
          className="w-32 p-1 mt-4 place-self-center row-start-7 col-start-2 col-span-2 md:row-start-5 md:col-start-3 md:col-span-1 bg-lincolngreen hover:bg-lincolngreenlighter rounded-md border border-green-900"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Save"}
        </button>
      </form>
    </div>
  );
}
