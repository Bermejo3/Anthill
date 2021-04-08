import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/shared/servicios.service';

@Component({
  selector: 'app-empleado-turnos',
  templateUrl: './empleado-turnos.component.html',
  styleUrls: ['./empleado-turnos.component.css']
})
export class EmpleadoTurnosComponent implements OnInit {

  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.servicio.esEmpleado=true //Para iniciar el sidebar de empleado
  }

  ngOnInit(): void {
  }

}
