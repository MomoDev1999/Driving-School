import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

interface UserConfig {
  darkMode: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserConfigurationService {
  private apiUrl = `${environment.apiUrl}/config`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la configuración del usuario autenticado.
   */
  async getConfig(): Promise<UserConfig> {
    return await firstValueFrom(this.http.get<UserConfig>(this.apiUrl));
  }

  /**
   * Actualiza el valor de modo oscuro en el backend.
   */
  async setDarkMode(enabled: boolean): Promise<void> {
    await firstValueFrom(
      this.http.patch(
        `${this.apiUrl}/dark-mode?enabled=${enabled}`,
        {}, // cuerpo vacío
        { responseType: 'text' as 'json' } // evita error si el backend no devuelve JSON
      )
    );
  }

  /**
   * Aplica el tema oscuro o claro basado en la configuración del usuario.
   * Si falla, aplica modo claro por defecto.
   */
  applySavedTheme(): void {
    this.getConfig()
      .then((cfg) => {
        const isDark = cfg.darkMode === true;
        document.body.classList.toggle('dark', isDark);
      })
      .catch(() => {
        // fallback si falla la API
        document.body.classList.remove('dark');
        console.warn(
          'No se pudo aplicar el tema desde configuración, usando modo claro.'
        );
      });
  }
}
