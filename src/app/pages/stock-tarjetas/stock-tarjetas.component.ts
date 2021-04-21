import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/shared/servicios.service';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import {Stock} from "../../models/stock"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-stock-tarjetas',
  templateUrl: './stock-tarjetas.component.html',
  styleUrls: ['./stock-tarjetas.component.css']
})
export class StockTarjetasComponent implements OnInit {

  showModal: boolean
  showModal2:boolean
  showModal3:boolean
  stock : Stock = new Stock(0,0,"","",0,"","",0,"")
  arrayStock : Stock[] = [this.stock]
  arrayStockBackup:Stock[] = []
  arrayStockCategoria:string[]=[]
  arrayStockUnidad:string[]=[]
  arrayStockUbicacion:string[]=[]
  mensaje: string = ""
  mostrar: boolean
  posicionTabla : number = 0
  public id_stock: number = 0

  public page: number = 1
  public itemsPerPage: number = 4

  public formularioStockAdd: FormGroup
  public formularioStockUpdate: FormGroup

  public searchText: string=""

  constructor(public servicio: ServiciosService,public apiService: ApiserviceService, private formBuilder:FormBuilder) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.showModal = false
    this.showModal2 = false
    this.showModal3=false
    this.mostrar = false
    this.arrayStockCategoria=[]
    this.arrayStockUnidad=[]
    this.arrayStockUbicacion=[]

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

  getStock(){
    this.apiService.getStock(this.servicio.id_companies).subscribe
    (
      (data:Stock[]) =>
      {
        this.arrayStock=data
        this.arrayStockBackup=data
        this.arrayStockCategoria=[]
        for(let i=0;i<this.arrayStock.length;i++)
        {
          if(!this.arrayStockCategoria.includes(this.arrayStock[i].type))
          {
            this.arrayStockCategoria.push(this.arrayStock[i].type)
          }
          if(!this.arrayStockUnidad.includes(this.arrayStock[i].unit))
          {
            this.arrayStockUnidad.push(this.arrayStock[i].unit)
          }
          if(!this.arrayStockUbicacion.includes(this.arrayStock[i].place))
          {
            this.arrayStockUbicacion.push(this.arrayStock[i].place)
          }

        }
        console.log(this.arrayStockCategoria);  
        console.log(this.arrayStockUnidad);
        console.log(this.arrayStockUbicacion); 
      }
    )
  }

  selectStock(selectBox:HTMLSelectElement){
    
    this.arrayStock = this.arrayStockBackup.filter(nuevoArray=>nuevoArray.type.includes(selectBox.value))
  }

  selectStock2(selectBox2:HTMLSelectElement){
    
    this.arrayStock = this.arrayStockBackup.filter(nuevoArray2=>nuevoArray2.unit.includes(selectBox2.value))
  }

  selectStock3(selectBox3:HTMLSelectElement){
    
    this.arrayStock = this.arrayStockBackup.filter(nuevoArray3=>nuevoArray3.place.includes(selectBox3.value))
  }

  selectStock4(selectBox4:HTMLSelectElement){
    if (Number(selectBox4.value)==1){
      this.arrayStock = this.arrayStockBackup.filter(nuevoArray3=>nuevoArray3.minQuantity < nuevoArray3.quantity)
    }
    else if (Number(selectBox4.value)==0){
      this.arrayStock = this.arrayStockBackup.filter(nuevoArray3=>nuevoArray3.minQuantity > nuevoArray3.quantity)
    }
    else{
      this.arrayStock = this.arrayStockBackup
    }
  }

  addStock(name:string,type:string,quantity:number,unit:string,place:string, minQuantity:number,picture:string){

    this.apiService.addStock(new Stock(0,this.servicio.id_companies,name ,type,quantity,unit,place,minQuantity,picture)).subscribe(
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

  
updateStock(name:string,type:string,quantity:number,unit:string,place:string, minQuantity:number,picture:string){

  this.posicionTabla= this.arrayStock[this.posicionTabla].id_stock

  this.apiService.updateStock(new Stock(this.posicionTabla,this.servicio.id_companies,name ,type,quantity,unit,place,minQuantity,picture)).subscribe(
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

  deleteStock(){
    this.apiService.deleteStock(this.id_stock).subscribe
    (
      (data:any) =>
      {
        this.mostrar=true
        setTimeout(()=>{this.mostrar=false},3000)
        this.mensaje =data.mensaje
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

  filter(){
    if (this.searchText==""){
      this.arrayStock = this.arrayStockBackup
    }
    else{
      this.arrayStock = this.arrayStockBackup.filter(newArray =>
        newArray.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
        newArray.type.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
        newArray.quantity == Number(this.searchText) ||
        newArray.unit.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
        newArray.place.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()),
      )
    }
  }
  

}
  