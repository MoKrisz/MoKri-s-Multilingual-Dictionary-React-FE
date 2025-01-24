import { useQuery } from "@tanstack/react-query";
import FeaturePick from "../components/FeaturePick";
import { fetchWords } from "../features/Words/api";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import WordOdataTable from "../features/Words/components/WordOdataTable";
import Pagination from "../components/Pagination";

export default function MenuPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["words"],
    queryFn: ({ signal }) => fetchWords({ top:10, skip:0, orderby:undefined, signal }),
    staleTime: 120000,
  });

  let tableComponent: ReactNode;

  if (isPending) {
    tableComponent = <p>Getting the words...</p>;
  } else if (isError) {
    tableComponent = <p>Something went wrong...</p>;
  } else if (data) {
    console.log("data", data);

    tableComponent = <WordOdataTable words={data.words}/>
  }

  return (
    <>
      <section className="h-1/2 md:h-1/4 mt-10 flex flex-col md:flex-row gap-5 items-center justify-evenly border border-blue-800">
        <Link to="new-word" className="w-2/3 h-1/2 md:w-1/6 md:h-full">
          <FeaturePick>Add Word</FeaturePick>
        </Link>
        <Link to="new-word" className="w-2/3 h-1/2 md:w-1/6 md:h-full">
          <FeaturePick>Other Feature</FeaturePick>
        </Link>
      </section>
      <section className="w-2/3 flex flex-col justify-self-center border border-slate-900">
        <p className="text-center mt-10 md:mt-20">Search bar...</p>
        {tableComponent}
        <Pagination dataCount={100} dataPerPage={10} currentPage={10} />
      </section>
    </>
  );
}
