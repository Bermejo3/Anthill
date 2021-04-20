import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';
import{Empresa} from"../../models/empresa"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  empresa:Empresa= new Empresa(0,"","","",0,"","")
  mensaje:string = ""
  public formularioRegister:FormGroup
  public prueba1:any

  constructor(public servicio: ServiciosService,public apiService: ApiserviceService,private formBuilder:FormBuilder) {

    
    this.servicio.estaLogueado = false //Para poder mostrar el sidebar y el header
    this.buildForm()
   }


   public buildForm()
   {
     const minPass = 8

     

     this.formularioRegister = this.formBuilder.group({
       nombre:["" , Validators.required],
       direccion:["" , Validators.required],
       email:["" , [Validators.required, Validators.email]],
       telefono:["" , Validators.required],
       contrasena: [ "", [Validators.required, Validators.minLength(minPass)]],
       confContrasena:[ "", Validators.required]
      },
      {
        validator: this.MustMatch('contrasena', 'confContrasena')
    })
    console.log(this.formularioRegister.valid)
   }

   MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  get f() { return this.formularioRegister.controls; }

  

  addEmpresa(name:string,address:string,email:string,phone:number,password:string,confPass:string){
    this.formularioRegister.value
    this.apiService.addEmpresa(new Empresa(0,name,address,email,phone,password,confPass)).subscribe(
      (data:any)=>
      {
        this.formularioRegister.value;
        console.log(address)
      }
    )
  }

  add(){
    this.apiService.addEmpresa(new Empresa(0,this.formularioRegister.get('nombre').value,this.formularioRegister.get('direccion').value,this.formularioRegister.get('email').value,this.formularioRegister.get('telefono').value,this.formularioRegister.get('contrasena').value)).subscribe(
      (data:any)=>
      {
        console.log(data)
      }
    )
  }


  ngOnInit(): void {
  }

}

// addStock(name:string,type:string,quantity:number,unit:string,date:string,place:string, minQuantity:number,picture:string){

//   this.apiService.addStock(new Stock(0,this.servicio.id_companies,name ,type,quantity,unit,date,place,minQuantity,picture)).subscribe(
//     (data:any)=>
//     {      
//       this.mensaje =data.mensaje
//       this.getStock()
//       this.hide()      
//     }
//   )
// }
