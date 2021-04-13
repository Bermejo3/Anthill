import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Stock} from "../models/stock"

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  private url = 'http://localhost:300'

  constructor(public http: HttpClient) { }

  getStock(id_companies:number){
    return this.http.get(this.url+"/stock?id_companies="+id_companies)
  }
  
  addStock(stock:Stock){
    return this.http.post(this.url+"/stock", stock)
  }

  updateStock(stock:Stock){
    return this.http.put(this.url, stock)
  }

  deleteStock(id_stock:number){
    let options ={
          headers:new HttpHeaders({'Content-Type': 'application/json'}),
          body:{id_stock:id_stock}
    }
    return this.http.delete(this.url+"/stock", options)
  }

}
