import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { Empleados } from 'src/app/models/empleados';
import { ProdIndividual } from 'src/app/models/prod-individual';
import { Productividad } from 'src/app/models/productividad';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { ServiciosService } from 'src/app/shared/servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public produccionEmpleadosBackUp: ProdIndividual[];
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
  public posicion:number;

  public data: Array<any>;

  public posicionTabla:number;

  public mensaje:string;
  public mostrar:boolean=false

  public isGrande:boolean;

  public formularioAddProductividad: FormGroup
  public formularioEditProductividad: FormGroup

  public searchText: string=""

  constructor(public servicio: ServiciosService, public apiservice: ApiserviceService, private formBuilder:FormBuilder) {
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
    this.produccionEmpleadosBackUp = [];

    this.posicionTabla=0;
    this.mensaje = "";
    this.posicion=0;

    this.buildForm()
    this.buildFormEdit()
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
      if (resultado.codigo == 1){
        this.mensaje=resultado.mensaje
        this.mostrar=true
        setInterval(()=>{this.mostrar=false},3000)
      }

      this.getProdIndividual();
      this.hide();

    })
  }

  public buildFormEdit()
  {
    this.formularioEditProductividad = this.formBuilder.group({
      empleado: [this.nombreEmpleado, Validators.required],
      productividad:[this.productEmpleado , Validators.required],
      horas:[this.horasEmpleado , Validators.required],
      dia:[ this.fechaEmpleado, Validators.required],
     })
  }

  updateProductividadForm()
  {
    this.apiservice.updateProductividad(new ProdIndividual(this.servicio.id_employees,this.formularioEditProductividad.get('empleado').value,this.formularioEditProductividad.get('productividad').value, this.formularioEditProductividad.get('horas').value, this.formularioEditProductividad.get('dia').value, this.servicio.id_companies, this.id_productivity)).subscribe(
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
      // for(let i=0; i<resultado.length; i++)
      // {
      //   resultado[i].date
      // }
      this.produccionEmpleados = resultado;
      this.produccionEmpleadosBackUp = resultado;

      console.log(this.produccionEmpleados)
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
          xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
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
  // addProductividad(nombre:string,productividad:number, horas:number, dia:string)
  // {
  //   this.produccionEmpleado = new ProdIndividual(this.servicio.id_employees,nombre,productividad, horas, dia, this.servicio.id_companies, this.id_productivity)
  //   this.apiservice.addProductividad(this.produccionEmpleado).subscribe((resultado:any)=>
  //   {
  //     if (resultado.codigo == 1){
  //       this.mensaje=resultado.mensaje
  //       this.mostrar=true
  //       setInterval(()=>{this.mostrar=false},3000)
  //     }

  //   })
  //   this.getProdIndividual();
  //   this.hide();

  // }

  // updateProductividad(nombre:string,productividad:number, horas:number,dia:string)
  // {
  
  //   // this.id_productivity = this.produccionEmpleados[this.posicionTabla].id_productivity;
    
    
  //   this.apiservice.updateProductividad(new ProdIndividual(this.servicio.id_employees,nombre,productividad, horas, dia, this.servicio.id_companies, this.id_productivity)).subscribe(
  //     (resultado:any)=>
  //     {
  //       if (resultado.codigo == 1){
  //         this.mensaje=resultado.mensaje
  //         this.mostrar=true
  //         setInterval(()=>{this.mostrar=false},3000)
  //       }
  //       this.getProdIndividual()
  //       this.hide()
  //     }
  
  //   )
  // }

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
  mesDerecha()
  {
    this.posicion+=1;
    if(this.posicion == 12)
    {
      this.posicion = 0;
    }
    this.verPorMes()
  }
  mesIzquierda()
  {
    this.posicion-=1;
    if(this.posicion == -1)
    {
      this.posicion = 11;
    }
    this.verPorMes()
  }
  verPorAnyo()
  {
    this.produccionEmpleados = this.produccionEmpleadosBackUp;
    this.ProdIndiMes()
  }
  verPorMes()
  {
    let meses = ["-01-", "-02-", "-03-", "-04-", "-05-", "-06-", "-07-", "-08-", "-09-", "-10-", "-11-", "-12-"];

    this.produccionEmpleados = this.produccionEmpleadosBackUp.filter(nuevoArray => nuevoArray.date.includes(meses[this.posicion]));
    
    this.graficaMes()
  }

  graficaMes()
  {
    let meses = ["-01-", "-02-", "-03-", "-04-", "-05-", "-06-", "-07-", "-08-", "-09-", "-10-", "-11-", "-12-"];
    let dias = []
    let produccion = []
    
    this.produccionEmpleados = this.produccionEmpleadosBackUp.filter(nuevoArray => nuevoArray.date.includes(meses[this.posicion]));
    for(let i=0; i<this.produccionEmpleados.length; i++)
    {
      dias.push(this.produccionEmpleados[i].date.slice(0,10));
      produccion.push(this.produccionEmpleados[i].productivity);
      
    }
    this.mergeOptions = {
      xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: dias
        }
      ],
      series: [
        {
          name: '',
          type: 'line',
          areaStyle: {},
          emphasis: {
              focus: 'series'
          },
          data: 0
        },
        { 
          color: ["#54e346"],
          name: 'Empleado',
          type: 'line',
          areaStyle: {},
          emphasis: {
              focus: 'series'
          },
          data: produccion
        }
      ]
    };
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
    this.buildFormEdit()

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

    filter(){
    if (this.searchText==""){
      this.produccionEmpleados= this.produccionEmpleadosBackUp
    }
    else{
      this.produccionEmpleados = this.produccionEmpleadosBackUp.filter(newArray =>
        newArray.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
        newArray.date.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
        newArray.hours == Number(this.searchText) ||
        newArray.productivity == Number(this.searchText)
        )
    }
  }
}
