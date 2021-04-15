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
  public myForm:FormGroup
  public prueba1:any

  constructor(public servicio: ServiciosService,public apiService: ApiserviceService,private formBuilder:FormBuilder) {

    
    this.servicio.estaLogueado = false //Para poder mostrar el sidebar y el header
    this.buildForm()
   }


   public buildForm()
   {
     const minPass = 8
     const maxPass = 12

     this.myForm = this.formBuilder.group({
       name:[, Validators.required]
      //  adress:[, Validators.required],
      //  email:[, Validators.required],
      //  phone:[, Validators.required],
      //  password: [, [Validators.required, Validators.minLength(minPass), Validators.maxLength(maxPass)]],
      //  confPass:[, [Validators.required, Validators.minLength(minPass), Validators.maxLength(maxPass)]]
     })
   }

  addEmpresa(name:string,address:string,email:string,phone:number,password:string,confPass:string){
    this.myForm.value
    this.apiService.addEmpresa(new Empresa(0,name,address,email,phone,password,confPass)).subscribe(
      (data:any)=>
      {
        this.myForm.value;
        console.log(address)
      }
    )
  }
prueba(){
  this.prueba1 = this.myForm.value
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
