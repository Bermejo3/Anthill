import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showAlert:boolean
  public mensaje:string=""

  constructor(private apiservice: ApiserviceService, private servicio: ServiciosService, private _router: Router) {
    this.showAlert=false
   }
  alertaLogin(){
    this.showAlert=true
    this.mensaje=this.mensaje
    setTimeout(()=>{this.showAlert=false},3000)
  }
  cerrar(){
    this.showAlert=false
  }

  ngOnInit(): void {
  }

  acceder(email: string, password: string){
    this.apiservice.postLogin(email, password).subscribe((resultado: any)=>{
      if (resultado.codigo == 1){
        
        sessionStorage.setItem("id_companies", JSON.stringify(resultado.res[0].id_companies))
        // this.servicio.id_companies = resultado.res[0].id_companies
        this._router.navigate(['home'])
      }
      else{
        this.apiservice.postLoginEmpleado(email, password).subscribe((resultado: any)=>{
          if (resultado.codigo == 1){
            this.servicio.esEmpleado = true
            sessionStorage.setItem("id_companies", JSON.stringify(resultado.res[0].id_companies))
            sessionStorage.setItem("id_employees", JSON.stringify(resultado.res[0].id_employees))
            // this.servicio.id_employees = resultado.res[0].id_employees
            this._router.navigate(['home'])
          }
          else{
            this.alertaLogin()
          }
        })
      }
    })
  }

}
