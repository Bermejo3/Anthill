import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  private url = 'http://localhost:300'

  constructor(public http: HttpClient) { }

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

