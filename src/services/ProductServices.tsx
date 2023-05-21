import $api from "../http";
import {AxiosResponse} from 'axios'
import {Products} from "../interfaces/BasicInterface";

const ProductsService =() =>{
        const getProducts = async(): Promise<AxiosResponse<Products>> =>{
            return $api.get<Products>('/products-top')
        }
    const getProductsFromCategory = async (category_name: string | undefined, filters?: object | string): Promise<AxiosResponse<Products>> => {
        let url = `/categories/${category_name}/products`;

        if (filters) {
            const encodedFilters = JSON.stringify(filters);
            url += `?filters=${encodedFilters}`;
        }

        return $api.get<Products>(url);
    };
    return {getProducts,getProductsFromCategory}
}

export default ProductsService;