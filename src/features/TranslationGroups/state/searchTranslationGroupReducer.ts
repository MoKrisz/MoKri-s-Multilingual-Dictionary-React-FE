import { useReducer } from "react";

export type SearchTranslationGroupState = {
  description: string;
  tagIds: number[];
};

const initialState: SearchTranslationGroupState = {
  description: "",
  tagIds: [],
};

export type SearchTranslationGroupAction =
  | { type: "SET_DESCRIPTION_SEARCH"; description: string }
  | { type: "SET_TAGS_SEARCH"; tagIds: number[] }
  | { type: "RESET_SEARCH" };

const searchTranslationGroupReducer = (
  state: SearchTranslationGroupState,
  action: SearchTranslationGroupAction
): SearchTranslationGroupState => {
  switch (action.type) {
    case "SET_DESCRIPTION_SEARCH":
      return { ...state, description: action.description };
    case "SET_TAGS_SEARCH":
      return { ...state, tagIds: action.tagIds };
    case "RESET_SEARCH":
      return initialState;
  }
};

export const useSearchTranslationGroupReducer = () => {
  return useReducer(searchTranslationGroupReducer, initialState);
};
