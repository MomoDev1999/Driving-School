import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  goBack() {
    this.router.navigate(['/settings']);
  }

  async updatePassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    try {
      await this.http
        .post(`${environment.apiUrl}/auth/change-password`, {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .toPromise();

      this.successMessage = 'Contraseña actualizada';
      this.oldPassword = this.newPassword = this.confirmPassword = '';
    } catch (error) {
      this.errorMessage = 'No se pudo cambiar la contraseña';
    }
  }
}
