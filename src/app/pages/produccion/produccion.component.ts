import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ServiciosService } from 'src/app/shared/servicios.service';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { Productividad } from 'src/app/models/productividad';
import { ProdIndividual } from 'src/app/models/prod-individual';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit {

  public arrayProductividad: Productividad[]

  public produccionEmpleado: ProdIndividual;

  public comparaProduccion: number [];

  public showModal: boolean;

  public data: Array <any>;

  public index: number;

  public isGrande:boolean;

  public mergeOptions = {};

  public page: number = 1
  public itemsPerPage: number = 7

  public formularioAddProductividad: FormGroup
  
  constructor(public servicio: ServiciosService, private _router:Router, private apiservice: ApiserviceService, private formBuilder:FormBuilder) 
  {
    this.comparaProduccion = [];
    this.arrayProductividad = [];
    this.servicio.produccionMes = [];
    this.index = 0
    this.servicio.estaLogueado = true //Para poder mostrar el sidebar y el header
    this.showModal = false;
    this.isGrande = false;
    this.buildForm()
  }

  public buildForm()
   {
     this.formularioAddProductividad = this.formBuilder.group({
       empleado: [, Validators.required],
       productividad:[ , Validators.required],
       horas:[ , Validators.required],
       dia:[ , Validators.required],
      })
   }

   addProductividadForm()
  {
    this.produccionEmpleado = new ProdIndividual(this.servicio.id_employees,this.formularioAddProductividad.get('empleado').value,this.formularioAddProductividad.get('productividad').value, this.formularioAddProductividad.get('horas').value, this.formularioAddProductividad.get('dia').value, this.servicio.id_companies, 0)
    console.log(this.produccionEmpleado)
    this.apiservice.addProductividad(this.produccionEmpleado).subscribe((resultado:any)=>
    {
      console.log(resultado)
    })
    this._router.navigate(['produccion/empleado'])
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
    this.apiservice.getProductividad(this.servicio.id_companies).subscribe((resultado:Productividad[])=>
    {
      this.arrayProductividad = resultado;

      console.log(this.arrayProductividad)
      this.masProductivo()
      this.masHoras();
    })
  }

  getProdIndividual(i:number)
  {
    this.servicio.id_employees = this.arrayProductividad[i].id_employees; 
    this._router.navigate(['produccion/empleado'])
    
  }

  masProductivo()
  {

    let resultado:number = 0;
    let guardar: number;

    for(let i=0; i<this.arrayProductividad.length; i++)
    {
      this.comparaProduccion.push(this.arrayProductividad[i].sum_productivity/this.arrayProductividad[i].sum_hours);

      if(this.comparaProduccion[i] > resultado)
      {
        resultado = this.comparaProduccion[i];
        guardar = i;
      }
    }
    this.arrayProductividad[guardar].esHormiga = true;
    
    for(let i=0; i<this.arrayProductividad.length; i++)
    {
      this.comparaProduccion.push(this.arrayProductividad[i].sum_productivity/this.arrayProductividad[i].sum_hours);

      if(this.comparaProduccion[i] < resultado)
      {
        resultado = this.comparaProduccion[i];
        guardar = i;
      }
    }
    this.arrayProductividad[guardar].esVago= true;
  }

  masHoras()
  {

    let resultado:number = 0;
    let guardar: number;

    for(let i=0; i<this.arrayProductividad.length; i++)
    {
      this.arrayProductividad[i].sum_hours

      if(this.arrayProductividad[i].sum_hours > resultado)
      {
        resultado = this.arrayProductividad[i].sum_hours;
        guardar = i;
      }
    }
    this.arrayProductividad[guardar].masHoras = true;

    for(let i=0; i<this.arrayProductividad.length; i++)
    {
      this.arrayProductividad[i].sum_hours

      if(this.arrayProductividad[i].sum_hours < resultado)
      {
        resultado = this.arrayProductividad[i].sum_hours;
        guardar = i;
      }
    }
    this.arrayProductividad[guardar].menosHoras = true;
  }
  
  addProductividad(nombre:string,productividad:number, horas:number, dia:string)
  {
    this.produccionEmpleado = new ProdIndividual(this.servicio.id_employees,nombre,productividad, horas, dia, this.servicio.id_companies, 0)
    this.apiservice.addProductividad(this.produccionEmpleado).subscribe((resultado:ProdIndividual)=>
    {
      this.produccionEmpleado = resultado;
    
    })
    this._router.navigate(['produccion/empleado'])
  }

  verEmpleado(i:number)
  {
    this.servicio.nombreEmpleado = this.data[i].empleado

    this.index = i;

    this._router.navigate(['produccion/empleado'])
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


