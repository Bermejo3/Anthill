import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-rrhh-empleados',
  templateUrl: './rrhh-empleados.component.html',
  styleUrls: ['./rrhh-empleados.component.css']
})
export class RrhhEmpleadosComponent implements OnInit {

  showModal: boolean

  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.showModal=false
  }

  ngOnInit(): void {
  }
  show(){
    this.showModal = true;
  }  
  hide(){ 
    this.showModal = false;
  }
}
