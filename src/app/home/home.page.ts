import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

  standalone: true,
  encapsulation: ViewEncapsulation.None,

  imports: [
    IonContent,
    IonButton,
    LoadingOverlayComponent, // ✅ Asegúrate de que este componente sea `standalone: true`
  ],
})
export class HomePage implements OnInit {
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoading = false;
  }

  ionViewWillEnter() {
    this.isLoading = false;
  }

  async startTest() {
    this.isLoading = true;
    const img = new Image();
    img.src = 'assets/splash-removebg-preview.png';
    await img.decode();

    setTimeout(() => {
      sessionStorage.setItem('quizType', 'normal');
      this.router.navigateByUrl('/quiz', { replaceUrl: true });
    }, 1000);
  }

  async startMiniQuiz() {
    this.isLoading = true;
    const img = new Image();
    img.src = 'assets/splash-removebg-preview.png';
    await img.decode();

    setTimeout(() => {
      sessionStorage.setItem('quizType', 'mini');
      this.router.navigateByUrl('/quiz', { replaceUrl: true });
    }, 1000);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  startCustomQuiz() {
    this.router.navigate(['/custom-quiz']);
  }

  goToStudyModules() {
    this.router.navigate(['/study-modules']);
  }

  goToMyProgress() {
    this.router.navigate(['/progreso']);
  }
}
