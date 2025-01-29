/*
 * Autor: Zambrano Valverde Luis Abraham 
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { TransaccionesService } from '../services/transacciones.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule], // el menucomponente es standalone:true no es necesario importar.
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  nombreUsuario: string = 'Usuario';
  saldoActual: number = 0;
  ingresos: number = 0;
  gastos: number = 0;
  chart: any;

  constructor(private transaccionesService: TransaccionesService) {
    Chart.register(...registerables); // Registrar escalas y otros componentes de Chart.js
  }

  ngOnInit(): void {
    const usuarioId = this.obtenerUsuarioId();
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';
    this.obtenerResumenCuenta(usuarioId);
  }

  obtenerUsuarioId(): number {
    const usuarioId = localStorage.getItem('usuarioId');
    return usuarioId ? Number(usuarioId) : 0;
  }

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