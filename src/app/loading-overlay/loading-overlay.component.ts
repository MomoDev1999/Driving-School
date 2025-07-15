import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, IonSpinner],
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
})
export class LoadingOverlayComponent {
  @Input() visible = false;
}
