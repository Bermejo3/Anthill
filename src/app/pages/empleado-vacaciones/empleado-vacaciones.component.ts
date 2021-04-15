import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
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
  public posicionEvento: number = 0
  public diaVacaciones: string = ""

  public vacaciones: Holidays[] = []
  
  constructor(public servicio: ServiciosService, private apiservice: ApiserviceService) {
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




  ngOnInit(): void {
      this.getVacacionesEmp()
  }

  show(i:number){
    this.posicionEvento = i
    this.showModal = true;
  }

  
  hide(){ 
    this.showModal = false;
    this.showModalVacaciones = false;
  }
  
  borrarVacaciones(posicionEvento: number, fecha: string){
    this.hide()
    this.calendarEvents.splice(posicionEvento,1)

    this.apiservice.deleteVacacionesEmp(this.servicio.id_employees, fecha).subscribe((resultado: any)=>{
      if (resultado.codigo == 1){
        console.log(resultado.mensaje)
      }
      this.getVacacionesEmp()
    })
  }

  getVacacionesEmp(){
    this.apiservice.getVacacionesEmp(this.servicio.id_employees).subscribe((resultado: Holidays[])=>{
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

  addVacaciones(dia: string){
    this.calendarEvents.push({date: dia, display: 'background', backgroundColor: '#ff9100',
          imageUrl: '../../../assets/Logo/Hormiga1.png',})

    this.apiservice.addVacacionesEmp(this.servicio.id_employees, dia).subscribe((resultado: any)=>{
      if (resultado.codigo == 1){
        console.log(resultado.mensaje)
      }
    })
    this.hide()
  }
}
