import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('clienteId');
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/login']); // Usar el Router de Angular para navegar
  }
}
