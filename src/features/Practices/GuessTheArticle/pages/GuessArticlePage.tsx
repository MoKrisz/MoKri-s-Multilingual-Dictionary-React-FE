import { useParams } from "react-router-dom";
import Title from "../../../../components/Title";
import { LANGUAGES } from "../../../../config/languageConfig";
import Flag from "../../../../components/Flag";
import GuessArticleCountSelector from "../components/GuessArticleCountSelector";
import { useMutation } from "@tanstack/react-query";
import {
  getRandomWordsForArticlePractice,
  postGuessArticleEvaluation,
} from "../api";
import PracticeInterface from "../components/PracticeInterface";
import { useGuessArticleReducer } from "../state/guessArticleReducer";
import {
  EvaluateGuessArticleRequest,
  EvaluateGuessArticleRequestItem,
} from "../models";
import ResultInterface from "../components/ResultInterface";

type GuessArticleParam = {
  languageNameKey: string;
};

export default function GuessArticlePage() {
  const { languageNameKey } = useParams<GuessArticleParam>();

  const language = LANGUAGES.find((l) => l.nameKey === languageNameKey);

  if (!language) {
    //TODO: error handling
  }

  const [state, dispatch] = useGuessArticleReducer();

  const loadPracticeWords = useMutation({
    mutationFn: (count: number) =>
      getRandomWordsForArticlePractice(language?.code!, count),
    onSuccess: (data) => dispatch({ type: "LOAD_DATA_SUCCESS", words: data }),
    onError: (error) =>
      dispatch({ type: "LOAD_DATA_ERROR", message: error.message }),
  });

  const loadEvaluateResults = useMutation({
    mutationFn: (answers: Record<number, string | undefined>) => {
      const guesses: EvaluateGuessArticleRequestItem[] = Object.entries(
        answers,
      ).map(([wordId, answer]) => ({
        wordId: Number(wordId),
        answer: answer!,
      }));

      const request: EvaluateGuessArticleRequest = { guesses: guesses };

      return postGuessArticleEvaluation(request);
    },
    onSuccess: (data) => dispatch({ type: "SUBMIT_SUCCESS", results: data }),
    onError: (error) =>
      dispatch({ type: "SUBMIT_ERROR", message: error.message }),
  });

  const renderContent = () => {
    switch (state.step) {
      case "CONFIGURING":
        return (
          <GuessArticleCountSelector
            onClick={(count) => {
              dispatch({ type: "WORD_COUNT_SELECTED", count: count });
              loadPracticeWords.mutate(count);
            }}
          />
        );
      case "LOADING_DATA":
        return <p>Loading data...</p>;
      case "PRACTICE":
      case "WAITING_FOR_RESULTS":
        return (
          <PracticeInterface
            language={language!}
            currentWordIdx={state.currentIdx}
            practiceWords={state.words}
            answers={state.answers}
            setCurrentWordIdx={(idx) =>
              dispatch({ type: "WORD_INDEX_REQUESTED", index: idx })
            }
            onAnswerSelect={(article) =>
              dispatch({ type: "SET_ANSWER", answer: article })
            }
            canSubmit={
              state.step === "PRACTICE" &&
              state.words.every(
                (word) => state.answers[word.wordId] !== undefined,
              )
            }
            onSubmit={() => {
              loadEvaluateResults.mutate(state.answers);
              dispatch({ type: "SUBMIT" });
            }}
            isSubmitting={state.step === "WAITING_FOR_RESULTS"}
          />
        );
      case "RESULTS":
        return (
          <ResultInterface
            results={state.results}
            restart={() => dispatch({ type: "RESTART" })}
          />
        );
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 mb-8">
        <Flag flagCode={language!.flagCode} />
        <Title
          localeTitleKey={`languages.${language!.nameKey}`}
          extraStyle="m-0"
        />
      </div>
      {renderContent()}
    </>
  );
}
