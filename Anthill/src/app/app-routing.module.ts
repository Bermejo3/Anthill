import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { EmpleadoMiPerfilComponent } from './pages/empleado-mi-perfil/empleado-mi-perfil.component';
import { EmpleadoTurnosComponent } from './pages/empleado-turnos/empleado-turnos.component';
import { EmpleadoVacacionesComponent } from './pages/empleado-vacaciones/empleado-vacaciones.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProduccionEmpleadoComponent } from './pages/produccion-empleado/produccion-empleado.component';
import { ProduccionComponent } from './pages/produccion/produccion.component';
import { RegisterComponent } from './pages/register/register.component';
import { RrhhAddEmpleadosComponent } from './pages/rrhh-add-empleados/rrhh-add-empleados.component';
import { RrhhEmpleadosTablaComponent } from './pages/rrhh-empleados-tabla/rrhh-empleados-tabla.component';
import { RrhhEmpleadosComponent } from './pages/rrhh-empleados/rrhh-empleados.component';
import { RrhhEmpresaComponent } from './pages/rrhh-empresa/rrhh-empresa.component';
import { StockTarjetasComponent } from './pages/stock-tarjetas/stock-tarjetas.component';
import { StockComponent } from './pages/stock/stock.component';
import { TurnosEmpresaComponent } from './pages/turnos-empresa/turnos-empresa.component';
import { TurnosSemanaComponent } from './pages/turnos-semana/turnos-semana.component';
import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"about-us", component:AboutUsComponent},
  {path:"home", component:HomeComponent},
  {path:"turnos-empresa", component:TurnosEmpresaComponent},
  {path:"turnos-semana", component:TurnosSemanaComponent},
  {path:"vacaciones", component:VacacionesComponent},
  {path:"stock",component:StockComponent},
  {path:"stock-tarjetas", component:StockTarjetasComponent},
  {path:"empleado-mi-perfil", component:EmpleadoMiPerfilComponent},
  {path:"empleado-turnos", component:EmpleadoTurnosComponent},
  {path:"empleado-vacaciones", component:EmpleadoVacacionesComponent},
  {path:"produccion", component:ProduccionComponent},
  {path:"produccion-empleado", component:ProduccionEmpleadoComponent},
  {path:"rrhh-add-empleados", component:RrhhAddEmpleadosComponent},
  {path:"rrhh-empleados", component:RrhhEmpleadosComponent},
  {path:"rrhh-empresa", component:RrhhEmpresaComponent},
  {path:"rrhh-empleados-tabla", component:RrhhEmpleadosTablaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
