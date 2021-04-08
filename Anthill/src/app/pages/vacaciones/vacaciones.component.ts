import { Component, OnInit,  } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { DateClickArg } from '@fullcalendar/interaction';
import { ServiciosService } from 'src/shared/servicios.service';


@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})
export class VacacionesComponent implements OnInit {

  public dia: number = 0
  public mes: string = ""
  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    weekNumbers: true,
    weekNumberFormat: { week: 'numeric'},
    height: "80vh",
    aspectRatio: 3,
    editable: true,
    eventContent:this.renderEventContent,
    eventClick: this.modalClick.bind(this),
  };

  calendarEvents= [
    {
      date:'2021-04-15',
      display: 'background',
      backgroundColor: '#ff9100',
      imageUrl: '../../../assets/Logo/Hormiga1.png',
    },
    {
      date: '2021-04-23',
      display: 'background',
      backgroundColor: '#fafafa',
      imageUrl: '../../../assets/Logo/Hormiga1.png',
    }
  ]

  ngOnInit(): void {
      this.calendarOptions.events = this.calendarEvents
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
    this.servicio.showInfo = true;
  }

  modalClick(clickInfo: EventClickArg){
    this.servicio.show()
    this.mes = clickInfo.event.startStr
  }

  
  hide(){ 
    this.servicio.showInfo = false;
  }

}
