import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/shared/servicios.service';

@Component({
  selector: 'app-stock-tarjetas',
  templateUrl: './stock-tarjetas.component.html',
  styleUrls: ['./stock-tarjetas.component.css']
})
export class StockTarjetasComponent implements OnInit {

  showModal: boolean

  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
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
