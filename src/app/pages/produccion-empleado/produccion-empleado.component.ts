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

  public id_productivity:number;

  public arrayProductividad: Productividad[];

  public showModal:boolean;
  public showModal2:boolean;

  public mergeOptions = {}

  public misEmpleados:number;

  public data: Array<any>;

  public posicionTabla:number;

  constructor(public servicio: ServiciosService, public apiservice: ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    
    
    this.showModal=false;
    this.showModal2 = false

    this.id_productivity=0;
    this.servicio.numeroEmpleados=[];
    this.servicio.produccionMes=[];
    this.servicio.produccionMesEmpleado=[];
    this.misEmpleados=0;

    this.posicionTabla=0;
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

  getProductividad()
  {
    this.apiservice.getProductividad(this.servicio.id_companies).subscribe((resultado:Productividad[])=>{this.arrayProductividad = resultado})
  }

  getProdIndividual()
  {
    this.apiservice.getProdIndividual(this.servicio.id_employees, this.servicio.id_companies).subscribe((resultado: ProdIndividual[]) =>
    {
     
      this.produccionEmpleados = resultado;

      console.log(this.produccionEmpleados)
      console.log(resultado)
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
        this.servicio.produccionMes.push(resultado[i].sum_productivity/this.misEmpleados);
      }
    })
  }
  addProductividad(nombre:string,productividad:number, horas:number, dia:string)
  {
    this.produccionEmpleado = new ProdIndividual(this.servicio.id_employees,nombre,productividad, horas, dia, this.servicio.id_companies, this.id_productivity)
    this.apiservice.addProductividad(this.produccionEmpleado).subscribe((resultado:ProdIndividual)=>
    {
      this.produccionEmpleado = resultado;
    })
    this.getProdIndividual();
    this.hide();

  }

  updateProductividad(nombre:string,productividad:number, horas:number,dia:string){
  
    console.log(this.servicio.id_employees, nombre, productividad, horas, dia);
    this.id_productivity = this.produccionEmpleados[this.posicionTabla].id_productivity;
    
    this.apiservice.updateProductividad(new ProdIndividual(this.servicio.id_employees,nombre,productividad, horas, dia, this.servicio.id_companies, this.id_productivity)).subscribe(
      (resultado:ProdIndividual)=>
      {
        this.produccionEmpleado = resultado;
        this.getProdIndividual()
        this.hide()
      }
  
    )
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
  show2(posicionTabla:number)
  {
    this.showModal2=true;
    this.posicionTabla = posicionTabla;
  }
  hide(){ 
    this.showModal = false;
    this.showModal2=false;
  }
  ngOnInit(): void 
  {
    this.getProdIndividual()
    this.getProductividad()
    this.getEmpleados()
    this.ProdIndiMes()

    
  }

}
