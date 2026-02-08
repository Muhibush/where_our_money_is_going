const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiClient = {
    async get<T>(endpoint: string, token?: string): Promise<T> {
        const headers: HeadersInit = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_BASE}${endpoint}`, { headers });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || `Failed to GET ${endpoint}`);
        }
        return res.json();
    },

    async post<T>(endpoint: string, data: unknown, token?: string): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || `Failed to POST ${endpoint}`);
        }
        return res.json();
    },

    async delete(endpoint: string, token: string): Promise<void> {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || `Failed to DELETE ${endpoint}`);
        }
    },
};
