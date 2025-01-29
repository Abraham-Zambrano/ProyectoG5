import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {
  private apiUrl = 'http://localhost:3000/api/transacciones'; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para obtener el correo basado en el id del usuario
  obtenerCorreoPorUsuarioId(usuarioId: number): Observable<{ email: string }> {
    return this.http.get<{ email: string }>(`${this.apiUrl}/correo?usuarioId=${usuarioId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener el cliente_id basado en el email
  obtenerClienteIdPorEmail(email: string): Observable<{ id: number }> {
    return this.http.get<{ id: number }>(`${this.apiUrl}/cliente?email=${email}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para realizar una transferencia
  realizarTransferencia(transferencia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transferencia`, transferencia).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  // Método para obtener el historial de transacciones
  obtenerHistorialTransacciones(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/historial?usuarioId=${usuarioId}`).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  // Método para obtener el resumen de la cuenta (saldo, ingresos, gastos)
  obtenerResumenCuenta(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumen?usuarioId=${usuarioId}`).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  // Método para obtener transacciones con filtros
  obtenerTransaccionesConFiltros(usuarioId: number, filtros: any): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('usuarioId', usuarioId.toString());
    if (filtros.fechaInicio) {
      params = params.append('fechaInicio', filtros.fechaInicio);
    }
    if (filtros.fechaFin) {
      params = params.append('fechaFin', filtros.fechaFin);
    }
    if (filtros.concepto) {
      params = params.append('tipo', filtros.concepto); // Usa 'tipo' en lugar de 'concepto'
    }

    return this.http.get<any[]>(`${this.apiUrl}/filtradas`, { params }).pipe(
      catchError(this.handleError) // Manejar errores
    );
  }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error.message); // Imprimir el mensaje de error específico
    return throwError(() => new Error('Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.'));
  }
}
