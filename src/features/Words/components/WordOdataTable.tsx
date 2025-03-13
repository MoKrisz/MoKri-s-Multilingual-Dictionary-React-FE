import { Link } from "react-router-dom";
import ColumnOrderIcon from "../../../components/ColumnOrderIcon";
import { getLanguageName, getWordTypeName } from "../utils";
import { BsPencilFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { PaginationData } from "../../../components/Pagination";
import { PaginationFunctions } from "../../../hooks/usePagination";
import { SearchWordsState } from "../state/searchWordsReducer";
import { fetchWords } from "../api";
import { useEffect, useState } from "react";
import { ColumnOrderEnum } from "../../../models/ColumnOrderEnum";

interface WordOdataTableParams {
  paginationData: PaginationData;
  paginationFunctions: PaginationFunctions;
  searchWordsState: SearchWordsState;
}

export type WordSorting = {
  article: ColumnOrderEnum;
  text: ColumnOrderEnum;
  type: ColumnOrderEnum;
  languageCode: ColumnOrderEnum;
}

const initialSortingState: WordSorting = {
  article: ColumnOrderEnum.NoSort,
  text: ColumnOrderEnum.NoSort,
  type: ColumnOrderEnum.NoSort,
  languageCode: ColumnOrderEnum.NoSort
} 

export type WordSortingKeys = keyof WordSorting;

export default function WordOdataTable({
  paginationData,
  paginationFunctions,
  searchWordsState,
}: WordOdataTableParams) {
  const [sorting, setSorting] = useState<WordSorting>(initialSortingState);
  const { data, isPending, isError } = useQuery({
    queryKey: [
      "words",
      paginationData,
      searchWordsState.word,
      searchWordsState.filters,
      sorting
    ],
    queryFn: ({ signal }) =>
      fetchWords({ pagination: paginationData, searchWordsState, sorting, signal }),
    staleTime: 120000
  });

  useEffect(() => {
    if (data?.count) {
      paginationFunctions.setDataCount(data?.count);
    }
  }, [data]);

  if (isPending) return <p>Getting the words...</p>;
  if (isError) return <p>Something went wrong...</p>;

  const changeSorting = (column: WordSortingKeys) => {
    setSorting(prevSort => {
      const newSort = {...prevSort};

      if (newSort[column] === ColumnOrderEnum.NoSort) {
        newSort[column] = ColumnOrderEnum.Ascending;
      }
      else if (newSort[column] === ColumnOrderEnum.Ascending) {
        newSort[column] = ColumnOrderEnum.Descending;
      }
      else {
        newSort[column] = ColumnOrderEnum.NoSort;
      }

      return newSort;
    });
  }

  return (
    <table className="w-full mt-5 border border-black">
      <thead className="bg-lincolngreen">
        <tr>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>Article</span> <ColumnOrderIcon sortingState={sorting["article"]} clickHandler={() => changeSorting("article")} />
            </div>
          </th>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>Word</span> <ColumnOrderIcon sortingState={sorting["text"]} clickHandler={() => changeSorting("text")} />
            </div>
          </th>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>Type</span> <ColumnOrderIcon sortingState={sorting["type"]} clickHandler={() => changeSorting("type")} />
            </div>
          </th>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>Language</span> <ColumnOrderIcon sortingState={sorting["languageCode"]} clickHandler={() => changeSorting("languageCode")}/>
            </div>
          </th>
          <th className="border border-black"></th>
        </tr>
      </thead>
      <tbody>
        {data.words.map((word) => (
          <tr key={word.wordId} className="bg-lincolngreenlighter">
            <td className="border border-black text-center">{word.article}</td>
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
