
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/shared/servicios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public isHidden: boolean = true;
  public oculto:boolean=true;

  constructor(public servicio:ServiciosService) 
  { 

  }

  mostrar()
  {
    this.isHidden=!this.isHidden;
    this.oculto=true
    document.getElementById('sidebar')!.classList.remove('sidebarContracted')
    this.servicio.estaOculto = true
  }

  ver()
  {
    this.oculto=!this.oculto;
    this.isHidden=true
    document.getElementById('sidebar')!.classList.remove('sidebarContracted')
    this.servicio.estaOculto = true
  }

  mostrarBarra()
  {
    if (this.servicio.estaOculto == true){
      this.servicio.estaOculto = false
    }
    else if (this.servicio.estaOculto == false){
      this.servicio.estaOculto = true
    }
    this.isHidden=true
    this.oculto=true

    document.getElementById('sidebar')!.classList.toggle('sidebarContracted')
  }

  ngOnInit(): void {
  }

}
