import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './app/interceptors/token.interceptor';
import { APP_INITIALIZER } from '@angular/core';
import { UserConfigurationService } from './app/services/user-configuration.service';

function initializeApp(configService: UserConfigurationService) {
  return () =>
    configService
      .getConfig()
      .then((cfg) => {
        const isDark = cfg.darkMode === true;
        document.body.classList.toggle('dark', isDark);
      })
      .catch(() => {
        // En caso de error, asegúrate de no aplicar el tema oscuro
        console.warn(
          'No se pudo obtener configuración, se aplica modo claro por defecto.'
        );
        document.body.classList.remove('dark');
      });
}

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    SQLite,
    UserConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [UserConfigurationService],
      multi: true,
    },
  ],
});
