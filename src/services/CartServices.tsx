import { AxiosResponse } from 'axios';
import $api from "../http";

const CartServices = {
    getCartItems: (customerId: string): Promise<AxiosResponse<any>> => {
        return $api.get(`/cart/${customerId}`);
    },

    addToCart: (customerId: string, productId: number | string | undefined): Promise<AxiosResponse<any>> => {
        return $api.post(`/cart/${customerId}/${productId}`);
    },

    updateCartItemQuantity: (customerId: string, productId: number, quantity: number): Promise<AxiosResponse<any>> => {
        return $api.put(`/cart/${customerId}/${productId}`, { quantity });
    },

    removeFromCart: (customerId: string, productId: number): Promise<AxiosResponse<any>> => {
        return $api.delete(`/cart/${customerId}/${productId}`);
    },
    clearCart: (customerId: string): Promise<AxiosResponse<any>> => {
        return $api.delete(`/cart/${customerId}`);
    },
};

export default CartServices;
