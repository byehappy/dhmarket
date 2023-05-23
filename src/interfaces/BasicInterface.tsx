export type Product = {
    id: number;
    name: string;
    description: string;
    category_id?: number;
    price: number;
    image_url: string;
    quantity_in_stock: number;
    attributes: { [key: string]: any };
    rating: number;
    votes: number;
};
export type Products = {
    id: number;
    name:string;
    price:number;
    attributes:object;
    rating: number;
    votes: number;
    image_url:string;
    description:string;
    quantity:number;
}

export type states = {
    status:string;
    products:Products[];
    product:Product[];
    curUser: IUser;
    isAuth: boolean;
    filter:Filter[],
    filters:{},
    isAdmin:boolean
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IUser {
    admin: boolean;
    email: string;
    id: string;
    name: string;
    address: string;
    phone_number:string;
}
export interface Categories{
    category_id:number;
    category_name:string;
}
export interface Filter{
    [key: string]: string[];
}