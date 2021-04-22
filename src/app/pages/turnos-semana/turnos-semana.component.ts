import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/models/turnos';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-turnos-semana',
  templateUrl: './turnos-semana.component.html',
  styleUrls: ['./turnos-semana.component.css']
})
export class TurnosSemanaComponent implements OnInit {

  public semana: Date[] = []
  public semana2: Date[] = [] // Parche para hacer funcionar el getTurnosSemana y los problemas con el formato fecha
  public diasSemana: string[] = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"] 

  public arrayEmpleados: any[] = []
  public arrayEmpleadosSeleccionado: any[] = []
  public idCasilla: string = "0"

  public showInfo: boolean
  public mostrar: boolean = false
  public mensaje: string = ""

  constructor(public servicio: ServiciosService, private apiservice: ApiserviceService) {
    this.servicio.id_employees = Number(JSON.parse(sessionStorage.getItem("id_employees"))) || 1;  
    this.servicio.id_companies = Number(JSON.parse(sessionStorage.getItem("id_companies"))) || 1;
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.showInfo = false
  }

  ngOnInit(): void {

    for (let i=0; i<7; i++){
      let newFecha: Date = new Date(this.servicio.firstDayWeek)
      newFecha.setDate(this.servicio.firstDayWeek.getDate()+i)
      this.semana.push(newFecha)
    }
    for (let i=0; i<8; i++){
      let newFecha2: Date = new Date(this.servicio.firstDayWeek)
      newFecha2.setDate(this.servicio.firstDayWeek.getDate()+i)
      this.semana2.push(newFecha2)
    }
    this.getTurnosSemana()
  }

  hide(){
    this.showInfo = false
    document.getElementById(this.idCasilla)!.classList.remove("turnoSeleccionado")
    this.getTurnosSemana()
  }

  clickar(id:any, id_shift){
    if (this.idCasilla != "0"){
      document.getElementById(this.idCasilla)!.classList.remove("turnoSeleccionado")
    }
    this.idCasilla=id
    this.showInfo = true
    document.getElementById(this.idCasilla)!.classList.add("turnoSeleccionado")

    this.getEmpleadosTurnos() //Para cargar el array del select

    this.getEmpleadosSeleccionado()
  }

  selectEmpleado(i: HTMLSelectElement){
    let id_employees = this.arrayEmpleados[i.value].id_employees
    let id_shifts
    if (this.idCasilla.includes("M")){
      id_shifts = 1
    }
    else if (this.idCasilla.includes("T")){
      id_shifts = 2
    }
    else if (this.idCasilla.includes("N")){
      id_shifts = 3
    }
    let date = this.semana2[Number(this.idCasilla.slice(1,2))+1].toJSON().slice(0,10)
    this.apiservice.postTurnos(this.servicio.id_companies, id_employees, id_shifts, date).subscribe((resultado: any)=>{
      if (resultado.codigo == 1){
        this.mostrarAlerta()
        this.mensaje =resultado.mensaje
      }
      this.getTurnosSemana()
      this.getEmpleadosSeleccionado()
    })
    
  }

  quitarSeleccionado(i:number){
    let id_employees = this.arrayEmpleadosSeleccionado[i].id_employees
    let id_shifts
    if (this.idCasilla.includes("M")){
      id_shifts = 1
    }
    else if (this.idCasilla.includes("T")){
      id_shifts = 2
    }
    else if (this.idCasilla.includes("N")){
      id_shifts = 3
    }
    let date = this.semana2[Number(this.idCasilla.slice(1,2))+1].toJSON().slice(0,10)
    console.log(id_employees)
    console.log(id_shifts)
    console.log(date)
    this.apiservice.deleteTurno(this.servicio.id_companies, id_employees,id_shifts, date).subscribe((resultado: any)=>{
      if (resultado.codigo == 1){
        this.mostrarAlerta()
        this.mensaje =resultado.mensaje
      }
      this.getTurnosSemana()
      this.getEmpleadosSeleccionado()
    })
  }

  getTurnosSemana(){ //Para rellenar la tabla. Primero se reinicia todo a cero para futuros usos. Se recorre la semana y se inicia los contadores para saber como colorear la celda. Luego se busca si coinciden los dias y el turno y se van añadiendo hormigas y pintando la celda.
    this.apiservice.getTurnosSemana(this.servicio.id_companies).subscribe((resultado: Turnos[])=>{
      this.reiniciarHormigas()

      for (let i=0; i<this.semana.length; i++){
        let countM=0
        let countT=0
        let countN=0
        document.getElementById(`M${i}`)!.className = "turnoVacio"
        document.getElementById(`T${i}`)!.className = "turnoVacio"
        document.getElementById(`N${i}`)!.className = "turnoVacio"
        for (let j=0; j<resultado.length; j++){
          if (resultado[j].date == this.semana2[i+1].toJSON().slice(0,10)){
            if (resultado[j].turno == "Mañana"){
              document.getElementById(`M${i}`)!.innerHTML += '<img src="../../../assets/Logo/Hormiga2.png" alt="" width="40px" height="40px">'
              countM++
                if (countM == 0){
                  document.getElementById(`M${i}`)!.className = "turnoVacio"
                }
                else if (countM < 3){
                  document.getElementById(`M${i}`)!.className = "turnoMedias"
                }
                else if (countM == 3){
                  document.getElementById(`M${i}`)!.className = "turnoCompleto"
                }
            }
            else if (resultado[j].turno == "Tarde"){
              document.getElementById(`T${i}`)!.innerHTML += '<img src="../../../assets/Logo/Hormiga2.png" alt="" width="40px" height="40px">'
              countT++
              if (countT == 0){
                document.getElementById(`T${i}`)!.className = "turnoVacio"
              }
              else if (countT < 3){
                document.getElementById(`T${i}`)!.className = "turnoMedias"
              }
              else if (countT == 3){
                document.getElementById(`T${i}`)!.className = "turnoCompleto"
              }
            }
            else{
              document.getElementById(`N${i}`)!.innerHTML += '<img src="../../../assets/Logo/Hormiga2.png" alt="" width="40px" height="40px">'
              countN++
              if (countN == 0){
                document.getElementById(`N${i}`)!.className = "turnoVacio"
              }
              else if (countN < 3){
                document.getElementById(`N${i}`)!.className = "turnoMedias"
              }
              else if (countN == 3){
                document.getElementById(`N${i}`)!.className = "turnoCompleto"
              }
            }
          }
        }
      }
    })
  }

  getEmpleadosTurnos(){ //Permite llenar el array que forma parte del select
    let shiftMorning = 0
    let shiftAfternoon = 0
    let shiftEvening = 0
    let id_shifts
    let date = this.semana2[Number(this.idCasilla.slice(1,2))+1].toJSON().slice(0,10)
    this.arrayEmpleados=[]
    if (this.idCasilla.includes("M")){
      shiftMorning = 1
      id_shifts = 1
      this.apiservice.getTurnosListaEmpleadosMorning(date,  shiftMorning, this.servicio.id_companies, id_shifts, date).subscribe((resultado: any[])=>{
        for (let i=0; i<resultado.length; i++){
          this.arrayEmpleados.push({id_employees: resultado[i].id_employees, name: resultado[i].name, surname: resultado[i].surname})
        }
      })
    }
    else if (this.idCasilla.includes("T")){
      shiftAfternoon = 1
      id_shifts = 2
      this.apiservice.getTurnosListaEmpleadosAfternoon(date,  shiftAfternoon, this.servicio.id_companies, id_shifts, date).subscribe((resultado: any[])=>{
        for (let i=0; i<resultado.length; i++){
          this.arrayEmpleados.push({id_employees: resultado[i].id_employees, name: resultado[i].name, surname: resultado[i].surname})
        }
      })
    }
    else if (this.idCasilla.includes("N")){
      shiftEvening = 1
      id_shifts = 3
      this.apiservice.getTurnosListaEmpleadosEvening(date,  shiftEvening, this.servicio.id_companies, id_shifts, date).subscribe((resultado: any[])=>{
        for (let i=0; i<resultado.length; i++){
          this.arrayEmpleados.push({id_employees: resultado[i].id_employees, name: resultado[i].name, surname: resultado[i].surname})
        }
      })
    }
  }

  reiniciarHormigas(){ //setea todas las celdas sin imagenes
    for (let i=0; i<7; i++){
      document.getElementById(`M${i}`)!.innerHTML = ""
      document.getElementById(`T${i}`)!.innerHTML = ""
      document.getElementById(`N${i}`)!.innerHTML = ""
    }
  }

  getEmpleadosSeleccionado(){ //Llena el array que se muestra en el modal con los empleados que hay en cada casilla de la tabla
    this.apiservice.getTurnosSemana(this.servicio.id_companies).subscribe((resultado: Turnos[])=>{
      let date = this.semana2[Number(this.idCasilla.slice(1,2))+1].toJSON().slice(0,10)
      this.arrayEmpleadosSeleccionado=[]
      let turno
      if (this.idCasilla.includes("M")){
        turno = "Mañana"
      }
      else if (this.idCasilla.includes("T")){
        turno = "Tarde"
      }
      else if (this.idCasilla.includes("N")){
        turno = "Noche"
      }

        for (let j=0; j<resultado.length; j++){
          if ((resultado[j].date == date) && (resultado[j].turno == turno)){
            this.arrayEmpleadosSeleccionado.push({id_employees: resultado[j].id_employees, name: resultado[j].name, surname: resultado[j].surname})
          }
        }  
    })
  }

  cerrar(){
    this.mostrar=false
  }

  mostrarAlerta(){
    this.mostrar=true
    setTimeout(()=>{this.mostrar=false},3000)
  }



}
