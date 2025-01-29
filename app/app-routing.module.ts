/*
 * GENERADO POR ANGULAR CLI
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransaccionesComponent } from './dashboard/components/transacciones/transacciones.component';
import { LoginComponent } from './login/login.component';
import { RealizarTransferenciaComponent } from './dashboard/realizar-transferencia/realizar-transferencia.component';
import { HistorialTransaccionesComponent } from './dashboard/historial-transacciones/historial-transacciones.component';
import { PerfilComponent } from '../app/dashboard/Perfil/perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'realizar-transferencia', component: RealizarTransferenciaComponent },
  { path: 'historial-transacciones', component: HistorialTransaccionesComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
