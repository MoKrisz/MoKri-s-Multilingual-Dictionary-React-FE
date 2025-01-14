import { useQuery } from "@tanstack/react-query";
import FeaturePick from "../components/FeaturePick";
import { fetchWords } from "../features/Words/api";
import { Link } from "react-router-dom";
import { getLanguageName, getWordTypeName } from "../features/Words/utils";
import { ReactNode } from "react";
import { BsPencilFill } from "react-icons/bs";
import ColumnOrderIcon from "../components/ColumnOrderIcon";

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
    console.log("data", data);

    tableComponent = (
      <table className="w-2/3 mt-10 border border-black">
        <thead className="bg-lincolngreen">
          <tr>
            <th className="border border-black">
              <div className="flex items-center justify-between mx-4 my-2">
                <span>Article</span> <ColumnOrderIcon />
              </div>
            </th>
            <th className="border border-black">
              <div className="flex items-center justify-between mx-4 my-2">
                <span>Word</span> <ColumnOrderIcon />
              </div>
            </th>
            <th className="border border-black">
              <div className="flex items-center justify-between mx-4 my-2">
                <span>Type</span> <ColumnOrderIcon />
              </div>
            </th>
            <th className="border border-black">
              <div className="flex items-center justify-between mx-4 my-2">
                <span>Language</span> <ColumnOrderIcon />
              </div>
            </th>
            <th className="border border-black"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((word) => (
            <tr key={word.wordId} className="bg-lincolngreenlighter">
              <td className="border border-black text-center">
                {word.article}
              </td>
              <td className="border border-black text-center">{word.text}</td>
              <td className="border border-black text-center">
                {getWordTypeName(word.type)}
              </td>
              <td className="border border-black text-center">
                {getLanguageName(word.languageCode)}
              </td>
              <td className="border border-black p-1">
                <Link
                  to={`word/${word.wordId}`}
                  className="inline-block align-middle"
                >
                  <BsPencilFill className="p-1 h-7 w-8 border border-black rounded-lg bg-green-900 fill-white hover:bg-green-600" />
                </Link>
              </td>
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
