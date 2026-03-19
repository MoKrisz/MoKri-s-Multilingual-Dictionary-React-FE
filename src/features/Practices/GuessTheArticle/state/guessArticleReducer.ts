import { useReducer } from "react";
import { GuessArticlePracticeData } from "../models";

type GuessArticleState =
    | { step: "CONFIGURING" }
    | { step: "LOADING_DATA", wordCount: number; }
    | { step: "PRACTICE"; wordCount: number; currentIdx: number; answers: string[] }
    | { step: "RESULTS"; wordCount: number; answers: string[] }

type GuessArticleAction = 
    | { type: "WORD_COUNT_SELECTED"; count: number }
    | { type: "LOAD_DATA_SUCCESS"; items: GuessArticlePracticeData}
    | { type: "LOAD_DATA_ERROR"; message: string }
    | { type: "WORD_INDEX_REQUESTED"; index: number }
    | { type: "SET_ANSWER"; value: string }
    | { type: "SUBMIT"; }
    | { type: "SUBMIT_SUCCESS"; results: string }
    | { type: "SUBMIT_ERROR"; message: string }

const guessArticleReducer = (state: GuessArticleState, action: GuessArticleAction): GuessArticleState => 
{
    switch(action.type)
    {
        case "WORD_COUNT_SELECTED":
            return { step: "LOADING_DATA", wordCount: action.count }
        case "LOAD_DATA_SUCCESS":
            if (state.step === "LOADING_DATA")
            {
                return { step: "PRACTICE", wordCount: state.wordCount, currentIdx: 0, answers: [] }
            }
            
            return state;
        case "LOAD_DATA_ERROR":
            //TODO:
            return state
        case "WORD_INDEX_REQUESTED":
            if (state.step === "PRACTICE")
            {
                return { ...state, currentIdx: action.index }
            }

            return state;
        case "SET_ANSWER":
            //TODO:
            return state;
        default:
            return state;
    }
}

export const useGuessArticleReducer = () => {
    return useReducer(guessArticleReducer, {step: "CONFIGURING"});
}
