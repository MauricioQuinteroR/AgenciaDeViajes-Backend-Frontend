import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ControlContactosComponent } from './components/control-contactos/control-contactos.component';
import { ControlHabitacionesComponent } from './components/control-habitaciones/control-habitaciones.component';
import { ControlHuespedesComponent } from './components/control-huespedes/control-huespedes.component';
import { ControlReservasComponent } from './components/control-reservas/control-reservas.component';
import { ControlUsuariosComponent } from './components/control-usuarios/control-usuarios.component';
import { ControlHotelesComponent } from './components/control-hoteles/control-hoteles.component';

const routes: Routes = [
  { path: '', component: UserDashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: 'control-contactos', component: ControlContactosComponent },
      { path: 'control-hoteles', component: ControlHotelesComponent },
      { path: 'control-habitaciones', component: ControlHabitacionesComponent },
      { path: 'control-huespedes', component: ControlHuespedesComponent },
      { path: 'control-reservas', component: ControlReservasComponent },
      { path: 'control-usuarios', component: ControlUsuariosComponent },
      { path: '', component: ControlHotelesComponent},
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
