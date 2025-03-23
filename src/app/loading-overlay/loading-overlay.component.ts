import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule, IonSpinner],
  template: `
    <div class="overlay" *ngIf="visible">
      <img src="assets/splash-removebg-preview.png" alt="Logo" class="loading-logo" />
      <ion-spinner name="dots" class="spinner"></ion-spinner>
      <p class="loading-text">Cargando...</p>
      <div class="signature">MomoDev 🐌✨</div>
    </div>
  `,
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent {
  @Input() visible = false;
}
