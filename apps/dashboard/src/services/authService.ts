import { apiClient } from './apiClient';

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const authService = {
    register: (data: RegisterRequest) =>
        apiClient.post<{ id: number }>('/auth/register', data),

    login: (data: LoginRequest) =>
        apiClient.post<AuthResponse>('/auth/login', data),
};
