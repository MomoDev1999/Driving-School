import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Question {
  id: number;
  statement: string;
  image_url?: string;
  wrong_one: string;
  wrong_two: string;
  wrong_three: string;
  correct: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private dbInstance?: SQLiteObject;
  private isMobile = false;

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private http: HttpClient
  ) {
    this.initDB();
  }

  async initDB() {
    await this.platform.ready();

    this.isMobile = this.platform.is('capacitor') || this.platform.is('cordova');

    if (!this.isMobile) {
      console.warn('Modo navegador: se usará archivo JSON como base de datos.');
      return;
    }

    try {
      this.dbInstance = await this.sqlite.create({
        name: 'quiz.db',
        location: 'default',
      });

      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS questions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          statement TEXT,
          image_url TEXT,
          wrong_one TEXT,
          wrong_two TEXT,
          wrong_three TEXT,
          correct TEXT
        );`,
        []
      );

      const res = await this.dbInstance.executeSql(
        `SELECT COUNT(*) as count FROM questions`, []
      );
      if (res.rows.item(0).count === 0) {
        await this.seedQuestions();
      }

    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  async seedQuestions() {
    const sampleQuestions: Question[] = [
      {
        id: 0,
        statement: '¿Cuál es la capital de Argentina?',
        image_url: '',
        wrong_one: 'Lima',
        wrong_two: 'Santiago',
        wrong_three: 'Montevideo',
        correct: 'Buenos Aires',
      },
      {
        id: 0,
        statement: '¿Cuál es el resultado de 5 + 7?',
        image_url: '',
        wrong_one: '10',
        wrong_two: '11',
        wrong_three: '15',
        correct: '12',
      }
    ];

    for (const q of sampleQuestions) {
      await this.dbInstance!.executeSql(
        `INSERT INTO questions (statement, image_url, wrong_one, wrong_two, wrong_three, correct)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [q.statement, q.image_url, q.wrong_one, q.wrong_two, q.wrong_three, q.correct]
      );
    }
  }

  async getRandomQuestions(count: number): Promise<Question[]> {
    if (!this.isMobile) {
      const data = await firstValueFrom(
        this.http.get<Question[]>('/assets/data/questions.json')
      );
      const shuffled = data.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    if (!this.dbInstance) {
      throw new Error('Base de datos no inicializada.');
    }

    const result = await this.dbInstance.executeSql(
      `SELECT * FROM questions ORDER BY RANDOM() LIMIT ?`, [count]
    );

    const questions: Question[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      questions.push(result.rows.item(i));
    }

    return questions;
  }
}
