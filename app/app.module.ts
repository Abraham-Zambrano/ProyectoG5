import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //  FormsModule y ReactiveFormsModule
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransaccionesComponent } from '../app/dashboard/components/transacciones/transacciones.component';
import { MenuComponent } from './menu/menu.component'; 
import { RealizarTransferenciaComponent } from '../app/dashboard/realizar-transferencia/realizar-transferencia.component';
import { HistorialTransaccionesComponent } from '../app/dashboard/historial-transacciones/historial-transacciones.component';
import { PerfilComponent } from './dashboard/Perfil/perfil.component';
//ARCHIVO AUTOMATICO, GENERADO POR ANGULAR CLI
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
    FormsModule, // Se importo FormsModule 
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }