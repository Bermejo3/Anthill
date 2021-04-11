import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { DateClickArg } from '@fullcalendar/interaction';
import { ServiciosService } from 'src/shared/servicios.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-turnos-empresa',
  templateUrl: './turnos-empresa.component.html',
  styleUrls: ['./turnos-empresa.component.css']
})
export class TurnosEmpresaComponent implements OnInit {
  ;

  constructor(public servicio: ServiciosService, private _router: Router) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    weekNumbers: true,
    weekNumberFormat: { week: 'numeric'},
    height: "80vh",
    dateClick: this.modalClick2.bind(this)
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
      date:'',
      display: 'background',
      backgroundColor: '',
    }
  ]

  ngOnInit(): void {
    this.createEvents()
  }

  modalClick2(clickInfo: DateClickArg){ //ESTO PERMITE CALCULAR EL NUMERO DE LA SEMANA Y EL PRIMER DIA DE CADA SEMANA. NECESARIO PARA EL TURNO-EMPLEADO
    function weekday() {
      var date = new Date(clickInfo.date.getTime());
      date.setHours(0, 0, 0, 0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      // January 4 is always in week 1.
      var week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
    }
    // console.log(weekday())
    this.servicio.weekNumber=weekday()

    function getDateOfWeek(w:any, y:any) {
    var d = (1 + (w - 1) * 7)+3; // 1st of January + 7 days for each week
    return new Date(y, 0, d);
    }
    // console.log(getDateOfWeek(weekday(), clickInfo.date.getFullYear()))
    this.servicio.firstDayWeek=getDateOfWeek(weekday(), clickInfo.date.getFullYear())

    this._router.navigate(['turnos-semana'])
  }
  
}
