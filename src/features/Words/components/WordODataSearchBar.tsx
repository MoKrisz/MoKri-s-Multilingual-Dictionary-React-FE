import React, { useEffect, useState } from "react";
import {
  Filters,
  SearchWordsAction,
  SearchWordsState,
} from "../state/searchWordsReducer";
import { getFormLanguageOptions, getFormWordTypeOptions } from "../utils";
import { ODataSearchComponentProps } from "../../../components/ODataContainer";
import Button from "../../../components/Button";

const WordODataSearchBar: React.FC<
  ODataSearchComponentProps<SearchWordsState, SearchWordsAction>
> = ({ searchState, dispatch }) => {
  const [searchedWord, setSearchedWord] = useState<string>(searchState.word);
  const [advancedFilters, setAdvancedFilters] = useState<Filters>(
    searchState.filters
  );

  useEffect(() => {
    if (!searchState.isAdvanced && searchedWord !== searchState.word) {
      const handler = setTimeout(() => {
        dispatch({ type: "SET_WORD_SEARCH", word: searchedWord });
      }, 500);

      return () => clearTimeout(handler);
    }
  }, [searchState.isAdvanced, searchedWord, searchState.word, dispatch]);

  return (
    <div className="flex-col w-2/3">
      <div className="flex gap-4">
        <input
          className="px-2 bg-input-background rounded-md placeholder:text-black"
          type="text"
          value={searchedWord}
          onChange={(e) => setSearchedWord(e.target.value)}
          placeholder="Search word..."
        />
        <Button
          extraStyle="py-1"
          onClick={() => dispatch({ type: "TOGGLE_ADVANCED" })}
        >
          {searchState.isAdvanced
            ? "Hide advanced search"
            : "Show advanced search"}
        </Button>
      </div>
      {searchState.isAdvanced && (
        <div className="flex mt-3 gap-4 items-end">
          <div className="flex flex-col ">
            <label>Article</label>
            <input
              className="px-2 py-1 bg-input-background rounded-md w-20"
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
              className="px-2 py-1 bg-input-background rounded-md"
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
              className="px-2 py-1 bg-input-background focus:bg-lincolngreenlighter rounded-md"
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

          <Button
            extraStyle="py-1"
            onClick={() =>
              dispatch({
                type: "SET_WORD_FILTERS",
                word: searchedWord,
                filters: advancedFilters,
              })
            }
          >
            Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default WordODataSearchBar;
