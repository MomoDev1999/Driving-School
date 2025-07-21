import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Question } from '../models/question.model';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';
import { TestResultService } from '../services/test-result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, IonContent, IonButton, LoadingOverlayComponent],
})
export class ResultPage implements OnInit, OnDestroy {
  answers: { question: Question; selected: string }[] = [];
  correct = 0;
  percentage = 0;
  incorrectAnswers: { question: Question; selected: string }[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private testResultService: TestResultService
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['answers']) {
      this.answers = nav.extras.state['answers'];

      this.correct = this.answers.filter(
        (a) => a.selected === a.question.correct
      ).length;

      this.percentage = Math.round((this.correct / this.answers.length) * 100);

      this.incorrectAnswers = this.answers.filter(
        (a) => a.selected !== a.question.correct
      );

      const mode =
        this.answers.length === 10
          ? '10'
          : this.answers.length === 30
          ? '30'
          : 'personalizado';

      this.testResultService
        .saveResult({
          mode,
          totalQuestions: this.answers.length,
          correctAnswers: this.correct,
          wrongAnswers: this.answers.length - this.correct,
        })
        .then(() => console.log('Resultado guardado'))
        .catch((err) => console.error('Error al guardar resultado:', err));
    }

    history.pushState(null, '', location.href);
    window.addEventListener('popstate', this.blockBackNavigation);

    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  ngOnDestroy() {
    window.removeEventListener('popstate', this.blockBackNavigation);
  }

  blockBackNavigation = () => {
    history.pushState(null, '', location.href);
  };

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
