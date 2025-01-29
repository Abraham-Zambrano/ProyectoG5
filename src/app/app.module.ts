/****
 * @@@@@
 * GENERADO POR ANGULAR CLI
 */

/****
 * @@@@@
 * Importa los módulos necesarios para el módulo principal de la aplicación.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule y ReactiveFormsModule
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransaccionesComponent } from '../app/dashboard/components/transacciones/transacciones.component';
import { MenuComponent } from './menu/menu.component'; 
import { RealizarTransferenciaComponent } from '../app/dashboard/realizar-transferencia/realizar-transferencia.component';
import { HistorialTransaccionesComponent } from '../app/dashboard/historial-transacciones/historial-transacciones.component';
import { PerfilComponent } from './dashboard/Perfil/perfil.component';

/****
 * @@@@@
 * Módulo principal de la aplicación.
 * @module AppModule
 */
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TransaccionesComponent,
    MenuComponent,
    RealizarTransferenciaComponent,
    HistorialTransaccionesComponent,
    PerfilComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Se importa FormsModule
    ReactiveFormsModule // Se importa ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
