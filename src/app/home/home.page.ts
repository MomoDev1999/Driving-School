import { Component, OnInit } from '@angular/core';
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

export class HomePage implements OnInit {
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoading = false;
  }

  async startTest() {
    this.isLoading = true;

    const img = new Image();
    img.src = 'assets/splash-removebg-preview.png';
    await img.decode();

    setTimeout(() => {
      this.router.navigateByUrl('/quiz');
    }, 1000);
  }
}
