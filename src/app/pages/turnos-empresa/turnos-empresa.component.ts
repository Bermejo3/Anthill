import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { DateClickArg } from '@fullcalendar/interaction';
import { ServiciosService } from 'src/app/shared/servicios.service';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { Turnos } from 'src/app/models/turnos';



@Component({
  selector: 'app-turnos-empresa',
  templateUrl: './turnos-empresa.component.html',
  styleUrls: ['./turnos-empresa.component.css']
})
export class TurnosEmpresaComponent implements OnInit {
  ;

  public turnos: any[] = []
  constructor(public servicio: ServiciosService, private _router: Router, private apiservice: ApiserviceService) {
    this.servicio.id_employees = Number(JSON.parse(sessionStorage.getItem("id_employees"))) || 1;  
    this.servicio.id_companies = Number(JSON.parse(sessionStorage.getItem("id_companies"))) || 1;
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

  calendarEvents = []

  ngOnInit(): void {
    this.getTurnos()
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

    this._router.navigate(['turnos-empresa/semana'])
  }
  
  getTurnos(){
    this.apiservice.getTurnos(this.servicio.id_companies).subscribe((resultado: any[])=>{
      this.turnos = resultado
    for (let i=0; i<this.turnos.length; i++){
      if (this.turnos[i].count_employees == 9){
        let shift = {
          date: this.turnos[i].date,
          display: 'background',
          backgroundColor: '#ff0000',
        }
        this.calendarEvents.push(shift)
      }
      else{
        let shift = {
          date: this.turnos[i].date,
          display: 'background',
          backgroundColor: '#fbff00',
  
        }
        this.calendarEvents.push(shift)
      }

    }
    this.calendarOptions.events = this.calendarEvents
    })
  }
}
