
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
  }
  ver()
  {
    this.oculto=!this.oculto;
    this.isHidden=true
  }

  ngOnInit(): void {
  }

}
