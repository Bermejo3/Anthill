import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';
import{Empleados}from "../../models/empleados"
@Component({
  selector: 'app-rrhh-empleados-tabla',
  templateUrl: './rrhh-empleados-tabla.component.html',
  styleUrls: ['./rrhh-empleados-tabla.component.css']
})
export class RrhhEmpleadosTablaComponent implements OnInit{

  empleado: Empleados = new Empleados(0,0,"","",0,"",0,false,false,false,"","","","")
  arrayEmpleados : Empleados[] = []
  mensaje: string = ""
  mostrar: boolean
  posicionTabla : number = 0
  showModal: boolean
  showModal2:boolean

  public page: number = 1
  public itemsPerPage: number = 10

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.mostrar = false
  }
  getEmpleados(){

    this.apiService.getEmpleados(this.servicio.id_companies).subscribe(
      (data:Empleados[])=>
      {
        this.arrayEmpleados=data
        this.servicio.arrayEmpleados=this.arrayEmpleados
        console.log(this.arrayEmpleados);

      }
    )
  }  


  cerrar() {
    this.mostrar = false
  }
  showPosicion(posicionTabla)  {
    this.posicionTabla = posicionTabla
  } 
  show(posicionTabla){
    this.showModal = true;   
    this.posicionTabla = posicionTabla
  } 
  show2(posicionTabla)  {
    this.showModal2 = true;
    this.posicionTabla = posicionTabla
  } 
  
  deleteEmpleado(){
    let id_employees = this.arrayEmpleados[this.posicionTabla].id_employees
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
    this.showModal = false;
    this.showModal2=false
  }

  ngOnInit(): void {
    this.getEmpleados()
  }
 
}
