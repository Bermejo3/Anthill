import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-rrhh-empresa',
  templateUrl: './rrhh-empresa.component.html',
  styleUrls: ['./rrhh-empresa.component.css']
})
export class RrhhEmpresaComponent implements OnInit {

  empresa:Empresa=new Empresa(0,"","","",0,"","")
  arrayEmpresa : Empresa[] = [this.empresa]
  mensaje: string = ""
  posicionTabla:number=0
  

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService) {
    this.servicio.id_employees = Number(JSON.parse(sessionStorage.getItem("id_employees"))) || 1;  
    this.servicio.id_companies = Number(JSON.parse(sessionStorage.getItem("id_companies"))) || 1;
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }

  getEmpresa(){
    this.apiService.getEmpresa(this.servicio.id_companies).subscribe
    (
      (data:Empresa[]) =>
      {
        console.log(data)
        this.empresa=data[0]
        console.log(this.arrayEmpresa)
        
      }
    )
  }

  updateEmpresa(name:string,adress:string,email:string,phone:number,password:string){
    let id_companies =this.arrayEmpresa[this.posicionTabla].id_companies
    console.log(id_companies)
    this.apiService.updateEmpresa(new Empresa(id_companies,name,adress,email,phone,password)).subscribe(
      (data:any)=>
      {
        this.mensaje = data.mensaje
        console.log(this.mensaje)
      }
    )   
  }

  ngOnInit(): void {
    this.getEmpresa()
  }

}
