import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TestResultPayload {
  mode: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export interface UserTestResult {
  id: number;
  mode: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class TestResultService {
  private apiUrl = `${environment.apiUrl}/test-results`;

  constructor(private http: HttpClient) {}

  async saveResult(payload: TestResultPayload): Promise<void> {
    await firstValueFrom(this.http.post(`${this.apiUrl}`, payload));
  }

  getUserResults(): Observable<UserTestResult[]> {
    return this.http.get<UserTestResult[]>(`${this.apiUrl}/my-results`);
  }
}
