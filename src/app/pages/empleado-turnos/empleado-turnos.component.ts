import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/shared/servicios.service';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { DateClickArg } from '@fullcalendar/interaction';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { Turnos } from 'src/app/models/turnos';

@Component({
  selector: 'app-empleado-turnos',
  templateUrl: './empleado-turnos.component.html',
  styleUrls: ['./empleado-turnos.component.css']
})
export class EmpleadoTurnosComponent implements OnInit {

  public showInfo: boolean = false
  public semana: Date[] = []
  public semana2: Date[] = []
  public diasSemana: string[] = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
  public id: string ="" 

  constructor(public servicio: ServiciosService, public apiservice: ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.servicio.esEmpleado=true //Para iniciar el sidebar de empleado
  }
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    weekNumbers: true,
    weekNumberFormat: { week: 'numeric'},
    height: "50vh",
    fixedWeekCount: false,
    dateClick: this.modalClick2.bind(this)
  };
  calendarEvents= [
  ]

  getTurnosEmpleado(){
    this.apiservice.getTurnosEmpleado(this.servicio.id_companies, this.servicio.id_employees).subscribe((resultado: Turnos[])=>{
      console.log(resultado)
      let event = {date: "", display:"", backgroundColor:""}
      for (let i=0; i<resultado.length; i++){
        event = {
          date: resultado[i].date,
          display: 'background',
          backgroundColor: "#008000cc",
        }
        this.calendarEvents.push(event)
      }
      this.calendarOptions.events = this.calendarEvents
    })
  }

  ngOnInit(): void {
    this.getTurnosEmpleado()

    this.crearSemana()
    
    this.mostrarTurnos()
  }

  show(){
    this.showInfo=true
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

    this.show()
    this.crearSemana()
    this.mostrarTurnos()
  }

  crearSemana(){
    this.semana = []
    for (let i=0; i<7; i++){
      let newFecha: Date = new Date(this.servicio.firstDayWeek)
      newFecha.setUTCDate(this.servicio.firstDayWeek.getUTCDate()+i)
      this.semana.push(newFecha)
    }
    this.semana2 =  []
    for (let i=0; i<8; i++){
      let newFecha2: Date = new Date(this.servicio.firstDayWeek)
      newFecha2.setDate(this.servicio.firstDayWeek.getDate()+i)
      this.semana2.push(newFecha2)
    }
    this.mostrarTurnos()
  }

  mostrarTurnos(){
    this.apiservice.getTurnosEmpleado(this.servicio.id_companies, this.servicio.id_employees).subscribe((resultado: Turnos[])=>{
      for (let i=0; i<this.semana.length; i++){
        for (let j=0; j<resultado.length; j++){
          if (resultado[j].date == this.semana2[i+1].toJSON().slice(0,10)){
            if (resultado[j].turno == "Mañana"){
              document.getElementById(`M${i}`)!.className = "turnoCompleto"
            }
            else if (resultado[j].turno == "Tarde"){             
              document.getElementById(`T${i}`)!.className = "turnoCompleto"
            }
            else if (resultado[j].turno == "Noche"){
              document.getElementById(`N${i}`)!.className = "turnoCompleto"
            }
          }
        }
      }
    })
  }

}
