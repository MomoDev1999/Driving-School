export interface Question {
    id: number;
    statement: string;
    image_url?: string;
    wrong_one: string;
    wrong_two: string;
    wrong_three: string;
    correct: string;
  }
