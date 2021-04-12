import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-rrhh-empresa',
  templateUrl: './rrhh-empresa.component.html',
  styleUrls: ['./rrhh-empresa.component.css']
})
export class RrhhEmpresaComponent implements OnInit {

  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }

  ngOnInit(): void {
  }

}
