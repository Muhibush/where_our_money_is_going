import { useAuth } from '../context/AuthContext';
import { useTransactions } from '../hooks';
import type { Transaction } from '../services';

// Helper to group transactions by date
function groupByDate(transactions: Transaction[]): Map<string, Transaction[]> {
    const groups = new Map<string, Transaction[]>();
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    for (const t of transactions) {
        const date = new Date(t.date).toDateString();
        let label = date;
        if (date === today) label = 'Today';
        else if (date === yesterday) label = 'Yesterday';
        else label = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        if (!groups.has(label)) groups.set(label, []);
        groups.get(label)!.push(t);
    }
    return groups;
}

// Category icon mapping
const categoryIcons: Record<string, string> = {
    Groceries: 'shopping_cart',
    Rent: 'house',
    Transport: 'directions_car',
    Dining: 'restaurant',
    Utilities: 'bolt',
    Fun: 'sentiment_satisfied',
    Health: 'medical_services',
    Shopping: 'shopping_bag',
    Food: 'restaurant',
    Coffee: 'coffee',
    Salary: 'account_balance_wallet',
    Income: 'account_balance_wallet',
    default: 'payments',
};

function getIcon(category: string): string {
    return categoryIcons[category] || categoryIcons.default;
}

export default function HistoryPage() {
    const { token } = useAuth();
    const { data: transactions = [], isLoading, error } = useTransactions(token);

    const groupedTransactions = groupByDate(transactions);

    return (
        <div className="flex flex-col w-full pb-24">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 px-4 pt-6 pb-4">
                <div className="flex items-center justify-between">
                    <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white group">
                        <span className="material-symbols-outlined text-[28px]">search</span>
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Transactions</h1>
                    <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white group">
                        <span className="material-symbols-outlined text-[28px]">bar_chart</span>
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <main className="flex flex-col w-full">
                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">Loading transactions...</p>
                    </div>
                )}

                {error && (
                    <div className="mx-4 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error instanceof Error ? error.message : 'An error occurred'}
                    </div>
                )}

                {!isLoading && transactions.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <span className="material-symbols-outlined text-6xl mb-4">receipt_long</span>
                        <p>No transactions yet</p>
                    </div>
                )}

                {Array.from(groupedTransactions.entries()).map(([dateLabel, items], idx) => {
                    const total = items.reduce((sum, t) => sum + (t.type === 'Income' ? t.amount : -t.amount), 0);
                    return (
                        <div key={dateLabel} className="flex flex-col">
                            {idx > 0 && <div className="h-px bg-gray-100 dark:bg-white/5 mx-5 my-1"></div>}
                            <div className="sticky top-[72px] z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-5 py-3 flex items-center justify-between">
                                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">{dateLabel}</h3>
                                <span className={`text-xs font-medium ${total >= 0 ? 'text-primary-dark dark:text-primary' : 'text-secondary-orange'}`}>
                                    {total >= 0 ? '+' : ''}{total.toFixed(2)}
                                </span>
                            </div>
                            {items.map((t) => (
                                <div key={t.id} className="group flex items-center gap-4 px-5 py-4 cursor-pointer active:bg-gray-50 dark:active:bg-white/5 transition-colors">
                                    <div className={`flex items-center justify-center rounded-2xl shrink-0 size-12 ${t.type === 'Income' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary'}`}>
                                        <span className="material-symbols-outlined text-[24px]">{getIcon(t.category)}</span>
                                    </div>
                                    <div className="flex flex-col flex-1 justify-center min-w-0">
                                        <p className="text-gray-900 dark:text-white text-base font-bold leading-tight truncate">{t.category}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-1 truncate">
                                            {new Date(t.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} • {t.payment_method || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className={`text-base font-bold tracking-tight ${t.type === 'Income' ? 'text-primary-dark dark:text-primary' : 'text-secondary-orange'}`}>
                                            {t.type === 'Income' ? '+' : '-'}${t.amount.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </main>
        </div>
    );
}
