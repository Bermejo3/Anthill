import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';
import { TurnosEmpresaComponent } from './pages/turnos-empresa/turnos-empresa.component';
import { TurnosSemanaComponent } from './pages/turnos-semana/turnos-semana.component';
import { StockComponent } from './pages/stock/stock.component';
import { ProduccionComponent } from './pages/produccion/produccion.component';
import { ProduccionEmpleadoComponent } from './pages/produccion-empleado/produccion-empleado.component';
import { RrhhEmpleadosComponent } from './pages/rrhh-empleados/rrhh-empleados.component';
import { RrhhAddEmpleadosComponent } from './pages/rrhh-add-empleados/rrhh-add-empleados.component';
import { RrhhEmpresaComponent } from './pages/rrhh-empresa/rrhh-empresa.component';
import { EmpleadoTurnosComponent } from './pages/empleado-turnos/empleado-turnos.component';
import { EmpleadoVacacionesComponent } from './pages/empleado-vacaciones/empleado-vacaciones.component';
import { EmpleadoMiPerfilComponent } from './pages/empleado-mi-perfil/empleado-mi-perfil.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    VacacionesComponent,
    TurnosEmpresaComponent,
    TurnosSemanaComponent,
    StockComponent,
    ProduccionComponent,
    ProduccionEmpleadoComponent,
    RrhhEmpleadosComponent,
    RrhhAddEmpleadosComponent,
    RrhhEmpresaComponent,
    EmpleadoTurnosComponent,
    EmpleadoVacacionesComponent,
    EmpleadoMiPerfilComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
