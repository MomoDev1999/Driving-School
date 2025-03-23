import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  imports: [CommonModule, IonContent]
})
export class QuizPage implements OnInit {
  questions: Question[] = [];
  current = 0;
  answers: { question: Question, selected: string }[] = [];
  options: string[] = [];
  answered = false;
  selectedOption: string | null = null;
  preloadedImages: HTMLImageElement[] = [];
  preloadedSounds: HTMLAudioElement[] = [];
  isLoading = true;

  constructor(private questionService: QuestionService, private router: Router) {}

  async ngOnInit() {
    this.questions = await this.questionService.getRandomQuestions(30);
    this.preloadAssets();
    this.setOptions();
    this.isLoading = false;

    // Bloquea retroceso del navegador
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', this.blockBackNavigation);
  }

  ngOnDestroy() {
    // Limpia el listener cuando se destruye el componente
    window.removeEventListener('popstate', this.blockBackNavigation);
  }

  blockBackNavigation = () => {
    history.pushState(null, '', location.href);
  };

  preloadAssets() {
    // Precargar sonidos
    const soundPaths = ['assets/sounds/correct.mp3', 'assets/sounds/wrong.mp3'];
    soundPaths.forEach(src => {
      const audio = new Audio();
      audio.src = src;
      audio.load();
      this.preloadedSounds.push(audio);
    });

    // Precargar imágenes de las preguntas
    this.questions.forEach(q => {
      if (q.image_url) {
        const img = new Image();
        img.src = q.image_url;
        this.preloadedImages.push(img);
      }
    });
  }

  setOptions() {
    const q = this.questions[this.current];
    this.options = [q.correct, q.wrong_one, q.wrong_two, q.wrong_three].sort(() => 0.5 - Math.random());
    this.answered = false;
    this.selectedOption = null;
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C, D...
  }

  selectAnswer(option: string) {
    if (this.answered) return;

    this.answered = true;
    this.selectedOption = option;
    this.answers.push({ question: this.questions[this.current], selected: option });

    const isCorrect = option === this.questions[this.current].correct;
    this.playSound(`assets/sounds/${isCorrect ? 'correct' : 'wrong'}.mp3`);

    setTimeout(() => {
      this.current++;
      if (this.current < this.questions.length) {
        this.setOptions();
      } else {
        // Limpia bloqueo antes de navegar
        window.removeEventListener('popstate', this.blockBackNavigation);
        this.router.navigate(['/result'], {
          state: { answers: this.answers }
        });
      }
    }, 1000);
  }

  playSound(src: string) {
    const audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }
}
