import { Component, OnInit } from '@angular/core';
import { CalendarApi, CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { DateClickArg } from '@fullcalendar/interaction';
import { Holidays } from 'src/app/models/holidays';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';


@Component({
  selector: 'app-empleado-vacaciones',
  templateUrl: './empleado-vacaciones.component.html',
  styleUrls: ['./empleado-vacaciones.component.css']
})
export class EmpleadoVacacionesComponent implements OnInit {

  public showModal: boolean
  public showModalVacaciones: boolean
  public showModalBorrarVacaciones: boolean
  
  public posicionEvento: number = 0
  public fecha: string = ""
  public diaVacaciones: string = ""

  public page: number = 1
  public itemsPerPage: number = 7
  
  public vacaciones: Holidays[] = []

  public infoCalendar: DateClickArg
  public infoCalendar2: EventClickArg

  public mostrar: boolean = false
  public mensaje: string = ""
  
  constructor(public servicio: ServiciosService, private apiservice: ApiserviceService) {
    this.servicio.id_employees = Number(JSON.parse(sessionStorage.getItem("id_employees"))) || 1;  
    this.servicio.id_companies = Number(JSON.parse(sessionStorage.getItem("id_companies"))) || 1;
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.servicio.esEmpleado=true //Para iniciar el sidebar de empleado
    this.showModal = false
    this.showModalVacaciones = false
  }

  ngOnInit(): void {
    this.getVacacionesEmp()
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    weekNumbers: true,
    weekNumberFormat: { week: 'numeric'},
    height: "80vh",
    aspectRatio: 3,
    eventContent:this.renderEventContent,
    dateClick: this.modalClick.bind(this),
    eventClick: this.modalBorrar.bind(this)
  };

  calendarEvents= [
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
    this.infoCalendar = clickInfo
  }

  modalBorrar(clickInfo: EventClickArg){
    this.showModalBorrarVacaciones = true;
    this.diaVacaciones = clickInfo.event.startStr
    this.infoCalendar2 = clickInfo
  }

  show(fecha: string){
    this.fecha = fecha
    this.showModal = true;
  }
  
  hide(){ 
    this.showModal = false;
    this.showModalVacaciones = false;
    this.showModalBorrarVacaciones = false
  }
  
  borrarVacaciones(){
    this.hide()

    this.apiservice.deleteVacacionesEmp(this.servicio.id_employees, this.fecha).subscribe((resultado: any)=>{
      if (resultado.codigo == 1){
        this.mensaje=resultado.mensaje
        this.mostrar=true
        setInterval(()=>{this.mostrar=false},3000)
      }
      this.getVacacionesEmp()
    })
  }

  removeVacaciones(fecha: string){
    this.hide()
   
    this.infoCalendar2.event.remove()

    this.apiservice.deleteVacacionesEmp(this.servicio.id_employees, fecha).subscribe((resultado: any)=>{
      if (resultado.codigo == 1){
        this.mensaje=resultado.mensaje
        this.mostrar=true
        setInterval(()=>{this.mostrar=false},3000)
      }
      this.getVacacionesEmp()
    })
  }

  getVacacionesEmp(){
    this.apiservice.getVacacionesEmp(this.servicio.id_employees).subscribe((resultado: Holidays[])=>{
      this.vacaciones = resultado
    this.calendarEvents = []
    for (let i=0; i<this.vacaciones.length; i++){
      let holiday = {
        date: this.vacaciones[i].date,
        display: 'background',
        backgroundColor: '#fafafa',
        imageUrl: '../../../assets/Logo/Hormiga1.png',
      }
      this.calendarEvents.push(holiday)
    }
    this.calendarEvents.sort()
    this.calendarOptions.events = this.calendarEvents
    })
  }

  addVacaciones(dia: string){
    this.calendarEvents.push({date: dia, display: 'background', backgroundColor: '#fafafa',
          imageUrl: '../../../assets/Logo/Hormiga1.png',})

    const apiCalendar = this.infoCalendar.view.calendar

    apiCalendar.addEvent({date: dia, display: 'background', backgroundColor: '#fafafa',
    imageUrl: '../../../assets/Logo/Hormiga1.png',})

    this.apiservice.addVacacionesEmp(this.servicio.id_employees, this.servicio.id_companies, dia).subscribe((resultado: any)=>{
      if (resultado.codigo == 1){
        this.mensaje=resultado.mensaje
        this.mostrar=true
        setInterval(()=>{this.mostrar=false},3000)
      }
    })
    this.hide()
  }

  cerrar(){
    this.mostrar=false
  }
}
