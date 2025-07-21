import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { ViewWillEnter } from '@ionic/angular';
import {
  TestResultService,
  UserTestResult,
} from '../services/test-result.service';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.page.html',
  styleUrls: ['./progreso.page.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, IonContent, IonButton],
})
export class ProgresoPage implements ViewWillEnter {
  results: UserTestResult[] = [];

  constructor(
    private testResultService: TestResultService,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    this.testResultService.getUserResults().subscribe({
      next: (res) => {
        this.results = res;
      },
      error: (err) => {
        console.error('❌ Error al obtener resultados:', err);
        alert('No se pudo cargar el historial de resultados.');
      },
    });
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
