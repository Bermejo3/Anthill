import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ServiciosService } from 'src/shared/servicios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit {

  chartOptions: NgxEchartsModule = {
    color: ["#ff9100"],
    title: 
    {
      textStyle:{color:'#ffffff'},
      text: 'Productividad',
    },
    textStyle: 
    {
      color: '#ffffff'
    },
    tooltip: 
    {
      trigger: 'axis',
      axisPointer: 
      {
          type: 'cross',
          label: 
          {
            backgroundColor: '#6a7985'
          }
      }
    },
    legend: { 
      textStyle:{color:'#ffffff'},
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {   
            name: 'Productividad Total',
            type: 'line',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        }
  ]}

  public showModal: boolean;

  public data: Array <any>;

  public index: number;
  
  constructor(public servicio: ServiciosService, private _router:Router) 
  {
    this.index = 0
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.showModal = false;
    this.data = [
      { empleado: 'John', productividad: '250', horas: '35' },
      { empleado: 'Michael', productividad: '789', horas: '39' },
      { empleado: 'Fernando', productividad: '234', horas: '45' },
      { empleado: 'Tania', productividad: '435', horas: '47' }
    ];
  }

  verEmpleado(i:number)
  {
    this.servicio.nombreEmpleado = this.data[i].empleado

    this.index = i;

    this._router.navigate(['produccion-empleado'])
  }

  nuevoDato(nombre:string,productividad:number, horas:number, dia:string)
  {
    this.hide();
    this.servicio.nombreEmpleado = nombre;
    this.servicio.produccionEmpleado = productividad;
    this.servicio.horasEmpleado = horas;
    this.servicio.diaTrabajado = dia;

    this._router.navigate(['produccion-empleado'])

  }

  actualizarTotal(productividad:number, horas:number)
  {
    this.servicio.produccionEmpleado += productividad;
    this.servicio.horasEmpleado += horas;
  }

  show(){
    this.showModal = true;
  }  
  hide(){ 
    this.showModal = false;
  }

  ngOnInit(): void {
  }

}
