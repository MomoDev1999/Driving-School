import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, IonToggle } from '@ionic/angular';
import { UserConfigurationService } from '../services/user-configuration.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-settings',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  darkMode = false;

  constructor(
    private configService: UserConfigurationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.configService.getConfig().then((cfg) => {
      this.darkMode = cfg.darkMode;
      this.setTheme(this.darkMode);
    });
  }

  onToggleDarkMode() {
    this.configService.setDarkMode(this.darkMode).then(() => {
      this.setTheme(this.darkMode);
    });
  }

  setTheme(enabled: boolean) {
    document.body.classList.toggle('dark', enabled);
  }

  goToChangePassword() {
    this.router.navigateByUrl('/change-password');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
