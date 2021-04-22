import { Component, OnInit } from '@angular/core';
import { Empleados } from 'src/app/models/empleados';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  public empleadoInd: Empleados =new Empleados(0,0,"","" , 0,"", 0,false,false,false, "", "", "", "")
  checkbox:boolean=false

  public formularioEditEmpleado: FormGroup

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService, public _router:Router, private formBuilder:FormBuilder) {
    this.servicio.id_employees = Number(JSON.parse(sessionStorage.getItem("id_employees"))) || 1;  
    this.servicio.id_companies = Number(JSON.parse(sessionStorage.getItem("id_companies"))) || 1;
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.buildForm()
  }

  public buildForm()
   {
     this.formularioEditEmpleado = this.formBuilder.group({
       nombre: [this.empleadoInd.name, Validators.required],
       apellido:[this.empleadoInd.surname , Validators.required],
       edad:[this.empleadoInd.age , Validators.required],
       posicion:[this.empleadoInd.position , Validators.required],
       telefono:[this.empleadoInd.phone , Validators.required],
       turnoM: [this.empleadoInd.shiftMorning, ],
       turnoT:[this.empleadoInd.shiftAfternoon, ],
       turnoN:[ this.empleadoInd.shiftEvening, ],
       email:[this.empleadoInd.email, Validators.required],
       contrasena:[ this.empleadoInd.password, Validators.required],
       foto:[ this.empleadoInd.picture, ],
       descripcion:[ this.empleadoInd.description, Validators.maxLength(200)],
      })
   }

   updateEmpleadoForm(){   
    let empleado = new Empleados(this.servicio.id_employees,this.servicio.id_companies,this.formularioEditEmpleado.get('nombre').value,this.formularioEditEmpleado.get('apellido').value,this.formularioEditEmpleado.get('edad').value,this.formularioEditEmpleado.get('posicion').value,this.formularioEditEmpleado.get('telefono').value,this.formularioEditEmpleado.get('turnoM').value,this.formularioEditEmpleado.get('turnoT').value,this.formularioEditEmpleado.get('turnoN').value,this.formularioEditEmpleado.get('email').value,this.formularioEditEmpleado.get('contrasena').value,this.formularioEditEmpleado.get('descripcion').value,this.formularioEditEmpleado.get('foto').value)
    console.log(empleado);
    
    this.apiService.updateEmpleado(empleado).subscribe(
      (data:any)=>
      {
        this.mensaje=data.mensaje
        this._router.navigate(['rrhh-empleados'])
      }
    )
  }


  getEmpleado(){
    this.apiService.getEmpleadoInd(this.servicio.id_employees).subscribe(
      (data:Empleados[])=>
      {
        this.empleadoInd = data[0]
        this.buildForm()
      }
    )
  }  

  // updateEmpleado(name:string,surname:string,age:number,position:string,phone:number,shiftMorning:boolean,shiftAfternoon:boolean,shiftEvening:boolean,email:string,password:string,description:string,picture:string){
  //   console.log(name);
    
  //   let empleado = new Empleados(this.servicio.id_employees,this.servicio.id_companies,name,surname,age,position,phone,shiftMorning,shiftAfternoon,shiftEvening,email,password,description,picture)
  //   console.log(empleado);
    
  //   this.apiService.updateEmpleado(empleado).subscribe(
  //     (data:any)=>
  //     {
  //       this.mensaje=data.mensaje
  //       this._router.navigate(['rrhh-empleados'])
  //     }
  //   )
  // }

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

