import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  public estaOculto:boolean = true;

  public esEmpleado:boolean = false;

  public showInfo: boolean = false

  public estaLogueado: boolean = false

  public nombreEmpleado: string = "";
  public produccionEmpleado: number = 0;
  public horasEmpleado: number = 0;
  public diaTrabajado: string = "";

  public weekNumber: number = 0
  public firstDayWeek: Date = new Date()

  public id_employees: number = 1

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
