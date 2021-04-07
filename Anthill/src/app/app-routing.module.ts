import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RrhhAddEmpleadosComponent } from './pages/rrhh-add-empleados/rrhh-add-empleados.component';
import { RrhhEmpleadosComponent } from './pages/rrhh-empleados/rrhh-empleados.component';
import { StockTarjetasComponent } from './pages/stock-tarjetas/stock-tarjetas.component';
import { StockComponent } from './pages/stock/stock.component';
import { TurnosEmpresaComponent } from './pages/turnos-empresa/turnos-empresa.component';
import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';

const routes: Routes = [

  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"about", component:AboutUsComponent},
  {path:"home", component:HomeComponent},
  {path:"turnos-empresa", component:TurnosEmpresaComponent},
  {path:"vacaciones", component:VacacionesComponent},
  {path:"stock",component:StockComponent},
  {path:"stock-tarjetas", component:StockTarjetasComponent},
  {path:"rrhh-empleados", component:RrhhEmpleadosComponent},
  {path:"rrhh-add-empleados", component: RrhhAddEmpleadosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
