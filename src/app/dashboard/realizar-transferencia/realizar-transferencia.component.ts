/****
 * @@@@@
 * Autor: Zambrano Valverde Luis Abraham
 */

/****
 * @@@@@
 * Importa los módulos necesarios para el componente.
 */
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransaccionesService } from '../../services/transacciones.service';

/****
 * @@@@@
 * Componente para realizar una transferencia.
 * @class
 */
@Component({
  selector: 'app-realizar-transferencia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './realizar-transferencia.component.html',
  styleUrls: ['./realizar-transferencia.component.css']
})
export class RealizarTransferenciaComponent implements OnInit {
  /****
   * @@@@@
   * Monto de la nueva transferencia.
   * @type {number}
   */
  nuevoMonto: number = 0;

  /****
   * @@@@@
   * Tipo de concepto de la transferencia.
   * @type {string}
   */
  tipoConcepto: string = '';

  /****
   * @@@@@
   * ID del usuario.
   * @type {number}
   */
  usuarioId: number = 0;

  /****
   * @@@@@
   * Mensaje de éxito.
   * @type {string}
   */
  mensajeExito: string = '';

  /****
   * @@@@@
   * Mensaje de error.
   * @type {string}
   */
  mensajeError: string = '';

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
   * Realizar la transferencia de fondos.
   */
  realizarTransferencia(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

    /****
     * @@@@@
     * Validar el monto de la transferencia.
     */
    if (this.nuevoMonto <= 0) {
      this.mensajeError = 'El monto debe ser mayor que cero.';
      return;
    }

    /****
     * @@@@@
     * Validar la disponibilidad del ID del usuario.
     */
    if (!this.usuarioId) {
      this.mensajeError = 'El usuario ID no está disponible. Asegúrate de estar autenticado.';
      return;
    }

    const tiposGasto = ['Pago', 'Retiro', 'Gasto'];
    const monto = tiposGasto.includes(this.tipoConcepto) ? -this.nuevoMonto : this.nuevoMonto;

    this.transaccionesService.obtenerCorreoPorUsuarioId(this.usuarioId).subscribe({
      next: (response) => {
        const email = response.email;
        this.transaccionesService.obtenerClienteIdPorEmail(email).subscribe({
          next: (response) => {
            const clienteId = response.id;
            const nuevaTransferencia = {
              cliente_id: clienteId,
              usuario_id: this.usuarioId,
              monto: monto,
              concepto: this.tipoConcepto,
              tipo: this.tipoConcepto
            };
            this.transaccionesService.realizarTransferencia(nuevaTransferencia).subscribe({
              next: (response) => {
                this.mensajeExito = 'Transferencia realizada con éxito.';
                console.log('Transferencia realizada con éxito:', response);
              },
              error: (error) => {
                this.mensajeError = 'Error al realizar la transferencia.';
                console.error('Error al realizar la transferencia:', error);
              }
            });
          },
          error: (error) => {
            this.mensajeError = 'Error al obtener el clienteId.';
            console.error('Error al obtener el clienteId:', error);
          }
        });
      },
      error: (error) => {
        this.mensajeError = 'Error al obtener el email.';
        console.error('Error al obtener el email:', error);
      }
    });
  }
}


