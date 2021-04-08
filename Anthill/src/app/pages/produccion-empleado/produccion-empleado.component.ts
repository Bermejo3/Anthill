import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/shared/servicios.service';

@Component({
  selector: 'app-produccion-empleado',
  templateUrl: './produccion-empleado.component.html',
  styleUrls: ['./produccion-empleado.component.css']
})
export class ProduccionEmpleadoComponent implements OnInit {

  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }

  ngOnInit(): void {
  }

}
