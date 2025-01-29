/****
 * @@@@@
 * Autor: [Zambrano Valverde Luis Abraham]
 */

/****
 * @@@@@
 * Importa los módulos necesarios para la configuración de la aplicación.
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module'; // Ruta de importación correcta
import { provideHttpClient } from '@angular/common/http';

/****
 * @@@@@
 * Configuración de la aplicación.
 * @constant {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Proveer la detección de cambios en zona con consolidación de eventos
    provideRouter(routes), // Proveer el enrutador con las rutas
    provideHttpClient(), // Proveer el cliente HTTP
  ],
};
