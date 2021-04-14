export class Empleados {
    constructor(
        public id_employees:number,
        public id_companies:number,
        public name:string,
        public surname:string,
        public age:number,
        public position:string,
        public phone:number,
        public email:string,
        public password:string,
        public descrimption?:string,
        public picture?:string,
        public shiftMorning?:string,
        public shiftAfternoon?:string,
        public shiftEvening?:string,
    ){}
}
