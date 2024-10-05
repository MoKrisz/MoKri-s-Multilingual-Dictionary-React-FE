import { useQuery } from "@tanstack/react-query";
import FeaturePick from "../components/FeaturePick";
import { fetchWords } from "../features/Words/api";
import { Link } from "react-router-dom";
import { getLanguageName, getWordTypeName } from "../features/Words/utils";
import { ReactNode } from "react";

export default function MenuPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["words"],
    queryFn: ({ signal }) => fetchWords({ signal }),
    staleTime: 120000,
  });

  let tableComponent: ReactNode;

  if (isPending) {
    tableComponent = <p>Getting the words...</p>;
  } else if (isError) {
    tableComponent = <p>Something went wrong...</p>;
  } else if (data) {
    console.log('data', data);

    tableComponent = (
      <table className="w-2/3 mt-10 border border-black">
        <thead className="bg-lincolngreen">
          <tr>
            <th className="border border-black">Article</th>
            <th className="border border-black">Word</th>
            <th className="border border-black">Type</th>
            <th className="border border-black">Language</th>
          </tr>
        </thead>
        <tbody>
          {data.map((word) => (
            <tr
              key={`${word.article}_${word.text}`}
              className="bg-lincolngreenlighter"
            >
              <td className="border border-black">{word.article}</td>
              <td className="border border-black">{word.text}</td>
              <td className="border border-black">{getWordTypeName(word.type)}</td>
              <td className="border border-black">{getLanguageName(word.languageCode)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <section className="h-1/2 md:h-1/4 mt-10 flex flex-col md:flex-row gap-5 items-center justify-evenly">
        <Link to="new-word" className="w-2/3 h-1/2 md:w-1/6 md:h-full">
          <FeaturePick>Add Word</FeaturePick>
        </Link>
        <Link to="new-word" className="w-2/3 h-1/2 md:w-1/6 md:h-full">
          <FeaturePick>Other Feature</FeaturePick>
        </Link>
      </section>
      <section className="flex flex-col items-center">
        <p className="text-center mt-10 md:mt-20">Search bar...</p>
        {tableComponent}
      </section>
    </>
  );
}
