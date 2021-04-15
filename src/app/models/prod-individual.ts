export class ProdIndividual {
    public id_employees:number = 0;
    public name: string = "";
    public productivity: number = 0;
    public hours: number = 0;
    public date: string = "";
    public id_companies:number=0;
    public id_productivity:number = 0;

    constructor(id_employees:number, name:string, productivity:number, hours:number, date:string, id_companies:number, id_productivity:number)
    {
        this.id_employees=id_employees;
        this.name = name;
        this.productivity=productivity;
        this.hours = hours;
        this.date=date;
        this.id_companies = id_companies;
        this.id_productivity= id_productivity;
    }
}
