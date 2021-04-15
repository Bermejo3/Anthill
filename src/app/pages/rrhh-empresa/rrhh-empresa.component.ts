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
  arrayEmpresa : Empresa[] = []
  mensaje: string = ""

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }
  updateEmpresa(name:string,adress:string,email:string,phone:number,password:string,confPass:string,picture:string){

    this.apiService.addEmpresa(new Empresa(0,name,adress,email,phone,password,confPass)).subscribe(
      (data:any)=>
      {
        this.mensaje = data.mensaje
      }
    )   
  }

  ngOnInit(): void {
  }

}
