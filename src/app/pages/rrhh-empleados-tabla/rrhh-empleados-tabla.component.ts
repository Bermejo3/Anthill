import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/shared/servicios.service';
@Component({
  selector: 'app-rrhh-empleados-tabla',
  templateUrl: './rrhh-empleados-tabla.component.html',
  styleUrls: ['./rrhh-empleados-tabla.component.css']
})
export class RrhhEmpleadosTablaComponent implements OnInit {

  constructor(public servicio:ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
   }

  ngOnInit(): void {
  }

}
