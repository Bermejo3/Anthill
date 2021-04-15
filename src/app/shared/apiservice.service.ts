import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProdIndividual } from '../models/prod-individual';
import {Stock} from "../models/stock"
import { Empresa } from '../models/empresa';
import{Empleados}from"../models/empleados"
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  private url = 'http://localhost:300'

  constructor(public http: HttpClient) 
  { 
    
  }

  ProdIndiMes(id_employees:number, id_companies:number)
  {
    return this.http.get(this.url + "/productividad/empleado/fecha?id_employees=" + id_employees + "&id_companies=" + id_companies)
  }
  getProductividad(id_companies:number)
  {
    return this.http.get(this.url + "/productividad?id_companies=" + id_companies); //hazme un get a la url entre paréntesis
  }

  getProdIndividual(id_employees:number, id_companies:number)
  {
    return this.http.get(this.url + "/productividad/empleado?id_employees=" + id_employees + "&id_companies=" + id_companies)
  }

  getProductMes(id_companies:number)
  {
    return this.http.get(this.url + "/productividad/fecha?id_companies=" + id_companies);
  }

  addProductividad(nuevaProductividad:ProdIndividual)
  {
    return this.http.post(this.url + "/productividad", nuevaProductividad)
  }

  getStock(id_companies:number){
    return this.http.get(this.url+"/stock?id_companies="+id_companies)
  }
  
  addStock(stock:Stock){
    return this.http.post(this.url+"/stock", stock)
  }

  updateStock(stock:Stock){
    console.log('ok')
    return this.http.put(this.url+"/stock", stock)
    
  }

  deleteStock(id_stock:number){
    let options ={
          headers:new HttpHeaders({'Content-Type': 'application/json'}),
          body:{id_stock:id_stock}
    }
    return this.http.delete(this.url+"/stock", options)
  }

  getVacaciones(){
    return this.http.get(this.url + "/vacaciones/fecha")
  }

  getVacacionesEmp(id_employees:number){
    return this.http.get(this.url + "/vacaciones/empleado?id_employees="+id_employees)
  }

  deleteVacacionesEmp(id_employees, fecha){
     let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}), 
      body: {"id_employees": id_employees,
              "date": fecha
            }
    }
    return this.http.delete(this.url + "/vacaciones", options)
  }

  addVacacionesEmp(id_employees, date){
    let body = {
      id_employees: id_employees,
      date: date
    }
    return this.http.post(this.url + "/vacaciones", body)
  }

  addEmpresa(empresa:Empresa)
  {
    return this.http.post(this.url+"/empresa", empresa)
  }

  getEmpleados(id_companies:number)
  {
    return this.http.get(this.url+"/empleado?id_companies="+id_companies)
  }

  getEmpleadoInd(id_companies:number)
  {
    return this.http.get(this.url+"/empleado/empleado?id_companies="+id_companies)
  }

  addEmpleado(empleado:Empleados)
  {
    return this.http.post(this.url+"/empleado", empleado)
  }

  updateEmpleado(empleado:Empleados){
    
    return this.http.put(this.url+"/empleado", empleado)
  }
  deleteEmpleado(id_employees:number){
    let options ={
          headers:new HttpHeaders({'Content-Type': 'application/json'}),
          body:{id_employees:id_employees}
          
          
    }
    console.log(options);
    return this.http.delete(this.url+"/empleado", options)
  }




  getTurnos(id_companies){
    return this.http.get(this.url + "/turnos/empresa?id_companies=" + id_companies)
  }

  getTurnosSemana(id_companies){
    return this.http.get(this.url + "/turnos/semana?id_companies=" + id_companies)
  }

  getTurnosListaEmpleados(id_companies, shiftMorning, shiftAfternoon, shiftEvening){
    return this.http.get(this.url +"/turnos/listaempleados" +"?id_companies=" + id_companies +"&shiftMorning=" + shiftMorning + "&shiftAfternoon=" + shiftAfternoon + "&shiftEvening=" + shiftEvening)
  }

  postTurnos(id_companies, id_employees, id_shifts, date){
    let body = {
      id_companies: id_companies,
      id_employees: id_employees,
      id_shifts: id_shifts,
      date: date
    }
    return this.http.post(this.url + "/turnos", body)
  }

  deleteTurno(id_companies, id_employees, id_shifts, date){
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}), 
      body: {id_companies: id_companies,
             id_employees: id_employees,
             id_shifts: id_shifts,
             date: date
            }
    }
    return this.http.delete(this.url + "/turnos", options)
  }
}

