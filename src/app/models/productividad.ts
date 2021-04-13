export class Productividad {

    public name:string;
    public sum_productivity:number;
    public sum_hours: number;

    constructor(name:string, sum_productivity:number, sum_hours:number)
    {
        this.name=name;
        this.sum_productivity=sum_productivity;
        this.sum_hours=sum_hours;
    }
}
