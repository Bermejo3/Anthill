import { Component } from '@angular/core';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Anthill';

  constructor(public servicio: ServiciosService){
    
  }
}
