import { Dispatch } from "react";
import {
  SearchWordsAction,
  SearchWordsState,
} from "../state/searchWordsReducer";
import { getFormLanguageOptions, getFormWordTypeOptions } from "../utils";

interface SearchWordsProps {
  state: SearchWordsState;
  dispatch: Dispatch<SearchWordsAction>;
}

export default function WordsSearchBar({ state, dispatch }: SearchWordsProps) {
  return (
    <div className="flex-col">
      <div className="flex justify-center gap-4">
        <input
          className="w-1/3 px-2 bg-lincolngreen focus:bg-lincolngreenlighter rounded-md placeholder:text-black"
          type="text"
          value={state.word}
          onChange={(e) =>
            dispatch({ type: "SET_WORD_SEARCH", word: e.target.value })
          }
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
              value={state.filters?.["article"]}
              onChange={(e) =>
                dispatch({
                  type: "SET_WORD_FILTERS",
                  column: "article",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Type</label>
            <select
              className="px-2 py-1 bg-lincolngreen focus:bg-lincolngreenlighter rounded-md"
              value={state.filters?.["type"]}
              onChange={(e) =>
                dispatch({
                  type: "SET_WORD_FILTERS",
                  column: "type",
                  value: Number(e.target.value),
                })
              }
            >
              <option key="language_none" value={undefined}></option>
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
              value={state.filters?.["languageCode"]}
              onChange={(e) =>
                dispatch({
                  type: "SET_WORD_FILTERS",
                  column: "languageCode",
                  value: Number(e.target.value),
                })
              }
            >
              <option key="language_none" value={undefined}></option>
              {getFormLanguageOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <button className="border border-black px-2 py-1 rounded-md bg-green-900 text-white hover:bg-green-600">
            Search
          </button>
        </div>
      )}
    </div>
  );
}
