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
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfilService } from '../../services/perfil.services';

/****
* @@@@@
* Componente para gestionar el perfil del usuario.
* @class
*/
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  /****
  * @@@@@
  * ID del cliente.
  * @type {number}
  */
  clienteId: number = 0;

  /****
  * @@@@@
  * Datos del usuario.
  * @type {Object}
  */
  datosUsuario: any = {};

  /****
  * @@@@@
  * Lista de contactos del usuario.
  * @type {Array}
  */
  contactos: any[] = [];

  /****
  * @@@@@
  * Mensaje de error.
  * @type {string}
  */
  mensajeError: string = ''; // Mensaje de error

  /****
  * @@@@@
  * Mensaje de éxito.
  * @type {string}
  */
  mensajeExito: string = ''; // Mensaje de éxito

  /****
  * @@@@@
  * Constructor del componente.
  * @param {PerfilService} perfilService - Servicio de perfil.
  */
  constructor(private perfilService: PerfilService) {}

  /****
  * @@@@@
  * Método ngOnInit para inicializar el componente.
  */
  ngOnInit(): void {
    this.clienteId = this.obtenerClienteId();
    if (this.clienteId === 0) {
      this.mensajeError = 'Cliente no encontrado. Asegúrate de haber iniciado sesión correctamente.';
    } else {
      this.cargarDatosUsuario();
      this.cargarContactos();
    }
  }

  /****
  * @@@@@
  * Obtiene el ID del cliente almacenado en localStorage.
  * @returns {number} - El ID del cliente.
  */
  obtenerClienteId(): number {
    const clienteId = localStorage.getItem('clienteId');
    return clienteId ? Number(clienteId) : 0;
  }

  /****
  * @@@@@
  * Carga los datos del usuario desde el servicio PerfilService.
  */
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

  /****
  * @@@@@
  * Carga los contactos del usuario desde el servicio PerfilService.
  */
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

  /****
  * @@@@@
  * Elimina un contacto usando el servicio PerfilService.
  * @param {number} contactoId - El ID del contacto a eliminar.
  */
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
