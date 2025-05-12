import { Link, useParams } from "react-router-dom";
import WordForm from "../components/WordForm";
import { fetchWord, PutWord, queryClient } from "../api";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import Tabs from "../../../components/Tabs";

type WordParams = {
  wordId: string;
};

export default function WordPage() {
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
    formComponent = <p>Getting the word...</p>;
  } else if (isError) {
    console.log(error);
    formComponent = <p>Something went wrong...</p>;
  } else if (data) {
    formComponent = (
      <>
        <Link
          to="/menu"
          className="ml-12 inline-block py-1 px-4 bg-lincolngreen hover:bg-lincolngreenlighter rounded-md border border-green-900"
        >
          <button>Back</button>
        </Link>
        <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
          <Tabs
            tabs={[
              {
                key: "word",
                label: "Word",
                content: (
                  <WordForm
                    mutationFunction={PutWord}
                    onSuccessFunction={onSuccess}
                    wordData={data}
                  />
                ),
                length: 5,
              },
              {
                key: "translation",
                label: "Translations",
                content: (
                  <p>Here goes the translations tab content</p>
                ),
                length: 7,
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
