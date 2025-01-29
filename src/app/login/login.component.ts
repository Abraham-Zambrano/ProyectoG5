/****
 * @@@@@
 * Autor: ZAMBRANO VALVERDE LUIS ABRAHAM
 */

/****
 * @@@@@
 * Importa los módulos necesarios para el componente.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/****
 * @@@@@
 * Componente para manejar el inicio de sesión.
 * @class
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], //importar CommonModule y FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /****
   * @@@@@
   * Correo electrónico del usuario.
   * @type {string}
   */
  email: string = '';

  /****
   * @@@@@
   * Contraseña del usuario.
   * @type {string}
   */
  password: string = '';

  /****
   * @@@@@
   * Mensaje de error.
   * @type {string}
   */
  errorMessage: string = ''; // Definir errorMessage

  /****
   * @@@@@
   * Constructor del componente.
   * @param {AuthService} authService - Servicio de autenticación.
   * @param {Router} router - Servicio de enrutamiento.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /****
   * @@@@@
   * Función para manejar el inicio de sesión.
   */
  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuarioId', response.user.id);
        localStorage.setItem('nombreUsuario', response.user.email);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        this.errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
      }
    );
  }
}
