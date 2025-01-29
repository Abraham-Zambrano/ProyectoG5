/****
 * @@@@@
 * Importa los módulos necesarios para el componente principal de la aplicación.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component'; // Importar el MenuComponent
import { RouterModule, Router } from '@angular/router'; // Asegurarse de importar RouterModule y Router

/****
 * @@@@@
 * Componente principal de la aplicación.
 * @class
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterModule], // Incluir MenuComponent y RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /****
   * @@@@@
   * Título de la aplicación.
   * @type {string}
   */
  title = 'frontend';

  /****
   * @@@@@
   * Constructor del componente principal.
   * @param {Router} router - Servicio de enrutamiento de Angular.
   */
  constructor(private router: Router) {}

  /****
   * @@@@@
   * Función para mostrar el componente de menú.
   * @returns {boolean} - Retorna true si la URL actual no es '/login', de lo contrario false.
   */
  mostrarMenu(): boolean {
    return this.router.url !== '/login';
  }
}
