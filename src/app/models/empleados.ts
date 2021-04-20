export class Empleados {
    constructor(
        public id_employees:number,
        public id_companies:number,
        public name:string,
        public surname:string,
        public age:number,
        public position:string,
        public phone:number,
        public shiftMorning:boolean,
        public shiftAfternoon:boolean,
        public shiftEvening:boolean,
        public email:string,
        public password:string,
        public description?:string,
        public picture?:string,
        
    ){}
}
