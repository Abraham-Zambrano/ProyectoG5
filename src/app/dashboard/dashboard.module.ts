/****
 * @@@@@
 * Importa los módulos necesarios para el módulo de enrutamiento.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from '../menu/menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

/****
 * @@@@@
 * Módulo para el dashboard de la aplicación.
 * @module DashboardModule
 */
@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule, // Importa el módulo de enrutamiento
  ],
})
export class DashboardModule {}
