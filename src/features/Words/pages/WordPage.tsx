import { useParams } from "react-router-dom";
import WordForm from "../components/WordForm";
import { fetchWord, PutWord, queryClient } from "../api";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

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
    queryFn: ({ signal }) => fetchWord({wordId: +param.wordId!, signal }),
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
    formComponent = <WordForm mutationFunction={PutWord} onSuccessFunction={onSuccess} wordData={data}/>
  }

  return formComponent;
}
