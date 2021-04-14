import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ProdIndividual } from 'src/app/models/prod-individual';
import { Productividad } from 'src/app/models/productividad';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-produccion-empleado',
  templateUrl: './produccion-empleado.component.html',
  styleUrls: ['./produccion-empleado.component.css']
})
export class ProduccionEmpleadoComponent implements OnInit {

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
            name: 'Productividad Empresa',
            type: 'line',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: []
        },
        { 
          color: ["#00ffff"],
          name: 'Empleado',
          type: 'line',
          areaStyle: {},
          emphasis: {
              focus: 'series'
          },
          data: []
        }
  ]}

  public produccionEmpleados: ProdIndividual [];
  public produccionEmpleado: ProdIndividual;

  public arrayProductividad: Productividad[];

  public showModal:boolean;

  public mergeOptions = {}

  public data: Array<any>;

  constructor(public servicio: ServiciosService, public apiservice: ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    
    this.showModal=false;

    this.servicio.produccionMes=[];
    this.servicio.produccionMesEmpleado=[];

    this.data = [
      { empleado: 'John', productividad: '250', horas: '35' },
      { empleado: 'Michael', productividad: '789', horas: '39' },
      { empleado: 'Fernando', productividad: '234', horas: '45' },
      { empleado: 'Tania', productividad: '435', horas: '47' }
    ];
  }

  getProductividad()
  {
    this.apiservice.getProductividad(this.servicio.id_companies).subscribe((resultado:Productividad[])=>{this.arrayProductividad = resultado})
  }

  getProdIndividual()
  {
    this.apiservice.getProdIndividual(this.servicio.id_employees, this.servicio.id_companies).subscribe((resultado: ProdIndividual[]) =>
    {
      this.produccionEmpleados = resultado;
    })
    
  }
  ProdIndiMes()
  {
    this.getProductMes();
    this.apiservice.ProdIndiMes(this.servicio.id_employees, this.servicio.id_companies).subscribe((resultado:any[])=>
    {
      for(let i=0; i<resultado.length; i++)
      {
        this.servicio.produccionMesEmpleado.push(resultado[i].sum_productivity);

        this.mergeOptions = {
					series: [
            {
              name: 'Productividad Media',
              type: 'line',
              areaStyle: {},
              emphasis: {
                  focus: 'series'
              },
              data: this.servicio.produccionMes
            },
            { 
              color: ["#00ffff"],
              name: 'Empleado',
              type: 'line',
              areaStyle: {},
              emphasis: {
                  focus: 'series'
              },
              data: this.servicio.produccionMesEmpleado
            }
          ]
				};
      }
    })
  }
  getProductMes()
  {
    this.apiservice.getProductMes(this.servicio.id_companies).subscribe((resultado: any[])=>
    {
      for(let i=0; i<resultado.length; i++)
      {
        this.servicio.produccionMes.push(resultado[i].sum_productivity/2);
      }
    })
  }
  addProductividad(nombre:string,productividad:number, horas:number, dia:string)
  {
    this.produccionEmpleado = new ProdIndividual(this.servicio.id_employees,nombre,productividad, horas, dia, this.servicio.id_companies)
    this.apiservice.addProductividad(this.produccionEmpleado).subscribe((resultado:ProdIndividual)=>
    {
      this.produccionEmpleado = resultado;
    })
    this.getProdIndividual();
    this.hide();

  }

  nuevoDato(nombre:string,productividad:number, horas:number, dia:string)
  {
    this.hide();
    this.servicio.nombreEmpleado = nombre;
    this.servicio.produccionEmpleado = productividad;
    this.servicio.horasEmpleado = horas;
    this.servicio.diaTrabajado = dia;

  }

  show(){
    this.showModal = true;
  }  
  hide(){ 
    this.showModal = false;
  }
  ngOnInit(): void 
  {
    this.getProdIndividual()
    this.getProductividad()
    this.ProdIndiMes()
  }

}
