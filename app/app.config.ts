/*
 * Autor: [Zambrano Vlaverde Luis Abraham]
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module'; // Ruta de importación correcta
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Proveer la detección de cambios en zona con consolidación de eventos
    provideRouter(routes), // Proveer el enrutador con las rutas
    provideHttpClient(), // Proveer el cliente HTTP
  ],
};
