import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { Empleados } from 'src/app/models/empleados';
import { Holidays } from 'src/app/models/holidays';
import { ProdIndividual } from 'src/app/models/prod-individual';
import { Productividad } from 'src/app/models/productividad';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';

@Component({
  selector: 'app-empleado-mi-perfil',
  templateUrl: './empleado-mi-perfil.component.html',
  styleUrls: ['./empleado-mi-perfil.component.css']
})
export class EmpleadoMiPerfilComponent implements OnInit {

  chartOptions: NgxEchartsModule = {
    color: ["#fff"],
    title: 
    {
      textStyle:{color:'#ffffff'},
      text: 'Producción',
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
            name: 'Producción Media',
            type: 'line',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: []
        },
        { 
          color: ["#54e346"],
          name: 'Tú',
          type: 'line',
          areaStyle: {},
          emphasis: {
              focus: 'series'
          },
          data: []
      }
  ]}

  public mergeOptions={};
  public misEmpleados:number;
  public produccionEmpleados: ProdIndividual [];
  public arrayProductividad: Productividad[];
  public unEmpleado: Empleados;
  public vacaciones: Holidays [];

  public page: number = 1
  public itemsPerPage: number = 5

  constructor(public servicio: ServiciosService, public apiservice: ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.servicio.esEmpleado=true //Para iniciar el sidebar de empleado

    this.servicio.numeroEmpleados=[];
    this.servicio.produccionMes=[];
    this.servicio.produccionMesEmpleado=[];
    this.vacaciones=[];
    
    this.arrayProductividad = [];
    this.produccionEmpleados = [];
    this.misEmpleados=0;
    
  }
  getEmpleados()
  {
    this.apiservice.getEmpleados(this.servicio.id_companies).subscribe((resultado:any[]) =>
    {
      for(let i=0; i<resultado.length; i++)
      {
        this.servicio.numeroEmpleados.push(resultado[i].id_employees);

        this.misEmpleados = this.servicio.numeroEmpleados.length;
      }
    })
  }
  getEmpleadoInd()
  {
    this.apiservice.getEmpleadoInd(this.servicio.id_employees).subscribe((resultado:Empleados[])=>
    {
      this.unEmpleado = resultado[0];

      console.log(this.unEmpleado);
    })
  }

  getVacacionesEmp(){
    this.apiservice.getVacacionesEmp(this.servicio.id_employees).subscribe((resultado: Holidays[])=>{
      this.vacaciones = resultado;
    })
  }

  getProductividad()
  {
    this.apiservice.getProductividad(this.servicio.id_companies).subscribe((resultado:Productividad[])=>
    {
      
      this.arrayProductividad = resultado
    })
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
              name: 'Producción Media',
              type: 'line',
              areaStyle: {},
              emphasis: {
                  focus: 'series'
              },
              data: this.servicio.produccionMes
            },
            { 
              color: ["#54e346"],
              name: 'Tú',
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
        this.servicio.produccionMes.push(resultado[i].sum_productivity/this.misEmpleados);
      }
    })
  }

  ngOnInit(): void 
  {
    this.getEmpleados()
    this.getEmpleadoInd()
    this.getVacacionesEmp()
    this.getProdIndividual()
    this.getProductividad()
    this.ProdIndiMes()
    
  }

}
