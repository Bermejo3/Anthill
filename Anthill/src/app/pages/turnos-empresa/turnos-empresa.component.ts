import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-turnos-empresa',
  templateUrl: './turnos-empresa.component.html',
  styleUrls: ['./turnos-empresa.component.css']
})
export class TurnosEmpresaComponent implements OnInit {

  constructor() { }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    weekNumbers: true,
    weekNumberFormat: { week: 'numeric'},
    height: "80vh",
  };

  createEvents(){
    let event = {date: "", display:"", backgroundColor:""}
    let colores = ["#018101","#fffb00","#df0a0a"]
    for (let i=0; i<32; i++){
      let color =  colores[Math.floor(Math.random()*3)]
      event = {
        date: '2021-04-'+(i+1),
        display: 'background',
        backgroundColor: color,
      }
      this.calendarEvents.push(event)
    }
    this.calendarOptions.events = this.calendarEvents
  }
  calendarEvents= [
    {
      date:'2021-04-15',
      display: 'background',
      backgroundColor: '#ff9100',
    },
    {
      date: '2021-04-23',
      display: 'background',
      backgroundColor: '#fafafa',
    }
  ]

  ngOnInit(): void {
    this.createEvents()
  }

}
