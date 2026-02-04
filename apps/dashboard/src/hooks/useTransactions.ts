import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService, type CreateTransactionRequest } from '../services';

export const transactionKeys = {
    all: ['transactions'] as const,
    detail: (id: number) => ['transactions', id] as const,
};

export function useTransactions(token: string | null) {
    return useQuery({
        queryKey: transactionKeys.all,
        queryFn: () => transactionService.getAll(token!),
        enabled: !!token,
    });
}

export function useCreateTransaction(token: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTransactionRequest) => transactionService.create(token!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: transactionKeys.all });
        },
    });
}

export function useDeleteTransaction(token: string | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => transactionService.delete(token!, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: transactionKeys.all });
        },
    });
}
