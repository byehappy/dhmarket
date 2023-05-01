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
    rating: number;
    votes: number;
    image_url:string;
}

export type states = {
    status:string;
    products:Products[];
    product:Product[];
    curUser: IUser;
    isAuth: boolean
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IUser {
    email: string;
    id: string;
    name: string;
    address: string;
}