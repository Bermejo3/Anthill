import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProdIndividual } from '../models/prod-individual';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  private url = 'http://localhost:300'

  constructor(public http: HttpClient) 
  { 
    
  }

  getProductividad(id_companies:number)
  {
    return this.http.get(this.url + "/productividad?id_companies=" + id_companies); //hazme un get a la url entre paréntesis
  }

  getProdIndividual(id_employees:number, id_companies:number)
  {
    return this.http.get(this.url + "/productividad/empleado?id_employees=" + id_employees + "&id_companies=" + id_companies)
  }

  addProductividad(nuevaProductividad:ProdIndividual)
  {
    return this.http.post(this.url + "/productividad", nuevaProductividad)
  }

  // getDisco(id?:number){
  //   if (id != null){
  //     return this.http.get(this.url +"?id=" + id)
  //   }
  //   else{
  //     return this.http.get(this.url)
  //   }
  // }

  // addDisco(disco:Disco){
  //   return this.http.post(this.url, disco)
  // }

  // uptadeDisco(disco:Disco){
  //   return this.http.put(this.url, disco)
  // }

  // deleteDisco(id:number){
  //   let options = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'}), 
  //     body: {"id": id}
  //   }
  //   return this.http.delete(this.url, options)
  // }


}

