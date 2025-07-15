// src/app/auth/register.page.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  birthday = '';
  errorMessage = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async register() {
    this.errorMessage = '';
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;
    try {
      await this.auth.register({
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        birthday: this.birthday,
      });
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (err) {
      this.errorMessage = 'No se pudo registrar';
    } finally {
      this.loading = false;
    }
  }
}
