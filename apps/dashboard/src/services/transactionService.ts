import { apiClient } from './apiClient';

export interface Transaction {
    id: number;
    user_id: number;
    amount: number;
    type: 'Expense' | 'Income';
    category: string;
    date: string;
    note: string;
    payment_method: string;
    created_at: string;
}

export type CreateTransactionRequest = Omit<Transaction, 'id' | 'user_id' | 'created_at'>;

export const transactionService = {
    getAll: (token: string) =>
        apiClient.get<Transaction[]>('/transactions', token).then(data => data || []),

    create: (token: string, data: CreateTransactionRequest) =>
        apiClient.post<Transaction>('/transactions', data, token),

    delete: (token: string, id: number) =>
        apiClient.delete(`/transactions/${id}`, token),
};
