/*
*   Autor:Zambrano Valverde Luis Abraham
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfilService } from '../../services/perfil.services';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  clienteId: number = 0;
  datosUsuario: any = {};
  contactos: any[] = [];
  mensajeError: string = ''; // Mensaje de error
  mensajeExito: string = ''; // Mensaje de éxito

  constructor(private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.clienteId = this.obtenerClienteId();
    if (this.clienteId === 0) {
      this.mensajeError = 'Cliente no encontrado. Asegúrate de haber iniciado sesión correctamente.';
    } else {
      this.cargarDatosUsuario();
      this.cargarContactos();
    }
  }
  //Obtiene el ID por medio de localStorage
  obtenerClienteId(): number {
    const clienteId = localStorage.getItem('clienteId');
    return clienteId ? Number(clienteId) : 0;
  }
  // Carga los datos del usuario desde el servicio PerfilService
  cargarDatosUsuario(): void {
    this.perfilService.obtenerDatosUsuario(this.clienteId).subscribe({
      next: (data) => {
        this.datosUsuario = data;
      },
      error: (error) => {
        this.mensajeError = 'Error al cargar los datos del usuario.';
      }
    });
  }
  // Cargar Contactos desde el servicio PerfilService
  cargarContactos(): void {
    this.perfilService.obtenerContactos(this.clienteId).subscribe({
      next: (data) => {
        this.contactos = data;
      },
      error: (error) => {
        this.mensajeError = 'Error al cargar los contactos.';
      }
    });
  }
//Eliminacion por medio de PerfilService.ts
  eliminarContacto(contactoId: number): void {
    this.perfilService.eliminarContacto(contactoId).subscribe({
      next: () => {
        this.contactos = this.contactos.filter(contacto => contacto.id !== contactoId);
        this.mensajeExito = 'Contacto eliminado correctamente.';
      },
      error: (error) => {
        this.mensajeError = 'Error al eliminar el contacto.';
      }
    });
  }
}
