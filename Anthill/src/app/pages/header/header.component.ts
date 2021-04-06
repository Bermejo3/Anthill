import { Component, OnInit } from '@angular/core';
​
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private now = new Date()
  public hour: number = this.now.getHours()
  public minute: number = this.now.getMinutes()
  public seconds: number = this.now.getSeconds()
  public weekDay = this.now.getDay()
  public day = this.now.getDate()
  public month = this.now.getMonth()
  constructor() { }
​
  ngOnInit(): void {
  }
  public getDay(){
    let weekD = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    let monthM = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    return weekD[this.weekDay] +", " + this.day +" de " +monthM[this.month]
  }
​

}