import { useReducer } from "react";

export type SearchWordsState = {
    query: string;
    filters: { [key: string]: number};
    isAdvanced: boolean;
};

export type SearchWordsAction = 
    | { type: 'SET_WORD_SEARCH'; word: string }
    | { type: 'SET_WORD_FILTERS'; column: string; value: number }
    | { type: 'TOGGLE_ADVANCED' }
    | { type: 'RESET_FILTERS' }

//If it's needed, this could be modified in the future, to be generic to multiple tables.
const searchWordsReducer = (state: SearchWordsState, action: SearchWordsAction): SearchWordsState => {
    switch (action.type){
        case 'SET_WORD_SEARCH':
            return {...state, query: action.word};
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
    return useReducer(searchWordsReducer, {query: "", filters: {}, isAdvanced: false});
};