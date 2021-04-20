import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Empleados } from 'src/app/models/empleados';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';
import { Router } from '@angular/router';

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
  public empleadoInd: Empleados =new Empleados(0,0,"","" , 0,"", 0,false,false,false, "", "", "", "")
  checkbox:boolean=false

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService, public _router:Router) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }

  getEmpleado(){
    this.apiService.getEmpleadoInd(this.servicio.id_employees).subscribe(
      (data:Empleados[])=>
      {
        this.empleadoInd = data[0]
      }
    )
  }  

  updateEmpleado(name:string,surname:string,age:number,position:string,phone:number,shiftMorning:boolean,shiftAfternoon:boolean,shiftEvening:boolean,email:string,password:string,description:string,picture:string){
    console.log(name);
    
    let empleado = new Empleados(this.servicio.id_employees,this.servicio.id_companies,name,surname,age,position,phone,shiftMorning,shiftAfternoon,shiftEvening,email,password,description,picture)
    console.log(empleado);
    
    this.apiService.updateEmpleado(empleado).subscribe(
      (data:any)=>
      {
        this.mensaje=data.mensaje
        this._router.navigate(['rrhh-empleados'])
      }
    )
  }

  checkBox(){
    this.checkbox=true
  }

  editEmpleado(id_employees:number)
  {
   console.log(id_employees);
   
  }
  
  ngOnInit(): void {
    this.arrayEmpleados = this.servicio.arrayEmpleados
    console.log(this.arrayEmpleados);
    this.getEmpleado()
  }

}

