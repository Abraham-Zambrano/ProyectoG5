//Zambrano Luis
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule // Asegúrate de incluir FormsModule aquí
  ]
})
export class LoginModule {}
