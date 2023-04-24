export type Product = {
    id?: number;
    name: string;
    description?: string;
    category_id?: number;
    price: number;
    image_url: string;
    quantity_in_stock?: number;
    attributes?: { [key: string]: any };
    rating: number;
    votes: number;
};