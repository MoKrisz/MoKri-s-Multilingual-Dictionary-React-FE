import { Link, useParams } from "react-router-dom";
import WordForm from "../components/WordForm";
import { fetchWord, PutWord, queryClient } from "../api";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import Tabs from "../../../components/Tabs";
import BackButton from "../../../components/BackButton";
import { useTranslation } from "react-i18next";

type WordParams = {
  wordId: string;
};

export default function WordPage() {
  const { t } = useTranslation("words");
  const param = useParams<WordParams>();

  if (!param.wordId) {
    throw new Error("Word id is not provided to the page.");
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: [`word_${param.wordId}`],
    queryFn: ({ signal }) => fetchWord({ wordId: +param.wordId!, signal }),
    staleTime: 120000,
  });

  function onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["words"] });
    queryClient.invalidateQueries({ queryKey: [`word_${param.wordId}`] });
  }
  let formComponent: ReactNode;
  if (isPending) {
    formComponent = <p>{t("getWord")}</p>;
  } else if (isError) {
    console.log(error);
    formComponent = <p>{t("errorGetWord")}</p>;
  } else if (data) {
    formComponent = (
      <>
        <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
          <BackButton returnTo="/words" />
          <Tabs
            tabs={[
              {
                key: "word",
                label: t("word"),
                content: (
                  <WordForm
                    mutationFunction={PutWord}
                    onSuccessFunction={onSuccess}
                    wordData={data}
                  />
                ),
              },
              {
                key: "translation",
                label: t("translations"),
                content: <p>Here goes the translations tab content</p>,
              },
            ]}
            defaultTab="word"
          />
        </div>
      </>
    );
  }

  return formComponent;
}
