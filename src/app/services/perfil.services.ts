/****
 * @@@@@
 * Autor: ZAMBRANO VALVERDE LUIS
 */

/****
 * @@@@@
 * Importa los módulos necesarios para el servicio de perfil.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

/****
 * @@@@@
 * Servicio de perfil para manejar operaciones relacionadas con el perfil del usuario.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  /****
   * @@@@@
   * URL de la API de perfil.
   * @private
   * @constant {string}
   */
  private apiUrl = 'http://localhost:3000/api/perfil'; // URL de la API

  /****
   * @@@@@
   * Constructor del servicio de perfil.
   * @param {HttpClient} http - Cliente HTTP de Angular.
   */
  constructor(private http: HttpClient) {}

  /****
   * @@@@@
   * Obtener los datos del usuario por su clienteId.
   * @param {number} clienteId - El ID del cliente.
   * @returns {Observable<any>} - Respuesta de la API con los datos del usuario.
   */
  obtenerDatosUsuario(clienteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario?clienteId=${clienteId}`).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  /****
   * @@@@@
   * Obtener los contactos del usuario por su clienteId.
   * @param {number} clienteId - El ID del cliente.
   * @returns {Observable<any[]>} - Respuesta de la API con los contactos del usuario.
   */
  obtenerContactos(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contactos?clienteId=${clienteId}`).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  /****
   * @@@@@
   * Eliminar un contacto por su contactoId.
   * @param {number} contactoId - El ID del contacto.
   * @returns {Observable<any>} - Respuesta de la API.
   */
  eliminarContacto(contactoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/contacto/${contactoId}`).pipe(
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
    return throwError(() => new Error('Ocurrió un error al procesar la solicitud.'));
  }
}
