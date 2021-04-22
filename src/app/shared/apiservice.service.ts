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

  prodIndiMes(id_employees:number, id_companies:number)
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
  updateProductividad(nuevaProductividad:ProdIndividual)
  {
    return this.http.put(this.url+"/productividad", nuevaProductividad)
  }
  deleteProductividad(id_productivity:number)
  {
    let options = {
      headers: new HttpHeaders({'Content-Type':'application/json'}),
      body:{"id_productivity" : id_productivity}
    }
    return this.http.delete(this.url + "/productividad", options)
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

  getVacaciones(id_companies: number){
    return this.http.get(this.url + "/vacaciones/fecha?id_companies="+id_companies)
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

  addVacacionesEmp(id_employees, id_companies, date){
    let body = {
      id_employees: id_employees,
      id_companies: id_companies,
      date: date
    }
    return this.http.post(this.url + "/vacaciones", body)
  }

  addEmpresa(empresa:Empresa)
  {
    return this.http.post(this.url+"/empresa", empresa)
  }
  getEmpresa(id_companies:number)
  {
    return this.http.get(this.url+"/empresa?id_companies=" + id_companies)
  }
  updateEmpresa(empresa:Empresa)
  {
    return this.http.put(this.url+"/empresa", empresa)
  }

  getEmpleados(id_companies:number)
  {
    return this.http.get(this.url+"/empleado?id_companies="+id_companies)
  }

  getEmpleadoInd(id_employees:number)
  {
    return this.http.get(this.url+"/empleado/empleado?id_employees="+id_employees)
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

  getTurnosListaEmpleadosMorning(date, id_companies, shiftMorning, id_shifts, date2){
    return this.http.get(this.url +"/turnos/listaempleados/morning" +"?date" +date +"&shiftMorning=" +shiftMorning +"&id_companies=" + id_companies +"&id_shifts=" +id_shifts + "&date2=" + date2)
  }
  getTurnosListaEmpleadosAfternoon(date, id_companies, shiftAfternoon, id_shifts, date2){
    return this.http.get(this.url +"/turnos/listaempleados/afternoon" +"?date" +date +"&shiftAfternoon=" +shiftAfternoon +"&id_companies=" + id_companies +"&id_shifts=" +id_shifts + "&date2=" + date2)
  }
  getTurnosListaEmpleadosEvening(date, id_companies, shiftEvening, id_shifts, date2){
    return this.http.get(this.url +"/turnos/listaempleados/evening" +"?date" +date +"&shiftEvening=" +shiftEvening +"&id_companies=" + id_companies +"&id_shifts=" +id_shifts + "&date2=" + date2)
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


  getTurnosEmpleado(id_companies, id_employees){
    return this.http.get(this.url +"/turnos/empleado" +"?id_companies=" +id_companies +"&id_employees="+id_employees)
  }

  postLogin(email, password){
    let body = {
      email: email,
      password: password
    }
    return this.http.post(this.url + "/empresa/login", body)
  }
  postLoginEmpleado(email, password){
    let body = {
      email: email,
      password: password
    }
    return this.http.post(this.url + "/empleado/login", body)
  }

}
