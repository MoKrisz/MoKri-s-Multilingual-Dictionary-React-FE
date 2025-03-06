import { useReducer } from "react";

export type SearchWordsState = {
    word?: string;
    filters: { 
        article?: string;
        type?: number;
        languageCode?: number;
    };
    isAdvanced: boolean;
};

type FilterKey = keyof SearchWordsState["filters"];

export type SearchWordsAction = 
    | { type: 'SET_WORD_SEARCH'; word: string }
    | { type: 'SET_WORD_FILTERS'; column: FilterKey; value: string | number }
    | { type: 'TOGGLE_ADVANCED' }
    | { type: 'RESET_FILTERS' }

//If it's needed, this could be modified in the future, to be generic for multiple tables.
const searchWordsReducer = (state: SearchWordsState, action: SearchWordsAction): SearchWordsState => {
    switch (action.type){
        case 'SET_WORD_SEARCH':
            return {...state, word: action.word};
        case 'SET_WORD_FILTERS':
            return {...state, filters: {...state.filters, [action.column]: action.value}};
        case 'TOGGLE_ADVANCED':
            return {...state, isAdvanced: !state.isAdvanced};
        case 'RESET_FILTERS':
            return {...state, filters: {}};
        default:
            return state;
    }
};

export const useSearchWordsReducer = () => {
    return useReducer(searchWordsReducer, {word: undefined, filters: {}, isAdvanced: false});
};