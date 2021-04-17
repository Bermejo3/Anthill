import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  empleado:Empleados = new Empleados(0,0,"","" , 0,"", 0, false,false,false,"", "", "", "",)
  arrayEmpleados : Empleados[]=[]
  posicionTabla : number = 0
  public myForm:FormGroup
  checkbox:boolean=false

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }

  
  getEmpleados(){
    this.apiService.getEmpleados(this.servicio.id_companies).subscribe(
      (data:Empleados[])=>
      {
        this.arrayEmpleados=data
      }
    )
  }  

  addEmpleado(name:string,surname:string,age:number,position:string,phone:number,shiftMorning:boolean,shiftAfternoon:boolean,shiftEvening:boolean,email:string,password:string,description){
    console.log(name);
    // this.myForm.value

    let empleado = new Empleados(0,this.servicio.id_companies,name,surname,age,position,phone,shiftMorning,shiftAfternoon,shiftEvening,email,password,description)
    console.log(empleado);
    
    this.apiService.addEmpleado(empleado).subscribe(
      (data:any)=>
      {
        // this.myForm.value
        this.mensaje=data.mensaje
      }
    )
  }

  checkBox(){
    this.checkbox=true
  }
  
  ngOnInit(): void {
  }

}
