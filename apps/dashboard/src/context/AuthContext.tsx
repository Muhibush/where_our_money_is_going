import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { authService, type User, type AuthResponse } from '../services';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Load token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response: AuthResponse = await authService.login({ email, password });
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        // Invalidate queries after login
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
    };

    const register = async (name: string, email: string, password: string) => {
        await authService.register({ name, email, password });
        // After registration, auto-login
        await login(email, password);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Clear all queries on logout
        queryClient.clear();
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
