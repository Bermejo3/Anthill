import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';
import{Empleados}from "../../models/empleados"

@Component({
  selector: 'app-rrhh-empleados',
  templateUrl: './rrhh-empleados.component.html',
  styleUrls: ['./rrhh-empleados.component.css']
})
export class RrhhEmpleadosComponent implements OnInit {

  empleado: Empleados = new Empleados(0,0,"","",0,"",0,"","","","")
  arrayEmpleados : Empleados[] = []
  mensaje: string = ""
  mostrar: boolean
  posicionTabla : number = 0
  showModal3:boolean
  
  public page: number = 1
  public itemsPerPage: number = 4

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.mostrar = false
  }


  getEmpleados(){
    this.apiService.getEmpleados(this.servicio.id_companies).subscribe(
      (data:Empleados[])=>
      {
        this.arrayEmpleados=data
        this.showModal3 = false
      }
    )
  }  

  cerrar() {
    this.mostrar = false
  }
  showPosicion(posicionTabla)  {
    this.posicionTabla = posicionTabla
  } 
  
  deleteEmpleado(){
    let id_employees=this.arrayEmpleados[this.posicionTabla].id_employees
    this.apiService.deleteEmpleado(id_employees).subscribe
    (
      (data:any) =>
      {
        this.mensaje =data.mensaje
        this.getEmpleados()
        this.mostrar = true
        this.hide()
      }
    )
    console.log(id_employees)  
  }
  hide(){ 
   
    this.showModal3=false
  }
  showSure(posicionTabla){
    this.showModal3 = true;
    this.posicionTabla = posicionTabla
  }
 
  ngOnInit(): void {
    this.getEmpleados()
  }
 
}
