import React, { useEffect, useState } from "react";
import {
  Filters,
  SearchWordsAction,
  SearchWordsState,
} from "../state/searchWordsReducer";
import { getFormLanguageOptions, getFormWordTypeOptions } from "../utils";
import { ODataSearchComponentProps } from "../../../components/ODataContainer";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";

const WordODataSearchBar: React.FC<
  ODataSearchComponentProps<SearchWordsState, SearchWordsAction>
> = ({ searchState, dispatch }) => {
  const { t } = useTranslation(["common", "words"]);
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
          placeholder={t("words:searchBarPlaceholder")}
        />
        <Button
          extraStyle="py-1"
          onClick={() => dispatch({ type: "TOGGLE_ADVANCED" })}
        >
          {searchState.isAdvanced
            ? t("advancedSearch.hide")
            : t("advancedSearch.show")}
        </Button>
      </div>
      {searchState.isAdvanced && (
        <div className="flex mt-3 gap-4 items-end">
          <div className="flex flex-col ">
            <label>{t("fields:article")}</label>
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
            <label>{t("fields:type")}</label>
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
              <option key="type_none" value="0"></option>
              {getFormWordTypeOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {t(`partsOfSpeech.${option.name}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>{t("fields:language")}</label>
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
                  {t(`languages.${option.name}`)}
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
            {t("search")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WordODataSearchBar;
