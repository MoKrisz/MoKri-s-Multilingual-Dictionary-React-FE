import { Dispatch, useEffect, useState } from "react";
import {
  Filters,
  SearchWordsAction,
  SearchWordsState,
} from "../state/searchWordsReducer";
import { getFormLanguageOptions, getFormWordTypeOptions } from "../utils";

interface SearchWordsProps {
  state: SearchWordsState;
  dispatch: Dispatch<SearchWordsAction>;
}

export default function WordsSearchBar({ state, dispatch }: SearchWordsProps) {
  const [searchedWord, setSearchedWord] = useState<string>(state.word);
  const [advancedFilters, setAdvancedFilters] = useState<Filters>(state.filters);

  useEffect(() => {
    if (!state.isAdvanced && searchedWord !== state.word) {
      const handler = setTimeout(() => {
        dispatch({ type: "SET_WORD_SEARCH", word: searchedWord });
      }, 500);

      return () => clearTimeout(handler);
    }
  }, [state.isAdvanced, searchedWord, state.word, dispatch]);

  return (
    <div className="flex-col">
      <div className="flex justify-center gap-4">
        <input
          className="w-1/3 px-2 bg-lincolngreen focus:bg-lincolngreenlighter rounded-md placeholder:text-black"
          type="text"
          value={searchedWord}
          onChange={(e) => setSearchedWord(e.target.value)}
          placeholder="Search word..."
        />
        <button
          className="border border-black py-1 px-2 rounded-md bg-green-900 text-white hover:bg-green-600"
          onClick={() => dispatch({ type: "TOGGLE_ADVANCED" })}
        >
          {state.isAdvanced ? "Hide advanced search" : "Show advanced search"}
        </button>
      </div>
      {state.isAdvanced && (
        <div className="flex justify-center gap-20 items-end">
          <div className="flex flex-col ">
            <label>Article</label>
            <input
              className="px-2 py-1 bg-lincolngreen focus:bg-lincolngreenlighter rounded-md"
              type="text"
              value={advancedFilters.article}
              onChange={(e) =>
                setAdvancedFilters((prevState) => ({
                  ...prevState,
                  article: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Type</label>
            <select
              className="px-2 py-1 bg-lincolngreen focus:bg-lincolngreenlighter rounded-md"
              value={advancedFilters.type}
              onChange={(e) =>
                setAdvancedFilters((prevstate) => ({
                  ...prevstate,
                  type: Number(e.target.value),
                }))
              }
            >
              <option key="language_none" value="0"></option>
              {getFormWordTypeOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Language</label>
            <select
              className="px-2 py-1 bg-lincolngreen focus:bg-lincolngreenlighter rounded-md"
              value={advancedFilters.languageCode}
              onChange={(e) =>
                setAdvancedFilters((prevState) => ({
                  ...prevState,
                  languageCode: Number(e.target.value),
                }))
              }
            >
              <option key="language_none" value="0"></option>
              {getFormLanguageOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="border border-black px-2 py-1 rounded-md bg-green-900 text-white hover:bg-green-600"
            onClick={() => dispatch({type: "SET_WORD_FILTERS", word: searchedWord, filters: advancedFilters})}
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
}
