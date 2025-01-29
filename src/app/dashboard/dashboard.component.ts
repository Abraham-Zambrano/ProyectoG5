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
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { TransaccionesService } from '../services/transacciones.service';

/****
 * @@@@@
 * Componente para el panel de control del usuario.
 * @class
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule], // el menucomponente es standalone:true no es necesario importar.
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  /****
   * @@@@@
   * Nombre del usuario.
   * @type {string}
   */
  nombreUsuario: string = 'Usuario';

  /****
   * @@@@@
   * Saldo actual del usuario.
   * @type {number}
   */
  saldoActual: number = 0;

  /****
   * @@@@@
   * Ingresos del usuario.
   * @type {number}
   */
  ingresos: number = 0;

  /****
   * @@@@@
   * Gastos del usuario.
   * @type {number}
   */
  gastos: number = 0;

  /****
   * @@@@@
   * Gráfico de resumen de cuenta.
   * @type {any}
   */
  chart: any;

  /****
   * @@@@@
   * Constructor del componente.
   * @param {TransaccionesService} transaccionesService - Servicio de transacciones.
   */
  constructor(private transaccionesService: TransaccionesService) {
    Chart.register(...registerables); // Registrar escalas y otros componentes de Chart.js
  }

  /****
   * @@@@@
   * Método ngOnInit para inicializar el componente.
   */
  ngOnInit(): void {
    const usuarioId = this.obtenerUsuarioId();
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';
    this.obtenerResumenCuenta(usuarioId);
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
   * Obtener el resumen de la cuenta del usuario por ID usuario.
   * @param {number} usuarioId - El ID del usuario.
   */
  obtenerResumenCuenta(usuarioId: number): void {
    this.transaccionesService.obtenerResumenCuenta(usuarioId).subscribe(
      (resumen) => {
        console.log('Resumen de la cuenta:', resumen); // Agregar logs para depuración
        this.saldoActual = resumen.saldo;
        this.ingresos = resumen.ingresos;
        this.gastos = resumen.gastos;
        this.crearGrafica();
      },
      (error) => {
        console.error('Error al obtener el resumen de la cuenta:', error);
      }
    );
  }

  /****
   * @@@@@
   * Crear un gráfico con el resumen de la cuenta.
   */
  crearGrafica(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Saldo', 'Ingresos', 'Gastos'],
        datasets: [{
          label: 'Resumen',
          data: [this.saldoActual, this.ingresos, this.gastos],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
