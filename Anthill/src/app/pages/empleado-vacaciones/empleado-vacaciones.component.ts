import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { DateClickArg } from '@fullcalendar/interaction';
import { ServiciosService } from 'src/shared/servicios.service';


@Component({
  selector: 'app-empleado-vacaciones',
  templateUrl: './empleado-vacaciones.component.html',
  styleUrls: ['./empleado-vacaciones.component.css']
})
export class EmpleadoVacacionesComponent implements OnInit {

  public showModal: boolean
  public showModalVacaciones: boolean
  public posicionEvento: number = 0
  public diaVacaciones: string = ""
  
  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.servicio.esEmpleado=true //Para iniciar el sidebar de empleado
    this.showModal = false
    this.showModalVacaciones = false
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    weekNumbers: true,
    weekNumberFormat: { week: 'numeric'},
    height: "80vh",
    aspectRatio: 3,
    eventContent:this.renderEventContent,
    dateClick: this.modalClick.bind(this)
  };

  calendarEvents= [
    {
      date:'2021-01-02',
      display: 'background',
      backgroundColor: '#ff9100',
      imageUrl: '../../../assets/Logo/Hormiga1.png',
    },
    {
      date:'2021-01-03',
      display: 'background',
      backgroundColor: '#ff9100',
      imageUrl: '../../../assets/Logo/Hormiga1.png',
    },
    {
      date:'2021-02-06',
      display: 'background',
      backgroundColor: '#ff9100',
      imageUrl: '../../../assets/Logo/Hormiga1.png',
    },
    {
      date:'2021-03-27',
      display: 'background',
      backgroundColor: '#ff9100',
      imageUrl: '../../../assets/Logo/Hormiga1.png',
    },
    {
      date:'2021-04-15',
      display: 'background',
      backgroundColor: '#ff9100',
      imageUrl: '../../../assets/Logo/Hormiga1.png',
    },
    {
      date:'2021-07-06',
      display: 'background',
      backgroundColor: '#ff9100',
      imageUrl: '../../../assets/Logo/Hormiga1.png',
    },
    {
      date: '2021-07-23',
      display: 'background',
      backgroundColor: '#ff9100',
      imageUrl: '../../../assets/Logo/Hormiga1.png',
    }
  ]

  renderEventContent(eventInfo:any, createElement:any) {
    var innerHtml;
       //Check if event has image
    if (eventInfo.event._def.extendedProps.imageUrl) {
      
     // Store custom html code in variable
     innerHtml = eventInfo.event._def.title+"<img style='width:40px; margin:25px; ' src='"+eventInfo.event._def.extendedProps.imageUrl+"'>";
     //Event with rendering html
     return createElement = { html: '<div>'+innerHtml+'</div>' }
    }
    return "asd" 
  }

  modalClick(clickInfo: DateClickArg){
    this.showModalVacaciones = true;
    this.diaVacaciones = clickInfo.dateStr
  }

  addVacaciones(dia: string){
    this.calendarEvents.push({date: dia, display: 'background', backgroundColor: '#ff9100',
          imageUrl: '../../../assets/Logo/Hormiga1.png',})
    this.hide()
  }


  ngOnInit(): void {
      this.calendarOptions.events = this.calendarEvents
  }

  show(i:number){
    this.posicionEvento = i
    this.showModal = true;
  }

  
  hide(){ 
    this.showModal = false;
    this.showModalVacaciones = false;
  }
  
  borrar(posicionEvento: number){
    this.hide()
    this.calendarEvents.splice(posicionEvento,1)
    this.calendarOptions.events = this.calendarEvents
  }

}
