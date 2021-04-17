import { Injectable } from '@angular/core';
import { Empleados } from '../models/empleados';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  public numeroEmpleados:number[];
  public produccionMes:number[];
  public produccionMesEmpleado:number[];
  
  public arrayEmpleados : Empleados[] = []

  public estaOculto:boolean = true;

  public esEmpleado:boolean = false;

  public showInfo: boolean = false

  public estaLogueado: boolean = false

  public id_employees:number = 1;
  public id_companies: number = 1;
  

  public nombreEmpleado: string = "";
  public produccionEmpleado: number = 0;
  public horasEmpleado: number = 0;
  public diaTrabajado: string = "";

  public weekNumber: number = 0
  public firstDayWeek: Date = new Date()

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
