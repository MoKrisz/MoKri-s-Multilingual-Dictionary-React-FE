import { useParams } from "react-router-dom";
import Title from "../../../../components/Title";
import { LANGUAGES } from "../../../../config/languageConfig";
import Flag from "../../../../components/Flag";
import GuessArticleCountSelector from "../components/GuessArticleCountSelector";
import { useMutation } from "@tanstack/react-query";
import { getRandomWordsForArticlePractice } from "../api";
import PracticeInterface from "../components/PracticeInterface";
import { useGuessArticleReducer } from "../state/guessArticleReducer";

type GuessArticleParam = {
  languageNameKey: string;
};

export default function GuessArticlePage() {
  const { languageNameKey } = useParams<GuessArticleParam>();

  const language = LANGUAGES.find(l => l.nameKey === languageNameKey);

  if (!language)
  {
    //TODO: error handling
  }

  const [state, dispatch] = useGuessArticleReducer();

  const loadPracticeWords = useMutation({
    mutationFn: (count: number) => getRandomWordsForArticlePractice(language?.code!, count),
    onSuccess: data => dispatch({type: "LOAD_DATA_SUCCESS", words: data}),
    onError: error => dispatch({type: "LOAD_DATA_ERROR", message: error.message})
  });

  const renderContent = () => {
    switch (state.step) {
      case "CONFIGURING":
        return <GuessArticleCountSelector onClick={
          count => {
            dispatch({type: "WORD_COUNT_SELECTED", count: count});
            loadPracticeWords.mutate(count);
          }} />;
      case "LOADING_DATA":
        return <p>Loading data...</p>
      case "PRACTICE":
        return (
          <PracticeInterface
            language={language!}
            currentWordIdx={state.currentIdx}
            practiceWords={state.words}
            answers={state.answers}
            setCurrentWordIdx={(idx) => dispatch({type: "WORD_INDEX_REQUESTED", index: idx})}
            onAnswerSelect={(article) => dispatch({type: "SET_ANSWER", answer: article})}
          />
        );
      case "RESULTS":
        return <div>Results...</div>;
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
