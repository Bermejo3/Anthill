export class Empresa {
    constructor(
    public id_companies:number,
    public name:string,
    public adress:string,
    public email:string,
    public phone:number, 
    public password:string,
    public confPass:string,
    public picture?:string
    ){}

}

