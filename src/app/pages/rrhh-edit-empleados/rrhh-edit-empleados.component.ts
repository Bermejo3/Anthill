import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Empleados } from 'src/app/models/empleados';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-rrhh-edit-empleados',
  templateUrl: './rrhh-edit-empleados.component.html',
  styleUrls: ['./rrhh-edit-empleados.component.css']
})
export class RrhhEditEmpleadosComponent implements OnInit {

  mensaje: string = ""
  mostrar: boolean
  empleado:Empleados = new Empleados(0,0,"","" , 0,"", 0,false,false,false, "", "", "", "")
  arrayEmpleados = this.servicio.arrayEmpleados
  posicionTabla : number = 0
  public myForm:FormGroup
  checkbox:boolean=false

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }

  updateEmpleado(name:string,surname:string,age:number,position:string,phone:number,shiftMorning:boolean,shiftAfternoon:boolean,shiftEvening:boolean,email:string,password:string,description){
    console.log(name);
    let id_employees =this.arrayEmpleados[this.posicionTabla].id_employees
    this.myForm.value
    this.apiService.updateEmpleado(new Empleados(id_employees,this.servicio.id_companies,name,surname,age,position,phone,shiftMorning,shiftAfternoon,shiftEvening,email,password,description)).subscribe(
      (data:any)=>
      {
        this.myForm.value
        this.mensaje=data.mensaje
      }
    )
  }

  checkBox(){
    this.checkbox=true
  }
  
  ngOnInit(): void {
    this.arrayEmpleados = this.servicio.arrayEmpleados
    console.log(this.arrayEmpleados);
    
  }

}

