import { Component, OnInit } from '@angular/core';
import { Empleados } from 'src/app/models/empleados';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-rrhh-add-empleados',
  templateUrl: './rrhh-add-empleados.component.html',
  styleUrls: ['./rrhh-add-empleados.component.css']
})
export class RrhhAddEmpleadosComponent implements OnInit {

  mensaje: string = ""
  mostrar: boolean

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }

  // addEmpleado(name:string,surname:string,age:number,position:string,phone:number,email:string,password:string,description,picture:string){
  //   this.apiService.addEmpleado(new Empleados(0,this.servicio.id_companies,name,surname,age,position,phone,email,password,description,picture)).subscribe(
  //     (data:any)=>
  //     {
  //       this.mensaje=data.mensaje
  //     }
  //   )
  // }
  // updateEmpleado(name:string,surname:string,age:number,position:string,phone:number,email:string,password:string,description,picture:string){
  //   this.apiService.updateEmpleado(new Empleados(0,this.servicio.id_companies,name,surname,age,position,phone,email,password,description,picture)).subscribe(
  //     (data:any)=>
  //     {
  //       this.mensaje=data.mensaje
  //     }
  //   )
  // }


  ngOnInit(): void {
  }

}
