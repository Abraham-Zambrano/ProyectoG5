/****
 * @@@@@
 * Importa los módulos necesarios para el módulo de enrutamiento.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';

/****
 * @@@@@
 * Define las rutas del módulo de enrutamiento del dashboard.
 * @constant {Routes}
 */
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard.component').then(m => m.DashboardComponent) 
  },
];

/****
 * @@@@@
 * Módulo de enrutamiento para el dashboard.
 * @module DashboardRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
