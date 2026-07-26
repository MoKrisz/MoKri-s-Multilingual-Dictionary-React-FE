import { useReducer } from "react";
import { EvaluateGuessArticleResponseItem, GuessArticleWord } from "../models";

type PracticeData = {
  wordCount: number;
  currentIdx: number;
  words: GuessArticleWord[];
  answers: Record<number, string | undefined>;
};

type GuessArticleState =
  | { step: "CONFIGURING" }
  | { step: "LOADING_DATA"; wordCount: number }
  | ({ step: "PRACTICE" } & PracticeData)
  | ({ step: "WAITING_FOR_RESULTS" } & PracticeData)
  | { step: "RESULTS"; results: EvaluateGuessArticleResponseItem[] };

type GuessArticleAction =
  | { type: "WORD_COUNT_SELECTED"; count: number }
  | { type: "LOAD_DATA_SUCCESS"; words: GuessArticleWord[] }
  | { type: "LOAD_DATA_ERROR"; message: string }
  | { type: "WORD_INDEX_REQUESTED"; index: number }
  | { type: "SET_ANSWER"; answer: string }
  | { type: "SUBMIT" }
  | { type: "SUBMIT_SUCCESS"; results: EvaluateGuessArticleResponseItem[] }
  | { type: "SUBMIT_ERROR"; message: string }
  | { type: "RESTART" };

const guessArticleReducer = (
  state: GuessArticleState,
  action: GuessArticleAction,
): GuessArticleState => {
  switch (action.type) {
    case "WORD_COUNT_SELECTED":
      if (action.count <= 0) return state;

      return { step: "LOADING_DATA", wordCount: action.count };
    case "LOAD_DATA_SUCCESS":
      if (state.step !== "LOADING_DATA") return state;

      return {
        step: "PRACTICE",
        wordCount: state.wordCount,
        currentIdx: 0,
        words: action.words,
        answers: {},
      };
    case "LOAD_DATA_ERROR":
      //TODO:
      console.log(
        "An error happened at LOAD_DATA_ERROR in guessArticleReducer",
      );
      return state;
    case "WORD_INDEX_REQUESTED":
      if (state.step !== "PRACTICE") return state;

      if (action.index < 0 || action.index >= state.words.length) return state;

      return { ...state, currentIdx: action.index };
    case "SET_ANSWER":
      if (state.step !== "PRACTICE") return state;

      const currentWord = state.words[state.currentIdx];
      const nextIndex =
        state.currentIdx < state.words.length - 1
          ? state.currentIdx + 1
          : state.currentIdx;

      return {
        ...state,
        currentIdx: nextIndex,
        answers: {
          ...state.answers,
          [currentWord.wordId]: action.answer,
        },
      };
    case "SUBMIT":
      if (state.step !== "PRACTICE") return state;

      return { ...state, step: "WAITING_FOR_RESULTS" };
    case "SUBMIT_SUCCESS":
      if (state.step !== "WAITING_FOR_RESULTS") return state;

      return {
        step: "RESULTS",
        results: action.results
      }
    case "SUBMIT_ERROR":
      //TODO:
      console.log(
        "An error happened at LOAD_DATA_ERROR in guessArticleReducer",
      );

      return state;
    case "RESTART":
      if (state.step !== "RESULTS") return state;

      return { step: "CONFIGURING" }
    default:
      return state;
  }
};

export const useGuessArticleReducer = () => {
  return useReducer(guessArticleReducer, { step: "CONFIGURING" });
};
