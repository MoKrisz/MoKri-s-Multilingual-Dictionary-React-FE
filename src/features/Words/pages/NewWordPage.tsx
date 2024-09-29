import { useState } from "react";
import FormInput, { Option } from "../components/FormInput";
import { LanguageCodeEnum, WordTypeEnum } from "../models";
import {
  getArticles,
  getLanguageLongName,
  getWordTypeName,
  hasLanguageArticle,
} from "../utils";
import { Link } from "react-router-dom";

interface ArticleState {
  hasArticle: boolean;
  articles: string[] | null;
}

export default function NewWordPage() {
  const [articleState, setarticleState] = useState<ArticleState>({
    hasArticle: false,
    articles: null,
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

    if (hasLanguageArticle(languageEnumValue)) {
      setarticleState({
        hasArticle: true,
        articles: getArticles(languageEnumValue),
      });
    } else {
      setarticleState({
        hasArticle: false,
        articles: null,
      });
    }
  }

  let articleOptions: Option[] = [];
  if (articleState.hasArticle && articleState.articles) {
    articleOptions = articleState.articles.map(
      (article): Option => ({
        value: article,
        name: article,
      })
    );
  }

  return (
    <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
      <Link to="/menu" className="ml-4 mt-4 inline-block p-1 px-4 bg-lincolngreen hover:bg-lincolngreenlighter rounded-md border border-green-900"><button>Back</button></Link>
      <h1 className="text-center font-bold text-3xl my-10">Create a new word</h1>
      <form className="p-4 px-12 grid grid-cols-4 gap-4 md:grid-cols-5">
        <FormInput
          id="language"
          name="language"
          type="select"
          options={languageOptions}
          onChange={handleLanguageChange}
          className="w-32 md:col-start-2"
        >
          Language:
        </FormInput>

        <FormInput
          id="type"
          name="type"
          type="select"
          options={typeOptions}
          className="w-32 col-start-3 md:col-start-3"
        >
          Type:
        </FormInput>

        <FormInput
          id="article"
          name="article"
          type="select"
          options={articleOptions}
          disabled={!articleState.hasArticle}
          className="row-start-2 w-16 md:justify-self-end"
        >
          Article:
        </FormInput>

        <FormInput
          id="wordText"
          name="text"
          className="row-start-3 col-span-4 md:row-start-2 md:col-span-2"
        >
          Text:
        </FormInput>

        <FormInput
          id="plural"
          name="plural"
          className="row-start-4 col-span-4 md:row-start-2 md:col-span-2"
        >
          Plural:
        </FormInput>

        <FormInput
          id="conjugation"
          name="conjugation"
          className=" row-start-5 col-span-4 md:row-start-3 md:col-start-2 md:col-span-3"
        >
          Conjugation:
        </FormInput>

        <button
          type="submit"
          className="w-32 p-1 mt-4 place-self-center row-start-6 col-start-2 col-span-2 md:row-start-4 md:col-start-3 md:col-span-1 bg-lincolngreen hover:bg-lincolngreenlighter rounded-md border border-green-900"
        >
          Save
        </button>
      </form>
    </div>
  );
}
