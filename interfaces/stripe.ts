export interface IStatus{
    status:"true"|"false"
}

export interface ICreateCheckoutSession{
    url:string;
}

export interface IProducts{
    [x:string]:IProduct
}

export interface IProduct{
    desc:string;
    id:string;
    name:string;
    prices:IPriceId[]
}

export interface IPriceId {
    id: string;
    price: number;
    lookup_key: string;
}