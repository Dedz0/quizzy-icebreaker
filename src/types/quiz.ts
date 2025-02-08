
export interface QuizState {
  username: string;
  theme: string;
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  theme: string;
  answers: Answer[];
  explanation: string;
}
