import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ServiciosService } from 'src/app/shared/servicios.service';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { Productividad } from 'src/app/models/productividad';
import { ProdIndividual } from 'src/app/models/prod-individual';


@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit {

  public arrayProductividad: Productividad[]

  public produccionEmpleado: ProdIndividual;

  public showModal: boolean;

  public data: Array <any>;

  public index: number;

  public mergeOptions = {};
  
  constructor(public servicio: ServiciosService, private _router:Router, private apiservice: ApiserviceService) 
  {
    this.servicio.produccionMes = [];
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

  getProductMes()
  {
    this.apiservice.getProductMes(this.servicio.id_companies).subscribe((resultado: any[])=>
    {
      for(let i=0; i<resultado.length; i++)
      {
        this.servicio.produccionMes.push(resultado[i].sum_productivity);

        this.mergeOptions = {
					series: [
            {
              name: 'Productividad Total',
              type: 'line',
              areaStyle: {},
              emphasis: {
                  focus: 'series'
              },
              data: this.servicio.produccionMes
            }
          ]
				};
      }
    })
  }
  

  getProductividad()
  {
    this.apiservice.getProductividad(this.servicio.id_companies).subscribe((resultado:Productividad[])=>{this.arrayProductividad = resultado})
  }

  getProdIndividual(i:number)
  {
    this.apiservice.getProdIndividual(i, this.servicio.id_companies).subscribe((resultado: ProdIndividual) =>
    {
      this.produccionEmpleado = resultado;
      this.index = i;
      this._router.navigate(['produccion-empleado'])
    })
  }
  
  addProductividad(nombre:string,productividad:number, horas:number, dia:string)
  {
    this.produccionEmpleado = new ProdIndividual(this.servicio.id_employees,nombre,productividad, horas, dia, this.servicio.id_companies)
    this.apiservice.addProductividad(this.produccionEmpleado).subscribe((resultado:ProdIndividual)=>
    {
      this.produccionEmpleado = resultado;
    })
    this._router.navigate(['produccion-empleado'])
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

  ngOnInit(): void 
  {
    this.getProductividad()
    this.getProductMes()
  }


  ChartOptions: NgxEchartsModule = {
    color: ["#54e346"],
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
            data: []
        }
  ]}

}


