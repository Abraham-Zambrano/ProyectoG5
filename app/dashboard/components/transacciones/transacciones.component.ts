/*
 * Zambrano Valverde Luis Abraham
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransaccionesService } from '../../../services/transacciones.service';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de importar CommonModule y FormsModule
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css'],
})
export class TransaccionesComponent implements OnInit {
  transacciones: any[] = [];
  saldoActual: number = 0;
  ingresos: number = 0;
  gastos: number = 0;
  nuevoMonto: number = 0;
  nuevoConcepto: string = '';
  usuarioId: number = 0;
  filtros = {
    fechaInicio: '',
    fechaFin: '',
    concepto: ''
  };

  constructor(private transaccionesService: TransaccionesService) {}

  ngOnInit(): void {
    this.usuarioId = this.obtenerUsuarioId();
    this.obtenerResumenCuenta(this.usuarioId);
    this.obtenerHistorialTransacciones(this.usuarioId);
  }
  // Obtener el ID del usuario almacenado en localStorage
  obtenerUsuarioId(): number {
    const usuarioId = localStorage.getItem('usuarioId');
    return usuarioId ? Number(usuarioId) : 0;
  }
  // Obtenie el resumen de la cuenta del usuario por id usuario
  obtenerResumenCuenta(usuarioId: number): void {
    this.transaccionesService.obtenerResumenCuenta(usuarioId).subscribe(
      (resumen) => {
        this.saldoActual = resumen.saldo;
        this.ingresos = resumen.ingresos;
        this.gastos = resumen.gastos;
      },
      (error) => {
        console.error('Error al obtener el resumen de la cuenta:', error);
      }
    );
  }
  // Obtiene el historial de transacciones del usuario
  obtenerHistorialTransacciones(usuarioId: number): void {
    this.transaccionesService.obtenerHistorialTransacciones(usuarioId).subscribe(
      (transacciones) => {
        this.transacciones = transacciones;
      },
      (error) => {
        console.error('Error al obtener el historial de transacciones:', error);
      }
    );
  }

  realizarTransferencia(): void {
    const tiposGasto = ['Pago', 'Retiro', 'Gasto'];
    const monto = tiposGasto.includes(this.nuevoConcepto) ? -this.nuevoMonto : this.nuevoMonto;

    const nuevaTransferencia = {
      usuario_id: this.usuarioId,
      monto: monto,
      concepto: this.nuevoConcepto,
      tipo: this.nuevoConcepto
    };

    this.transaccionesService.realizarTransferencia(nuevaTransferencia).subscribe(
      (response) => {
        console.log('Transferencia realizada:', response);
        this.obtenerHistorialTransacciones(this.usuarioId);
        this.nuevoMonto = 0;
        this.nuevoConcepto = '';
      },
      (error) => {
        console.error('Error al realizar la transferencia:', error);
      }
    );
  }
  // Aplicar filtros a las transacciones
  aplicarFiltros(): void {
    console.log('Aplicando filtros...');
    this.transaccionesService.obtenerTransaccionesConFiltros(this.usuarioId, this.filtros).subscribe(
      (transacciones) => {
        console.log('Transacciones filtradas recibidas:', transacciones);
        this.transacciones = transacciones;
      },
      (error) => {
        console.error('Error al aplicar los filtros de búsqueda:', error);
        this.transacciones = []; // Limpia las transacciones si hay un error
      }
    );
  }
}
