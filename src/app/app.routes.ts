import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { QuizPage } from './quiz/quiz.page';
import { ResultPage } from './result/result.page';
import { authGuard } from './guards/auth.guard';
import { CustomQuizPage } from './custom-quiz/custom-quiz.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePage,
    canActivate: [authGuard],
  },
  {
    path: 'quiz',
    component: QuizPage,
    canActivate: [authGuard],
  },
  {
    path: 'custom-quiz',
    component: CustomQuizPage,
    canActivate: [authGuard],
  },
  {
    path: 'result',
    component: ResultPage,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
    canActivate: [authGuard],
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./settings/change-password.page').then(
        (m) => m.ChangePasswordPage
      ),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'study-modules',
    loadComponent: () =>
      import('./study-modules/study-modules.page').then(
        (m) => m.StudyModulesPage
      ),
  },  {
    path: 'study-module-detail',
    loadComponent: () => import('./study-module-detail/study-module-detail.page').then( m => m.StudyModuleDetailPage)
  },

];
