import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rrhh-empleados',
  templateUrl: './rrhh-empleados.component.html',
  styleUrls: ['./rrhh-empleados.component.css']
})
export class RrhhEmpleadosComponent implements OnInit {

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
