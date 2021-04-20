import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';
import {Stock} from "../../models/stock"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  showModal: boolean
  showModal2:boolean
  showModal3:boolean
  stock : Stock = new Stock(0,0,"","",0,"","",0)
  arrayStock : Stock[] = [this.stock]
  mensaje: string = ""
  mostrar: boolean
  posicionTabla : number = 0
  public id_stock: number = 0

  public page: number = 1
  public itemsPerPage: number = 10

  public formularioStockAdd: FormGroup
  public formularioStockUpdate: FormGroup
  

  constructor(public servicio: ServiciosService,public apiService: ApiserviceService, private formBuilder:FormBuilder) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.showModal = false
    this.showModal2 = false
    this.mostrar = false

    this.buildFormAdd()
    this.buildFormUpdate()
   }

   public buildFormAdd()
   {
     this.formularioStockAdd = this.formBuilder.group({
       foto: [null, ],
       articulo:["" , Validators.required],
       categoria:["" , Validators.required],
       cantidad:["" , Validators.required],
       unidad:["" , Validators.required],
       ubicacion: [ "", Validators.required],
       minCantidad:[ "", Validators.required]
      })
   }

   addStockForm(){
    this.apiService.addStock(new Stock(0,this.servicio.id_companies, this.formularioStockAdd.get('articulo').value,this.formularioStockAdd.get('categoria').value,this.formularioStockAdd.get('cantidad').value,this.formularioStockAdd.get('unidad').value,this.formularioStockAdd.get('ubicacion').value,this.formularioStockAdd.get('minCantidad').value,this.formularioStockAdd.get('foto').value)).subscribe(
      (data:any)=>
      {      
        this.mostrar=true
        setTimeout(()=>{this.mostrar=false},3000)
        this.mensaje =data.mensaje
        this.getStock()
        this.hide()      
      }
    )
   }

   public buildFormUpdate()
   {
     this.formularioStockUpdate = this.formBuilder.group({
       foto: [this.arrayStock[this.posicionTabla].picture, ],
       articulo:[this.arrayStock[this.posicionTabla].name , Validators.required],
       categoria:[this.arrayStock[this.posicionTabla].type , Validators.required],
       cantidad:[this.arrayStock[this.posicionTabla].quantity , Validators.required],
       unidad:[this.arrayStock[this.posicionTabla].unit , Validators.required],
       ubicacion: [this.arrayStock[this.posicionTabla].place, Validators.required],
       minCantidad:[this.arrayStock[this.posicionTabla].minQuantity, Validators.required]
      })
   }

   updateStockForm(){   
    this.apiService.updateStock(new Stock(this.id_stock,this.servicio.id_companies, this.formularioStockUpdate.get('articulo').value,this.formularioStockUpdate.get('categoria').value,this.formularioStockUpdate.get('cantidad').value,this.formularioStockUpdate.get('unidad').value,this.formularioStockUpdate.get('ubicacion').value,this.formularioStockUpdate.get('minCantidad').value,this.formularioStockUpdate.get('foto').value)).subscribe(
      (data:any)=>
      {
        this.mostrar=true
        setTimeout(()=>{this.mostrar=false},3000)
        this.mensaje=data.mensaje
        this.getStock()
        this.hide()
      }
    )
  }

// addStock(name:string,type:string,quantity:number,unit:string,place:string, minQuantity:number,picture:string){
//   this.apiService.addStock(new Stock(0,this.servicio.id_companies,name ,type,quantity,unit,place,minQuantity,picture)).subscribe(
//     (data:any)=>
//     {      
//       this.mostrar=true
//       setTimeout(()=>{this.mostrar=false},3000)
//       this.mensaje =data.mensaje
//       this.getStock()
//       this.hide()      
//     }
//   )
// }
// updateStock(name:string,type:string,quantity:number,unit:string,place:string, minQuantity:number,picture:string){
//   let id_stock= this.arrayStock[this.posicionTabla].id_stock
//   this.apiService.updateStock(new Stock(id_stock,this.servicio.id_companies,name ,type,quantity,unit,place,minQuantity,picture)).subscribe(
//     (data:any)=>
//     {
//       this.mostrar=true
//       setTimeout(()=>{this.mostrar=false},3000)
//       this.mensaje=data.mensaje
//       this.getStock()
//       this.hide()
//     }
//   )
// }

  getStock(){
    this.apiService.getStock(this.servicio.id_companies).subscribe
    (
      (data:Stock[]) =>
      {
        this.arrayStock=data
      }
    )
  }

  deleteStock(){
    this.apiService.deleteStock(this.id_stock).subscribe
    (
      (data:any) =>
      {
        this.mostrar=true
        setTimeout(()=>{this.mostrar=false},3000)
        this.mensaje =data.mensaje
        this.hide()
        this.getStock()
      } 
    )
  }

  ngOnInit(): void {
    this.getStock()
  }

  showPosicion(posicionTabla)  {
    this.posicionTabla = posicionTabla
  } 
  
  show(){
    this.showModal = true;   
  } 

  show2(id_stock)  {
    this.showModal2 = true;
    this.id_stock = id_stock
    for (let i=0; i<this.arrayStock.length; i++){ //Coger la posicion del array para mostrar los datos en el modal del update
      if (this.arrayStock[i].id_stock == this.id_stock){
        this.posicionTabla=i
      }
    }
    this.buildFormUpdate()
  } 

  showSure(id_stock){
    this.showModal3 = true;
    this.id_stock = id_stock
    for (let i=0; i<this.arrayStock.length; i++){ //Coger la posicion del array para mostrar los datos en el modal del update
      if (this.arrayStock[i].id_stock == this.id_stock){
        this.posicionTabla=i
      }
    }
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



