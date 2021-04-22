import { Component, OnInit } from '@angular/core';
import { Empleados } from 'src/app/models/empleados';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  public formularioAddEmpleado: FormGroup

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService, public _router:Router, private formBuilder:FormBuilder) {
    this.servicio.id_employees = Number(JSON.parse(sessionStorage.getItem("id_employees"))) || 1;  
    this.servicio.id_companies = Number(JSON.parse(sessionStorage.getItem("id_companies"))) || 1;
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.buildForm()

  }

  public buildForm()
   {
     this.formularioAddEmpleado = this.formBuilder.group({
       nombre: [, Validators.required],
       apellido:[ , Validators.required],
       edad:[ , Validators.required],
       posicion:[ , Validators.required],
       telefono:[ , Validators.required],
       turnoM: [, ],
       turnoT:[, ],
       turnoN:[, ],
       email:[, Validators.required],
       contrasena:[, Validators.required],
       foto:[, ],
       descripcion:[, Validators.maxLength(200)],
      })
   }

   addEmpleadoForm(){
    let empleado = new Empleados(0,this.servicio.id_companies,this.formularioAddEmpleado.get('nombre').value,this.formularioAddEmpleado.get('apellido').value,this.formularioAddEmpleado.get('edad').value,this.formularioAddEmpleado.get('posicion').value,this.formularioAddEmpleado.get('telefono').value,this.formularioAddEmpleado.get('turnoM').value,this.formularioAddEmpleado.get('turnoT').value,this.formularioAddEmpleado.get('turnoN').value,this.formularioAddEmpleado.get('email').value,this.formularioAddEmpleado.get('contrasena').value,this.formularioAddEmpleado.get('descripcion').value,this.formularioAddEmpleado.get('foto').value)
    
    this.apiService.addEmpleado(empleado).subscribe(
      (data:any)=>
      {
        this.mensaje=data.mensaje
        this._router.navigate(['rrhh-empleados'])
      }
    )
  }

  
  getEmpleados(){
    this.apiService.getEmpleados(this.servicio.id_companies).subscribe(
      (data:Empleados[])=>
      {
        this.arrayEmpleados=data
      }
    )
  }  

  addEmpleado(name:string,surname:string,age:number,position:string,phone:number,shiftMorning:boolean,shiftAfternoon:boolean,shiftEvening:boolean,email:string,password:string,description:string,picture:string, ){
    console.log(name);
    // this.myForm.value

    let empleado = new Empleados(0,this.servicio.id_companies,name,surname,age,position,phone,shiftMorning,shiftAfternoon,shiftEvening,email,password,description,picture)
    console.log(empleado);
    
    this.apiService.addEmpleado(empleado).subscribe(
      (data:any)=>
      {
        // this.myForm.value
        this.mensaje=data.mensaje

        this._router.navigate(['rrhh-empleados'])
      }
    )
  }

  checkBox(){
    this.checkbox=true
  }
  
  ngOnInit(): void {
  }

}
