import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/shared/servicios.service';
​
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit 
{
  private now = new Date()
  public sec:number=0
  public secT:string=""
  public min:number=0
  public minT:string=""
  public hr:number=0
  public hrT:string=""
  public time: Date;

  public weekDay = this.now.getDay()
  public day = this.now.getDate()
  public month = this.now.getMonth()
  public isHidden: boolean = true;

  constructor(public servicio:ServiciosService) 
  {
    this.sec=0
    this.secT=""
    this.min=0
    this.minT=""
    this.hr=0
    this.hrT=""
    this.time = new Date();
  }
  
  mostrarBarra()
  {
    this.servicio.estaOculto = !this.servicio.estaOculto
  }
  ​
  ngOnInit(): void 
  {
    setInterval(()=>
    {
      this.time = new Date();
      this.sec = this.time.getSeconds();
      this.min = this.time.getMinutes();
      this.hr = this.time.getHours();
    },1000)
  }
  public getDay()
  {
    let weekD = ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    let monthM = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    return weekD[this.weekDay] +", " + this.day +" de " +monthM[this.month]
  }
}

