import FeaturePick from "../components/FeaturePick";
import { Link } from "react-router-dom";
import WordOdataTable from "../features/Words/components/WordOdataTable";
import Pagination from "../components/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useSearchWordsReducer } from "../features/Words/state/searchWordsReducer";
import WordsSearchBar from "../features/Words/components/WordsSearchBar";
import { useEffect } from "react";

export default function MenuPage() {
  const [searchWordsState, searchWordsDispatch] = useSearchWordsReducer();
  const { paginationData, paginationFunctions } = usePagination();

  useEffect(() => {
    if (searchWordsState.word || searchWordsState.filters) {
      paginationFunctions.setPage(1);
    }
  }, [searchWordsState.word, searchWordsState.filters]);

  return (
    <>
      <section className="h-1/2 md:h-1/4 mt-10 flex flex-col md:flex-row gap-5 items-center justify-evenly border border-blue-800">
        <Link to="new-word" className="w-2/3 h-1/2 md:w-1/6 md:h-full">
          <FeaturePick>Add Word</FeaturePick>
        </Link>
        <Link to="translation" className="w-2/3 h-1/2 md:w-1/6 md:h-full">
          <FeaturePick>Add Translation</FeaturePick>
        </Link>
      </section>
      <section className="w-2/3 flex flex-col justify-self-center border border-slate-900">
        <div className="mt-5">
          <WordsSearchBar
            key="words-list-search-bar"
            state={searchWordsState}
            dispatch={searchWordsDispatch}
          />
          <WordOdataTable
            paginationData={paginationData}
            paginationFunctions={paginationFunctions}
            searchWordsState={searchWordsState}
          />
          <Pagination
            paginationData={paginationData}
            paginationFunctions={paginationFunctions}
          />
        </div>
      </section>
    </>
  );
}
