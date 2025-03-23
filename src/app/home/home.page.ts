import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, LoadingOverlayComponent]
})
export class HomePage {
  isLoading = false;

  constructor(private router: Router) {}

  async startTest() {
    this.isLoading = true;

    // Pre-cargar imagen manualmente
    const img = new Image();
    img.src = 'assets/splash-removebg-preview.png';
    await img.decode(); // Espera a que cargue completamente

    // Espera opcional simulando carga (API o lógica pesada)
    setTimeout(() => {
      this.router.navigateByUrl('/quiz');
    }, 1000);
  }
}
