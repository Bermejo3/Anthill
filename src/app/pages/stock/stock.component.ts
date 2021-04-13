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
  showModal2
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

addStock(name:string,type:string,quantity:number,unit:string,date:string,place:string, minQuantity:number,picture:string){

  this.apiService.addStock(new Stock(0,this.servicio.id_companies,name ,type,quantity,unit,date,place,minQuantity,picture)).subscribe(
    (data:any)=>
    {      
      this.getStock()
      this.hide()      
    }
  )
}

  ngOnInit(): void {
    this.getStock()
  }
  show(){
    this.showModal = true;   
  } 
  show2(posicionTabla:number){
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


// eliminarDisco() {
//   this.disco = this.myForm.value
//   this._discoService.eliminarDisco(this.disco.id).subscribe(
//     (data: any) => {
//       this.mensaje = data.mensaje
//       this.cerrar()
//       this.discos=data
//       this.disco.id=null
//       if (data.length == 0) {
     
//         this.mostrar = true

//         this.mensaje = "No se encuentra el Id"
//       }
//       this.obtenerDiscos
//     }

//   )
// }

  // grabarDatos() {
//   this.disco = this.myForm.value
//   this._discoService.grabarDisco(this.disco).subscribe(
//     (data) => {
//       console.log(data)
//       console.log('Disco Guardado')

//       this.obtenerDiscos()


//     }
//   )
// }


// cambiarDatos() {
//   this.disco = this.myForm.value
//   this._discoService.cambiarDisco(this.disco).subscribe(
//     (data) => {
//       console.log(data)
//       if (this.disco.interprete == null || this.disco.titulo == null || this.disco.anyoPublicacion == null) {
//         this.mensaje = "Faltan campos"
//       } else {
//         this.mensaje = "Disco modificado"
//       }
//       this.obtenerDiscos()

//     }
//   )
// }

