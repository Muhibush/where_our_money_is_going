import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, type RegisterRequest, type LoginRequest, type AuthResponse } from '../services';

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginRequest) => authService.login(data),
        onSuccess: (response: AuthResponse) => {
            // Store auth data
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            // Invalidate queries that depend on auth
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterRequest) => authService.register(data),
    });
}

export function useLogout() {
    const queryClient = useQueryClient();

    return () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        queryClient.clear();
    };
}
