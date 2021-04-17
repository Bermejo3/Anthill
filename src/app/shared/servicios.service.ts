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

  public id_employees:number = Number(JSON.parse(sessionStorage.getItem("id_employees")));  
  public id_companies: number = Number(JSON.parse(sessionStorage.getItem("id_companies")));

  public nombreEmpleado: string = "";
  public produccionEmpleado: number = 0;
  public horasEmpleado: number = 0;
  public diaTrabajado: string = "";

  public weekNumber: number = 0
  public firstDayWeek: Date = new Date()

  constructor() 
  { 
    this.id_employees = Number(JSON.parse(sessionStorage.getItem("id_employees"))) || 1;  
    this.id_companies = Number(JSON.parse(sessionStorage.getItem("id_companies"))) || 1;
  }

  show(){
    this.showInfo = true;
  }

  hide(){ 
    this.showInfo = false;
  }

}
