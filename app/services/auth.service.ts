/*
 * Autor: ZAMBRANO LUIS
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para manejar el inicio de sesión
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  // Manejar errores de la solicitud HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(() => new Error('Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.'));
  }
}
