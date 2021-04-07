import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  public estaOculto:boolean = true;

  public esEmpleado:boolean = false;

  public showInfo: boolean = false
  constructor() 
  { 

  }

  show(){
    this.showInfo = true;
  }

  hide(){ 
    this.showInfo = false;
  }

}
