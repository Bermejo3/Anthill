import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-rrhh-add-empleados',
  templateUrl: './rrhh-add-empleados.component.html',
  styleUrls: ['./rrhh-add-empleados.component.css']
})
export class RrhhAddEmpleadosComponent implements OnInit {

  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }

  ngOnInit(): void {
  }

}
