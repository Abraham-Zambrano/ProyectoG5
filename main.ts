/*
 * Autor:ZAMBRANO VALVERDE LUIS ABRAHAM
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Iniciar la aplicación con el componente principal y la configuración
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err)); // Manejar errores en la inicialización
