import { ReactNode, useEffect, useRef, useState } from "react";
import FormInput, { Option } from "../components/FormInput";
import { LanguageCodeEnum, WordTypeEnum } from "../models";
import {
  getArticles,
  getLanguageLongName,
  getWordTypeName,
  hasConjugation,
  hasPluralForm,
} from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postWord, queryClient } from "../api";

interface WordDependencyState {
  language: LanguageCodeEnum;
  wordType: WordTypeEnum;
}

interface WordState {
  hasPluralForm: boolean;
  hasConjugation: boolean;
  articles: string[] | null;
  errors: ErrorState[] | null;
}

interface ErrorState {
  name: string;
  error: string;
}

export default function NewWordPage() {
  const [wordDependencyState, setWordDependencyState] =
    useState<WordDependencyState>({
      language: LanguageCodeEnum.EN,
      wordType: WordTypeEnum.Noun,
    });
  const [wordState, setWordState] = useState<WordState>({
    hasPluralForm: true,
    hasConjugation: false,
    articles: null,
    errors: null,
  });

  const articleRef = useRef<HTMLSelectElement>(null);
  const pluralRef = useRef<HTMLInputElement>(null);
  const conjugationRef = useRef<HTMLInputElement>(null);
  const wordTextRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

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

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: postWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
      navigate("/menu");
    },
  });

  const languageOptions = Object.values(LanguageCodeEnum)
    .filter(
      (enumValue) =>
        typeof enumValue === "number" && enumValue !== LanguageCodeEnum.None
    )
    .map(
      (enumValue): Option => ({
        value: enumValue,
        name: getLanguageLongName(enumValue),
      })
    );

  const typeOptions = Object.values(WordTypeEnum)
    .filter(
      (enumValue) =>
        typeof enumValue === "number" && enumValue !== WordTypeEnum.None
    )
    .map(
      (enumValue): Option => ({
        value: enumValue,
        name: getWordTypeName(enumValue),
      })
    );

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

  let articleOptions: Option[] = [];
  if (wordState.articles) {
    articleOptions = wordState.articles.map(
      (article): Option => ({
        value: article,
        name: article,
      })
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors: ErrorState[] = [];
    if (!wordState.articles && articleRef.current?.value) {
      errors.push({ name: "article", error: "Article must not have a value." });
    }
    if (
      wordState.articles &&
      (!articleRef.current?.value || articleRef.current.disabled)
    ) {
      errors.push({ name: "article", error: "Article must have a value." });
    }
    if (!wordState.hasPluralForm && pluralRef.current?.value) {
      errors.push({ name: "plural", error: "Plural must not have a value." });
    }
    if (wordState.hasPluralForm && !pluralRef.current?.value) {
      errors.push({ name: "plural", error: "Plural must have a value." });
    }
    if (!wordState.hasConjugation && conjugationRef.current?.value) {
      errors.push({
        name: "conjugation",
        error: "Conjugation must not have a value.",
      });
    }
    if (wordState.hasConjugation && !conjugationRef.current?.value) {
      errors.push({
        name: "conjugation",
        error: "Conjugation must have a value.",
      });
    }
    if (!languageRef.current?.value || languageRef.current.disabled) {
      errors.push({ name: "language", error: "Language must have a value." });
    }
    if (!typeRef.current?.value || typeRef.current.disabled) {
      errors.push({ name: "type", error: "Type must have a value." });
    }
    if (!wordTextRef.current?.value) {
      errors.push({ name: "wordText", error: "Word text must have a value." });
    }

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
    const data = Object.fromEntries(formData);

    const json = JSON.stringify(data);
    console.log(json);
    mutate({ data: json });
  }

  let errors: ReactNode;
  if (wordState.errors) {
    errors = wordState.errors.map((error) => (
      <p key={`${error.name}_error`} className="text-red-700">
        {error.error}
      </p>
    ));
  }

  return (
    <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
      <Link
        to="/menu"
        className="ml-4 mt-4 inline-block p-1 px-4 bg-lincolngreen hover:bg-lincolngreenlighter rounded-md border border-green-900"
      >
        <button>Back</button>
      </Link>
      <h1 className="text-center font-bold text-3xl my-10">
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
          reference={languageRef}
          className="w-32 md:col-start-2"
        >
          Language:
        </FormInput>

        <FormInput
          id="type"
          name="type"
          type="select"
          options={typeOptions}
          onChange={handleWordTypeChange}
          reference={typeRef}
          className="w-32 col-start-3 md:col-start-3"
        >
          Type:
        </FormInput>

        <FormInput
          id="article"
          name="article"
          type="select"
          options={articleOptions}
          disabled={wordState.articles === null}
          reference={articleRef}
          className="row-start-2 w-16 md:justify-self-end"
        >
          Article:
        </FormInput>

        <FormInput
          id="wordText"
          name="text"
          reference={wordTextRef}
          className="row-start-3 col-span-4 md:row-start-2 md:col-span-2"
        >
          Text:
        </FormInput>

        <FormInput
          id="plural"
          name="plural"
          disabled={!wordState.hasPluralForm}
          reference={pluralRef}
          className="row-start-4 col-span-4 md:row-start-2 md:col-span-2"
        >
          Plural:
        </FormInput>

        <FormInput
          id="conjugation"
          name="conjugation"
          disabled={!wordState.hasConjugation}
          reference={conjugationRef}
          className=" row-start-5 col-span-4 md:row-start-3 md:col-start-2 md:col-span-3"
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
