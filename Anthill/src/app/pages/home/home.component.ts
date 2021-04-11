import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { ServiciosService } from 'src/shared/servicios.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  second = 0
  hour = 0
  minute = 0
  d: Date

  sec=0
  secT=""
  min=0
  minT=""
  hr=0
  hrT=""
  day=""
  time: Date

  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.d = new Date()
    this.time = new Date()
   }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    height: '80vh'
  };

  ngOnInit(): void {
    setInterval(()=>{
      this.d = new Date();
      this.second = this.d.getSeconds()*6
      this.minute = this.d.getMinutes()*6
      this.hour = this.d.getHours()*30 + Math.round(this.minute/12)
    },1000)
  }

}
