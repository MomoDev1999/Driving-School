// src/app/custom-quiz/custom-quiz.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ViewEncapsulation } from '@angular/core';
import {
  IonContent,
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-quiz',
  templateUrl: './custom-quiz.page.html',
  styleUrls: ['./custom-quiz.page.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCheckbox,
    IonButton,
    IonInput,
    LoadingOverlayComponent,
  ],
})
export class CustomQuizPage implements OnInit {
  categories: any[] = [];
  numQuestions: number = 10;
  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  onInputOnlyNumbers(event: any): void {
    const input = event.target as HTMLInputElement;
    const cleaned = (event.detail.value || '').replace(/\D/g, '');

    // actualiza el valor del input directamente (DOM)
    input.value = cleaned;

    // actualiza el modelo de forma segura
    this.numQuestions = cleaned;
  }

  loadCategories() {
    this.http
      .get<any[]>(`${environment.apiUrl}/categories`)
      .subscribe((data) => {
        this.categories = data.map((cat) => ({ ...cat, selected: false }));
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  startCustomQuiz() {
    const selectedIds = this.categories
      .filter((c) => c.selected)
      .map((c) => c.id);

    if (selectedIds.length === 0 || this.numQuestions < 1) {
      alert('Selecciona al menos una categoría y una cantidad válida');
      return;
    }

    this.isLoading = true;

    this.questionService
      .getRandomQuestionsByCategories(this.numQuestions, selectedIds)
      .then((questions) => {
        if (questions.length === 0) {
          alert(
            'No se encontraron preguntas para las categorías seleccionadas.'
          );
          this.isLoading = false;
          return;
        }

        if (questions.length < this.numQuestions) {
          alert(
            `Solo se encontraron ${questions.length} preguntas para las categorías seleccionadas. Se usará esa cantidad.`
          );
        }

        this.questionService.customQuestions = questions;
        this.router.navigate(['/quiz']);
      })
      .catch((err) => {
        console.error('Error cargando preguntas personalizadas:', err);
        this.isLoading = false;
        alert('Error al cargar preguntas. Intenta nuevamente.');
      });
  }
}
