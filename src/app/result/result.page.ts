import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton
} from '@ionic/angular/standalone';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton]
})
export class ResultPage implements OnInit {
  answers: { question: Question; selected: string }[] = [];
  correct = 0;
  percentage = 0;
  incorrectAnswers: { question: Question; selected: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['answers']) {
      this.answers = nav.extras.state['answers'];
      this.correct = this.answers.filter(
        (a) => a.selected === a.question.correct
      ).length;
      this.percentage = Math.round(
        (this.correct / this.answers.length) * 100
      );
      this.incorrectAnswers = this.answers.filter(
        (a) => a.selected !== a.question.correct
      );
    }
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

}
