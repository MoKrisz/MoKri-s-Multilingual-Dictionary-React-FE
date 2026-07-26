export interface GuessArticleWord {
  wordId: number;
  text: string;
}

export interface EvaluateGuessArticleResponseItem {
  wordId: number;
  text: string;
  answer: string;
  correctArticle: string;
  isCorrect: boolean;
}

export interface EvaluateGuessArticleRequestItem {
  wordId: number;
  answer: string;
}

export interface EvaluateGuessArticleRequest {
  guesses: EvaluateGuessArticleRequestItem[];
}