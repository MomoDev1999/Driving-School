// src/app/auth/login.page.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    this.errorMessage = '';
    this.loading = true;

    try {
      await this.auth.login({
        username: this.username,
        password: this.password,
      });
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (err) {
      this.errorMessage = 'Credenciales inválidas';
    } finally {
      this.loading = false;
    }
  }
}
