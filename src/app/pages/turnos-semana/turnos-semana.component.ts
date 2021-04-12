import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-turnos-semana',
  templateUrl: './turnos-semana.component.html',
  styleUrls: ['./turnos-semana.component.css']
})
export class TurnosSemanaComponent implements OnInit {

  public semana: Date[] = []
  public diasSemana: string[] = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"] 

  public arrayEmpleados: string[] = ["Carlos Ocaña", "Manuel Pinto", "Alberto Bermejo", "Ariadna Trapero", "Moli Isa", "Jorge Rodriguez", "Jose Herrera", "Laura Lopex", "Pascual Bolullo"]
  public arrayEmpleadosSeleccionado: string[] = []
  public idCasilla: string = "0"

  constructor(public servicio: ServiciosService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.servicio.showInfo = false

  }

  ngOnInit(): void {

    for (let i=0; i<7; i++){
      let newFecha: Date = new Date(this.servicio.firstDayWeek)
      newFecha.setUTCDate(this.servicio.firstDayWeek.getUTCDate()+i)
      this.semana.push(newFecha)
    }
  }

  clickar(id:any){
    this.idCasilla=id
    this.servicio.showInfo = true
    document.getElementById(this.idCasilla)!.className = "turnoSeleccionado"
  }

  selectEmpleado(empleado: HTMLSelectElement){
    this.arrayEmpleadosSeleccionado.push(empleado.value)
    this.rellenarCasilla()
  }

  quitarSeleccionado(i:number){
    this.arrayEmpleadosSeleccionado.splice(i,1)
    this.rellenarCasilla()
  }

  rellenarCasilla(){
    document.getElementById(this.idCasilla)!.innerHTML = ""
    for (let i=0; i<this.arrayEmpleadosSeleccionado.length;i++){
      document.getElementById(this.idCasilla)!.innerHTML += '<img src="../../../assets/Logo/Hormiga2.png" alt="" width="40px" height="40px">'
    }
    if (this.arrayEmpleadosSeleccionado.length == 0 ){
      document.getElementById(this.idCasilla)!.className = "turnoVacio"
    }
    else if (this.arrayEmpleadosSeleccionado.length < 3 ){
      document.getElementById(this.idCasilla)!.className = "turnoMedias"
    }
    else if (this.arrayEmpleadosSeleccionado.length >= 3){
      document.getElementById(this.idCasilla)!.className = "turnoCompleto"
    }
  }
}
