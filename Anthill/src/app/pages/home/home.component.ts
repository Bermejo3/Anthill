import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';


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

  constructor() {
    this.d = new Date()
    this.time = new Date()
   }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale
  };

  ngOnInit(): void {
    setInterval(()=>{
      this.d = new Date();
      this.second = this.d.getSeconds()*6
      this.minute = this.d.getMinutes()*6
      this.hour = this.d.getHours()*30 + Math.round(this.minute/12)
    },1000)

    setInterval(()=>{
      this.time = new Date();
      this.sec = this.time.getSeconds();
      this.min = this.time.getMinutes();
      this.hr = this.time.getHours();
      this.day = 'AM';
      if(this.hr > 12){
        this.day = 'PM';
        this.hr = this.hr - 12;
      }
      if(this.hr == 0){
        this.hr = 12;
      }
      if(this.sec < 10){
        this.secT = '0' + this.sec;
      }
      if(this.min < 10){
        this.minT = '0' + this.min;
      }
      if(this.hr < 10){
        this.hrT = '0' + this.hr;
      }
    });
  }

}
