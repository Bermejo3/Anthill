export class Productividad {

    public id_employees:number;
    public name:string;
    public sum_productivity:number;
    public sum_hours: number;
    public esHormiga: boolean;
    public esVago: boolean;
    public masHoras:boolean;
    public menosHoras:boolean;

    constructor(id_employees:number, name:string, sum_productivity:number, sum_hours:number)
    {
        this.id_employees=id_employees;
        this.name=name;
        this.sum_productivity=sum_productivity;
        this.sum_hours=sum_hours;
        this.esHormiga =false;
        this.esVago=false;
        this.masHoras=false;
        this.menosHoras=false;
    }
}
