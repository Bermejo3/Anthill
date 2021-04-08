import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/shared/servicios.service';

@Component({
  selector: 'app-turnos-semana',
  templateUrl: './turnos-semana.component.html',
  styleUrls: ['./turnos-semana.component.css']
})
export class TurnosSemanaComponent implements OnInit {

  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }

  ngOnInit(): void {
  }

}
