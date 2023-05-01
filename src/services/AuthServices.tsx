import $api from "../http";
import {AxiosResponse} from 'axios'
import {AuthResponse} from "../interfaces/BasicInterface";

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

    return {login, registration, logout}
}

export default AuthService
