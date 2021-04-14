import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';
import {Stock} from "../../models/stock"

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  showModal: boolean
  showModal2:boolean
  stock : Stock = new Stock(0,0,"","",0,"","","",0)
  arrayStock : Stock[] = []
  mensaje: string = ""
  mostrar: boolean
  posicionTabla : number = 0

  constructor(public servicio: ServiciosService,public apiService: ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.showModal = false
    this.showModal2 = false
    this.mostrar = false
   }

   getStock(){
    this.apiService.getStock(this.servicio.id_companies).subscribe
    (
      (data:Stock[]) =>
      {
        this.arrayStock=data
      }
    )
  }

  addStock(name:string,type:string,quantity:number,unit:string,date:string,place:string, minQuantity:number,picture:string){

    this.apiService.addStock(new Stock(0,this.servicio.id_companies,name ,type,quantity,unit,date,place,minQuantity,picture)).subscribe(
      (data:any)=>
      {      
        this.mensaje =data.mensaje
        this.getStock()
        this.hide()      
      }
    )
  }

  
updateStock(name:string,type:string,quantity:number,unit:string,date:string,place:string, minQuantity:number,picture:string){
  
  this.apiService.updateStock(new Stock(0,this.servicio.id_companies,name ,type,quantity,unit,date,place,minQuantity,picture)).subscribe(
    (data:any)=>
    {
      console.log(data)
      this.mensaje=data.mensaje
      this.getStock()
      this.hide()
    }

  )
}

  deleteStock(id_stock){
    this.apiService.deleteStock(id_stock).subscribe
    (
      (data:any) =>
      {
        this.mensaje =data.mensaje
        this.getStock()
        this.mostrar = true
      }
    )
    console.log(id_stock)  
  }

  ngOnInit(): void {
    this.getStock()
  }
  show(){
    this.showModal = true;   
  } 
  show2(posicionTabla)  {
    this.showModal2 = true;
    this.posicionTabla = posicionTabla
  } 
  hide(){ 
    this.showModal = false;
    this.showModal2=false
  }
  cerrar() {
    this.mostrar = false
  }

}



