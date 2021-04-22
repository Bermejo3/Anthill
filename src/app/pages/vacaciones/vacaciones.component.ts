import { Component, OnInit,  } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { DateClickArg } from '@fullcalendar/interaction';
import { Holidays } from 'src/app/models/holidays';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';


@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})
export class VacacionesComponent implements OnInit {

  public showInfo: boolean = false
  public dia: number = 0
  public mes: string = ""
  public vacaciones: Holidays[] = []
  public arrayVacaciones: string[] = []
  
  constructor(public servicio: ServiciosService, private apiservice: ApiserviceService) {
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
    editable: true,
    eventContent:this.renderEventContent,
    eventClick: this.modalClick.bind(this),
  };

  calendarEvents= [
  ]

  ngOnInit(): void {
    this.getVacaciones()
  }

  renderEventContent(eventInfo:any, createElement:any) {
    var innerHtml;
       //Check if event has image
    if (eventInfo.event._def.extendedProps.imageUrl) {
      
     // Store custom html code in variable
     innerHtml = eventInfo.event._def.title+"<img style='width:60px; margin:10px; ' src='"+eventInfo.event._def.extendedProps.imageUrl+"'>";
     //Event with rendering html
     return createElement = { html: '<div>'+innerHtml+'</div>' }
    }
    return "asd" 
  }

  show(){
    this.showInfo = true;
  }

  modalClick(clickInfo: EventClickArg){
    this.show()
    this.mes = clickInfo.event.startStr
    let arrayVacaciones = []
    for (let i=0; i<this.vacaciones.length; i++){
      if (this.vacaciones[i].date == this.mes){
        arrayVacaciones.push(this.vacaciones[i].name)
      }
    }
    this.arrayVacaciones = arrayVacaciones
  }

  
  hide(){ 
    this.showInfo = false;
  }

  getVacaciones(){
    this.apiservice.getVacaciones(this.servicio.id_companies).subscribe((resultado: Holidays[])=>{
      this.vacaciones = resultado
    for (let i=0; i<this.vacaciones.length; i++){
      let holiday = {
        date: this.vacaciones[i].date,
        display: 'background',
        backgroundColor: '#fafafa',
        imageUrl: '../../../assets/Logo/Hormiga1.png',
      }
      this.calendarEvents.push(holiday)
    }
    this.calendarOptions.events = this.calendarEvents
    })
  }
}
