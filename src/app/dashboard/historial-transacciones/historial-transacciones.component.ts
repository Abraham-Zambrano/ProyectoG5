/****
 * @@@@@
 * Autor: Zambrano Valverde Luis Abraham
 */

/****
 * @@@@@
 * Importa los módulos necesarios para el componente.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // RouterModule
import { TransaccionesService } from '../../services/transacciones.service';

/****
 * @@@@@
 * Componente para gestionar el historial de transacciones del usuario.
 * @class
 */
@Component({
  selector: 'app-historial-transacciones',
  standalone: true,
  imports: [CommonModule, RouterModule], // CommonModule y RouterModule se importan
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.css']
})
export class HistorialTransaccionesComponent implements OnInit {
  /****
   * @@@@@
   * Lista de transacciones del usuario.
   * @type {Array}
   */
  transacciones: any[] = [];

  /****
   * @@@@@
   * ID del usuario.
   * @type {number}
   */
  usuarioId: number = 0;

  /****
   * @@@@@
   * Constructor del componente.
   * @param {TransaccionesService} transaccionesService - Servicio de transacciones.
   */
  constructor(private transaccionesService: TransaccionesService) {}

  /****
   * @@@@@
   * Método ngOnInit para inicializar el componente.
   */
  ngOnInit(): void {
    this.usuarioId = this.obtenerUsuarioId();
    if (this.usuarioId === 0) {
      alert('Debe iniciar sesión para ver el historial de transacciones');
      window.location.href = '/login';
      return;
    }
    this.obtenerHistorial();
  }

  /****
   * @@@@@
   * Obtener el ID del usuario almacenado en localStorage.
   * @returns {number} - El ID del usuario.
   */
  obtenerUsuarioId(): number {
    const usuarioId = localStorage.getItem('usuarioId');
    return usuarioId ? Number(usuarioId) : 0;
  }

  /****
   * @@@@@
   * Obtener el historial de transacciones del usuario.
   */
  obtenerHistorial(): void {
    this.transaccionesService.obtenerHistorialTransacciones(this.usuarioId).subscribe({
      next: (data: any[]) => {
        this.transacciones = data;
      },
      error: (error: any) => {
        console.error('Error al obtener las transacciones', error);
        if (error.status === 401) {
          alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
          window.location.href = '/login';
        }
      }
    });
  }
}
