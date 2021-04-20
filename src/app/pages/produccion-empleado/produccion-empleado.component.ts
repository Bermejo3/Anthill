import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { Empleados } from 'src/app/models/empleados';
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
            name: 'Producción Empresa',
            type: 'line',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: []
        },
        { 
          color: ["#54e346"],
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
  public miEmpleado:Empleados;

  public nombreEmpleado:string;
  public productEmpleado:number;
  public horasEmpleado:number;
  public fechaEmpleado:string;

  public id_productivity:number;

  public arrayProductividad: Productividad[];

  public showModal:boolean;
  public showModal2:boolean;
  public showModal3:boolean;

  public page: number = 1
  public itemsPerPage: number = 5

  public mergeOptions = {}

  public misEmpleados:number;

  public data: Array<any>;

  public posicionTabla:number;

  public mensaje:string;
  public mostrar:boolean=false

  public isGrande:boolean;

  constructor(public servicio: ServiciosService, public apiservice: ApiserviceService) {
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    
    this.nombreEmpleado="";
    this.productEmpleado=0;
    this.horasEmpleado=0;
    this.fechaEmpleado="";

    this.showModal=false;
    this.showModal2 = false;
    this.showModal3=false;
    this.isGrande=false;

    this.id_productivity=0;
    this.servicio.numeroEmpleados=[];
    this.servicio.produccionMes=[];
    this.servicio.produccionMesEmpleado=[];
    this.misEmpleados=0;



    this.posicionTabla=0;
    this.mensaje = "";
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
    this.apiservice.getEmpleadoInd(this.servicio.id_companies).subscribe((resultado:any)=>
    {
      
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
    this.apiservice.addProductividad(this.produccionEmpleado).subscribe((resultado:any)=>
    {
      if (resultado.codigo == 1){
        this.mensaje=resultado.mensaje
        this.mostrar=true
        setInterval(()=>{this.mostrar=false},3000)
      }

    })
    this.getProdIndividual();
    this.hide();

  }

  updateProductividad(nombre:string,productividad:number, horas:number,dia:string)
  {
  
    // this.id_productivity = this.produccionEmpleados[this.posicionTabla].id_productivity;
    
    
    this.apiservice.updateProductividad(new ProdIndividual(this.servicio.id_employees,nombre,productividad, horas, dia, this.servicio.id_companies, this.id_productivity)).subscribe(
      (resultado:any)=>
      {
        if (resultado.codigo == 1){
          this.mensaje=resultado.mensaje
          this.mostrar=true
          setInterval(()=>{this.mostrar=false},3000)
        }
        this.getProdIndividual()
        this.hide()
      }
  
    )
  }

  deleteProductividad()
  {
    // this.id_productivity = this.produccionEmpleados[this.posicionTabla].id_productivity;
  
    this.apiservice.deleteProductividad(this.id_productivity).subscribe((resultado:any) =>
    {
      if (resultado.codigo == 1){
        this.mensaje=resultado.mensaje
        this.mostrar=true
        setInterval(()=>{this.mostrar=false},3000)
      }
      this.getProdIndividual()
      this.hide()
    })
  }

  cambiarTamanyo()
  {
    if(this.isGrande == false)
    {
      document.getElementById("miGrafica").style.height = "500px"
      document.getElementById("tablita").style.display = "none";
      this.isGrande = true;
    }
    else
    {
      document.getElementById("miGrafica").style.height = "180px"
      document.getElementById("tablita").style.display = "block"
      this.isGrande = false;
    }
    
  }

  show(){
    this.showModal = true;
  }
  show2(id_productivity:number, nombre:string, productividad:number, horas:number, fecha:string)
  {
    this.showModal2=true;
    this.id_productivity = id_productivity;
    this.nombreEmpleado=nombre;
    this.productEmpleado=productividad;
    this.horasEmpleado = horas;
    this.fechaEmpleado = fecha;
  }
  showSure(id_productivity:number){
    this.showModal3 = true;
    this.id_productivity = id_productivity;
  }
  hide(){ 
    this.showModal = false;
    this.showModal2=false;
    this.showModal3=false;
  }
  cerrar(){
    this.mostrar=false
  }
  ngOnInit(): void 
  {
    this.getProdIndividual()
    this.getProductividad()
    this.getEmpleados()
    this.ProdIndiMes()

    
  }

}
