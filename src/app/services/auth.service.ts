/****
 * @@@@@
 * Autor: ZAMBRANO LUIS
 */

/****
 * @@@@@
 * Importa los módulos necesarios para el servicio de autenticación.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

/****
 * @@@@@
 * Servicio de autenticación para manejar el inicio de sesión.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /****
   * @@@@@
   * URL de la API de autenticación.
   * @private
   * @constant {string}
   */
  private apiUrl = 'http://localhost:3000/api/auth'; // URL de la API

  /****
   * @@@@@
   * Constructor del servicio de autenticación.
   * @param {HttpClient} http - Cliente HTTP de Angular.
   */
  constructor(private http: HttpClient) {}

  /****
   * @@@@@
   * Método para manejar el inicio de sesión.
   * @param {Object} credentials - Credenciales del usuario.
   * @param {string} credentials.email - Correo electrónico del usuario.
   * @param {string} credentials.password - Contraseña del usuario.
   * @returns {Observable<any>} - Respuesta de la API.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  /****
   * @@@@@
   * Manejar errores de la solicitud HTTP.
   * @private
   * @param {HttpErrorResponse} error - Objeto de error HTTP.
   * @returns {Observable<never>} - Error lanzado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(() => new Error('Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.'));
  }
}
