/****
 * @@@@@
 * Autor: Zambrano Luis
 */

/****
 * @@@@@
 * Importa los módulos necesarios para el módulo de inicio de sesión.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { LoginComponent } from '../login/login.component';

/****
 * @@@@@
 * Módulo para el inicio de sesión de la aplicación.
 * @module LoginModule
 */
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule // Asegúrate de incluir FormsModule aquí
  ]
})
export class LoginModule {}
