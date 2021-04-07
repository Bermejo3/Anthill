import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-tarjetas',
  templateUrl: './stock-tarjetas.component.html',
  styleUrls: ['./stock-tarjetas.component.css']
})
export class StockTarjetasComponent implements OnInit {

  showModal: boolean

  constructor() { 
    this.showModal=false
  }

  ngOnInit(): void {
  }
  show(){
    this.showModal = true;
  }  
  hide(){ 
    this.showModal = false;
  }
}
