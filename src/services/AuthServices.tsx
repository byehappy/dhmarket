import $api from "../http";
import {AxiosResponse} from 'axios'
import {AuthResponse, IUser} from "../interfaces/BasicInterface";

const AuthService = () => {
    const login = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
        return $api.post<AuthResponse>('/login', {email, password})
    }

    const registration = async (
        name: string,
        email: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> => {
        return $api.post<AuthResponse>('/registration', {email, password, name})
    }
    const logout = async (): Promise<void> => {
        return $api.post('/logout')
    }
    const profile = async (id: string | undefined): Promise<AxiosResponse<IUser>> =>{
        return $api.get<IUser>(`/users/${id}`)
    }
    const updateProfile = async (id: string | undefined, data: Partial<IUser>): Promise<AxiosResponse<IUser>> => {
        return $api.put<IUser>(`/users/${id}`, data);
    }
    const resetPassword = async (
        resetToken: string | undefined,
        password: string
    ): Promise<AxiosResponse<AuthResponse>> => {
        return $api.post<AuthResponse>(`/reset-password/${resetToken}`, {
            password,
        });
    };
    const sendReset = async (
        email:string
    ): Promise<AxiosResponse<AuthResponse>> => {
        return $api.post<AuthResponse>(`/forgot-password/`, {
            email,
        });
    };
    const takeVKLogin = async (id: string): Promise<AxiosResponse<any>> => {
        return $api.get<any>(`/vk-auth/${id}`)
    }


    return {login, registration, logout,profile,updateProfile,resetPassword,sendReset,takeVKLogin}
}

export default AuthService
