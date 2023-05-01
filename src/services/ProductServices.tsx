import $api from "../http";
import {AxiosResponse} from 'axios'
import {Product,Products} from "../interfaces/BasicInterface";

const ProductsService =() =>{
        const getProducts = async(): Promise<AxiosResponse<Products>> =>{
            return $api.get<Products>('/products/top')
        }

        return {getProducts}
}

export default ProductsService;