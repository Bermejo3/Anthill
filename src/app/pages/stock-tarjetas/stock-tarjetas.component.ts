import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/shared/servicios.service';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import {Stock} from "../../models/stock"

@Component({
  selector: 'app-stock-tarjetas',
  templateUrl: './stock-tarjetas.component.html',
  styleUrls: ['./stock-tarjetas.component.css']
})
export class StockTarjetasComponent implements OnInit {
  
  stock : Stock = new Stock(0,0,"","",0,"","","",0)
  arrayStock : Stock[] = []
  showModal: boolean

  constructor(public servicio: ServiciosService, public apiService:ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.showModal=false
  }
  getStock(){
    this.apiService.getStock(this.servicio.id_companies).subscribe(
      (data:Stock[]) =>
      {
        this.arrayStock=data
      }
    )
  }

  ngOnInit(): void {
    this.getStock()
  }
  show(){
    this.showModal = true;
  }  
  hide(){ 
    this.showModal = false;
  }
}
