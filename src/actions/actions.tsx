import {AuthResponse, IUser, Product, Products} from "../interfaces/BasicInterface";
import AuthService from "../services/AuthServices";
import axios from "axios";
import {API_URL} from "../http";

export const productFetched = (product:Product)=>{
    return{
        type:'Product_Fetched',
        payload: product
    }
}

export const productsFetched = (products:Products) =>{
    return{
        type:'Products_Fetched',
        products:products
    }
}
export const setAuth = (bool: boolean) => {
    return {
        type: 'SET_AUTH',
        payload: bool
    }
}
export const loginUser = (user: IUser) => {
    return {
        type: 'USER_FETCHED',
        payload: user
    }
}

export const logout = async () => {
    try {
        const {logout} = AuthService()
        await logout()
        localStorage.removeItem('token')
    } catch (e:any) {
        console.log(e.response?.data?.message)
    }
}

export const checkAuth = async () => {
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.accessToken)
        return response
    } catch (e:any) {
        console.log(e.response?.data?.message)
    }
}
