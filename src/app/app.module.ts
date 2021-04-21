import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; 

import { HttpClientModule } from '@angular/common/http';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockTarjetasComponent } from './pages/stock-tarjetas/stock-tarjetas.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { RrhhEmpleadosTablaComponent } from './pages/rrhh-empleados-tabla/rrhh-empleados-tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { RrhhEditEmpleadosComponent } from './pages/rrhh-edit-empleados/rrhh-edit-empleados.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

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
    AboutUsComponent,
    StockTarjetasComponent,
    RrhhEmpleadosTablaComponent,
    RrhhEditEmpleadosComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, // register FullCalendar
    NgbModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts'),}),// gráficas
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
