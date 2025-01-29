/****
 * @@@@@
 * GENERADO POR ANGULAR CLI
 */

/****
 * @@@@@
 * Importa los módulos necesarios para el guard.
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/****
 * @@@@@
 * Servicio de guardia de autenticación.
 * @class
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /****
   * @@@@@
   * Constructor del guardia de autenticación.
   * @param {Router} router - Servicio de enrutamiento de Angular.
   */
  constructor(private router: Router) {}

  /****
   * @@@@@
   * Método para determinar si la ruta puede ser activada.
   * @returns {boolean} - Retorna true si el usuario está autenticado, de lo contrario false.
   */
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; // Permitir el acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Redirigir a la página de login
      return false; // Bloquear el acceso a la ruta
    }
  }
}
