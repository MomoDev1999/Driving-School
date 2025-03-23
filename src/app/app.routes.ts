import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { QuizPage } from './quiz/quiz.page';
import { ResultPage } from './result/result.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'quiz', component: QuizPage },
  { path: 'result', component: ResultPage }
];
