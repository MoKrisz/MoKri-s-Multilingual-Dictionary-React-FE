export interface GuessArticleWord {
  wordId: number;
  text: string;
}

export interface GuessArticlePracticeData {
  practiceWords: GuessArticleWord[];
}
