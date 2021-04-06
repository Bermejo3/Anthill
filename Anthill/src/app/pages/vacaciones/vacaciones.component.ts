import { Component, OnInit,  } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';


@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})
export class VacacionesComponent implements OnInit {

  showModal: boolean
  title = 'ngularfullcalendarbootstrap';
  name:string = ""
  date:string = ""

  constructor() {
    this.showModal = false
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    weekNumbers: true,
    weekNumberFormat: { week: 'numeric'},
    height: "80vh",
    eventContent:this.renderEventContent,
    eventClick: this.modalClick
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
    this.showModal = true;
    alert('asda'+ this.name + this.date + this.showModal )
  }

  modalClick(clickInfo: EventClickArg){
    this.name = clickInfo.event.title;  
    this.date = clickInfo.event.startStr;
    this.showModal = true;
    alert('asda'+ this.name + this.date + this.showModal )
  }

  
  hide(){ 
    this.showModal = false;
  }

}
