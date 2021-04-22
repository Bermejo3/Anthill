import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';
import{Empleados}from "../../models/empleados"
import { Router } from '@angular/router';

@Component({
  selector: 'app-rrhh-empleados',
  templateUrl: './rrhh-empleados.component.html',
  styleUrls: ['./rrhh-empleados.component.css']
})
export class RrhhEmpleadosComponent implements OnInit {

  empleado: Empleados = new Empleados(0,0,"","",0,"",0,false,false,false,"","","","")
  arrayEmpleados : Empleados[] = []
  arrayEmpleadosBackUp : Empleados[] = []
  mensaje: string = ""
  mostrar: boolean
  posicionTabla : number = 0
  showModal3:boolean
  
  public page: number = 1
  public itemsPerPage: number = 4

  public searchText: string=""

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService,  private _router:Router ) {
    this.servicio.id_employees = Number(JSON.parse(sessionStorage.getItem("id_employees"))) || 1;  
    this.servicio.id_companies = Number(JSON.parse(sessionStorage.getItem("id_companies"))) || 1;
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.mostrar = false
  }


  getEmpleados(){

    this.apiService.getEmpleados(this.servicio.id_companies).subscribe(
      (data:Empleados[])=>
      {
        this.arrayEmpleados=data
        this.arrayEmpleadosBackUp=data
        this.servicio.arrayEmpleados=this.arrayEmpleados
        this.showModal3 = false
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
  
  deleteEmpleado(){
    console.log(this.servicio.id_employees);
    
    this.apiService.deleteEmpleado(this.servicio.id_employees).subscribe
    (
      (data:any) =>
      {
        this.mensaje =data.mensaje
        this.getEmpleados()
        this.mostrar = true
        this.hide()
      }
    )
    console.log(this.servicio.id_employees)  
  }
  editarEmpleado(id_employees:number)
  {
    this.servicio.id_employees = id_employees
    this._router.navigate(['rrhh-empleados/edit-empleados'])
  }

  hide(){ 
   
    this.showModal3=false
  }
  showSure(id_employees){
    this.showModal3 = true;
    this.servicio.id_employees=id_employees
    for (let i=0; i<this.arrayEmpleados.length; i++){ //Coger la posicion del array para mostrar los datos en el modal del update

      if (this.arrayEmpleados[i].id_employees == id_employees){

        this.posicionTabla=i

      }

    }
  }
 
  ngOnInit(): void {
    this.getEmpleados()
  }
 
  filter(){
    if (this.searchText==""){
      this.arrayEmpleados = this.arrayEmpleadosBackUp
    }
    else{
      this.arrayEmpleados = this.arrayEmpleadosBackUp.filter(newArray =>
        newArray.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
        newArray.email.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
        newArray.age == Number(this.searchText) ||
        newArray.position.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
        newArray.surname.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()),
        )
    }
  }

  filtroTurnos(selectBox: HTMLSelectElement){
    if (selectBox.value=="Turno"){
      this.arrayEmpleados = this.arrayEmpleadosBackUp
    }
    else if (selectBox.value=="Mañana"){
      this.arrayEmpleados = this.arrayEmpleadosBackUp.filter(newArray =>
        newArray.shiftMorning == true 
      )
    }
    else if (selectBox.value=="Tarde"){
      this.arrayEmpleados = this.arrayEmpleadosBackUp.filter(newArray =>
        newArray.shiftAfternoon == true 
      )
    }
    else if (selectBox.value=="Noche"){
      this.arrayEmpleados = this.arrayEmpleadosBackUp.filter(newArray =>
        newArray.shiftEvening == true 
      )
    }
  }

}
