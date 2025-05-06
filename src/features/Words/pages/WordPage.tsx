import { Link, useParams } from "react-router-dom";
import WordForm from "../components/WordForm";
import { fetchWord, PutWord, queryClient } from "../api";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import TabButton from "../components/TabButton";

type WordParams = {
  wordId: string;
};

export default function WordPage() {
  const [activeTab, setActiveTab] = useState("word");
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

  const activeTabFormat = "-mb-px bg-lincolngreendarker rounded-t-xl border border-t-black border-l-black border-r-black border-b-lincolngreendarker"
  const nonActiveTabFormat = "-mb-px bg-lincolngreen rounded-t-xl border border-t-black border-l-black border-r-black border-b-black hover:bg-lincolngreendarker"

  let formComponent: ReactNode;
  if (isPending) {
    formComponent = <p>Getting the word...</p>;
  } else if (isError) {
    console.log(error);
    formComponent = <p>Something went wrong...</p>;
  } else if (data) {
    formComponent = <>
      <Link
            to="/menu"
            className="ml-12 inline-block py-1 px-4 bg-lincolngreen hover:bg-lincolngreenlighter rounded-md border border-green-900"
          >
            <button>Back</button>
          </Link>
          <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
            <TabButton label="Word" className={`px-5 ${activeTab === "word" ? activeTabFormat : nonActiveTabFormat}`} setActiveTab={() => setActiveTab("word")}/>
            <TabButton label="Translations" className={`px-7 ${activeTab === "translation" ? activeTabFormat : nonActiveTabFormat}`} setActiveTab={() => setActiveTab("translation")}/>
            <div className="bg-lincolngreendarker rounded-e-3xl rounded-b-3xl border border-l-black border-r-black border-b-black border-t-black">
              <WordForm mutationFunction={PutWord} onSuccessFunction={onSuccess} wordData={data}/>
            </div>
          </div>
    </>;
  }

  return formComponent;
}
