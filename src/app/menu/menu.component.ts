/****
 * @@@@@
 * Importa los módulos necesarios para el componente.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

/****
 * @@@@@
 * Componente para manejar el menú de navegación.
 * @class
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  /****
   * @@@@@
   * Constructor del componente.
   * @param {Router} router - Servicio de enrutamiento de Angular.
   */
  constructor(private router: Router) {}

  /****
   * @@@@@
   * Función para manejar el cierre de sesión.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('clienteId');
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/login']); // Usar el Router de Angular para navegar
  }
}
