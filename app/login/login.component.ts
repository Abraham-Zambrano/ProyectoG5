/*
 * Autor: ZAMBRANO VALVERDE LUIS ABRAHAM
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], //importar CommonModule y FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Definir errorMessage

  constructor(private authService: AuthService, private router: Router) {}

  // Función para manejar el inicio de sesión
  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuarioId', response.user.id);
        localStorage.setItem('nombreUsuario', response.user.email);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        this.errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
      }
    );
  }
}
