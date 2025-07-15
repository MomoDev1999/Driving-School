// src/app/quiz/quiz.page.ts
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonAlert } from '@ionic/angular/standalone';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';
import { Platform } from '@ionic/angular';

@Component({
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  imports: [CommonModule, IonContent, LoadingOverlayComponent, IonAlert],
})
export class QuizPage implements OnInit, OnDestroy {
  questions: Question[] = [];
  current = 0;
  answers: { question: Question; selected: string }[] = [];
  options: string[] = [];
  answered = false;
  selectedOption: string | null = null;
  isLoading = true;

  showCancelAlert = false;
  cancelButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => this.onCancelAlert(false),
    },
    {
      text: 'Sí',
      handler: () => this.onCancelAlert(true),
    },
  ];

  backButtonSubscription: any;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.resetQuiz();
    this.isLoading = true;

    const customQuestions = this.questionService.customQuestions;

    if (customQuestions && customQuestions.length) {
      this.questions = customQuestions;
      this.questionService.customQuestions = null; // Limpiar para evitar reusos
      this.preloadAssets();
      this.setOptions();
      this.isLoading = false;
      return;
    }

    const quizType = sessionStorage.getItem('quizType') || 'normal';
    sessionStorage.removeItem('quizType');
    const numQuestions = quizType === 'mini' ? 10 : 30;

    this.questionService.getRandomQuestions(numQuestions).then((questions) => {
      this.questions = questions;
      this.preloadAssets();
      this.setOptions();
      this.isLoading = false;
    });

    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.showCancelAlert = true;
      });
  }

  ionViewWillLeave() {
    this.backButtonSubscription?.unsubscribe();
  }

  ngOnDestroy() {
    this.backButtonSubscription?.unsubscribe();
  }

  resetQuiz() {
    this.current = 0;
    this.answers = [];
    this.answered = false;
    this.selectedOption = null;
  }

  onCancelAlert(confirm: boolean) {
    this.showCancelAlert = false;
    if (confirm) {
      this.backButtonSubscription?.unsubscribe();
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
  }

  preloadAssets() {
    ['assets/sounds/correct.mp3', 'assets/sounds/wrong.mp3'].forEach((src) => {
      const audio = new Audio(src);
      audio.load();
    });

    this.questions.forEach((q) => {
      if (q.imageUrl) {
        const img = new Image();
        img.src = q.imageUrl;
      }
    });
  }

  setOptions() {
    const q = this.questions[this.current];
    this.options = [q.correct, q.wrongOne, q.wrongTwo, q.wrongThree].sort(
      () => 0.5 - Math.random()
    );
    this.answered = false;
    this.selectedOption = null;
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  selectAnswer(option: string) {
    if (this.answered) return;

    this.answered = true;
    this.selectedOption = option;
    this.answers.push({
      question: this.questions[this.current],
      selected: option,
    });

    const isCorrect = option === this.questions[this.current].correct;
    this.playSound(`assets/sounds/${isCorrect ? 'correct' : 'wrong'}.mp3`);

    setTimeout(() => {
      this.current++;
      if (this.current < this.questions.length) {
        this.setOptions();
      } else {
        this.backButtonSubscription?.unsubscribe();
        this.isLoading = true;
        setTimeout(() => {
          this.router.navigate(['/result'], {
            state: { answers: this.answers },
          });
        }, 300);
      }
    }, 1000);
  }

  playSound(src: string) {
    const audio = new Audio(src);
    audio.play();
  }
}
