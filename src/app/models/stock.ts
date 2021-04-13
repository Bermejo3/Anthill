export class Stock {
    constructor(
        public id_stock:number,
        public id_companies:number,
        public name:string,
        public type:string,
        public quantity:number,
        public unit:string,
        public date:string,
        public place:string,
        public minQuantity:number,
        public picture?:string
        ){}
}
