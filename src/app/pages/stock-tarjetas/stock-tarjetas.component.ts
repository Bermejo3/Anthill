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

  showModal: boolean
  showModal2:boolean
  showModal3:boolean
  stock : Stock = new Stock(0,0,"","",0,"","","",0,"")
  arrayStock : Stock[] = [this.stock]
  mensaje: string = ""
  mostrar: boolean
  posicionTabla : number = 0

  public page: number = 1
  public itemsPerPage: number = 4

  constructor(public servicio: ServiciosService,public apiService: ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.showModal = false
    this.showModal2 = false
    this.showModal3=false
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

  this.posicionTabla= this.arrayStock[this.posicionTabla].id_stock

  this.apiService.updateStock(new Stock(this.posicionTabla,this.servicio.id_companies,name ,type,quantity,unit,date,place,minQuantity,picture)).subscribe(
    (data:any)=>
    {
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
        this.hide()
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
  showSure(posicionTabla){
    this.showModal3 = true;
    this.posicionTabla = posicionTabla
  }
  hide(){ 
    this.showModal = false;
    this.showModal2=false
    this.showModal3=false
  }
  cerrar() {
    this.mostrar = false
  }
  

}
  