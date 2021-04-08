import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/shared/servicios.service';

@Component({
  selector: 'app-empleado-mi-perfil',
  templateUrl: './empleado-mi-perfil.component.html',
  styleUrls: ['./empleado-mi-perfil.component.css']
})
export class EmpleadoMiPerfilComponent implements OnInit {

  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.servicio.esEmpleado=true //Para iniciar el sidebar de empleado
  }

  ngOnInit(): void {
  }

}
