import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component'; // Importar el MenuComponent
import { RouterModule, Router } from '@angular/router'; // Asegurarse de importar RouterModule y Router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterModule], // Incluir MenuComponent y RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router) {}
//Mostrar menucomponent
  mostrarMenu(): boolean {
    return this.router.url !== '/login';
  }
}
