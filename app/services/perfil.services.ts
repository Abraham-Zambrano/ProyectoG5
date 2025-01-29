/*
 * Autor: ZAMBRANO VALVERDE LUIS
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:3000/api/perfil'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener los datos del usuario por su clienteId
  obtenerDatosUsuario(clienteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario?clienteId=${clienteId}`).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  // Obtener los contactos del usuario por su clienteId
  obtenerContactos(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contactos?clienteId=${clienteId}`).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  // Eliminar un contacto por su contactoId
  eliminarContacto(contactoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/contacto/${contactoId}`).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  // Manejar errores de la solicitud HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(() => new Error('Ocurrió un error al procesar la solicitud.'));
  }
}
