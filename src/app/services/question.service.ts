// src/app/services/question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = `${environment.apiUrl}/questions`;

  // Esta propiedad guarda las preguntas personalizadas temporalmente
  customQuestions: Question[] | null = null;

  constructor(private http: HttpClient) {}

  async getRandomQuestions(count: number): Promise<Question[]> {
    return await firstValueFrom(
      this.http.get<Question[]>(`${this.apiUrl}/random?count=${count}`)
    );
  }

  async getRandomQuestionsByCategories(
    count: number,
    categoryIds: number[]
  ): Promise<Question[]> {
    const query =
      `count=${count}` + categoryIds.map((id) => `&categoryIds=${id}`).join('');
    return await firstValueFrom(
      this.http.get<Question[]>(`${this.apiUrl}/random/by-category?${query}`)
    );
  }
}
