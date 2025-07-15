// src/app/models/question.model.ts
export interface Question {
  id: number;
  statement: string;
  imageUrl?: string;
  wrongOne: string;
  wrongTwo: string;
  wrongThree: string;
  correct: string;
}
