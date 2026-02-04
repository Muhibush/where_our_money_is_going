import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCreateTransaction } from '../hooks';

interface AddTransactionProps {
    onClose: () => void;
    onSave?: () => void;
}

const categories = [
    { name: 'Groceries', icon: 'shopping_cart' },
    { name: 'Rent', icon: 'house' },
    { name: 'Transport', icon: 'directions_car' },
    { name: 'Dining', icon: 'restaurant' },
    { name: 'Utilities', icon: 'bolt' },
    { name: 'Fun', icon: 'celebration' },
    { name: 'Health', icon: 'medical_services' },
    { name: 'Shopping', icon: 'shopping_bag' },
];

export default function AddTransaction({ onClose, onSave }: AddTransactionProps) {
    const { token } = useAuth();
    const createTransaction = useCreateTransaction(token);

    const [amount, setAmount] = useState('0');
    const [type, setType] = useState<'Expense' | 'Income'>('Expense');
    const [selectedCategory, setSelectedCategory] = useState('Groceries');
    const [note, setNote] = useState('');

    const handleDigit = (digit: string) => {
        if (amount === '0' && digit !== '.') {
            setAmount(digit);
        } else if (digit === '.' && amount.includes('.')) {
            return;
        } else {
            setAmount(prev => prev + digit);
        }
    };

    const handleBackspace = () => {
        setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    };

    const handleSave = async () => {
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return;
        }

        createTransaction.mutate(
            {
                amount: parsedAmount,
                type,
                category: selectedCategory,
                date: new Date().toISOString(),
                note,
                payment_method: 'Cash',
            },
            {
                onSuccess: () => {
                    onSave?.();
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#1e2827] sm:bg-black/50 text-[#121716] dark:text-gray-100 font-display transition-colors">
            {/* Mobile Screen Container */}
            <div className="relative flex flex-col bg-white dark:bg-[#1e2827] w-full max-w-md h-full shadow-2xl overflow-hidden sm:h-[95vh] sm:rounded-[2rem] sm:border-[8px] sm:border-[#121716]">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 shrink-0">
                    <button onClick={onClose} className="text-[#121716] dark:text-white flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                    <h2 className="text-[#121716] dark:text-white text-lg font-bold tracking-tight">New Transaction</h2>
                    <button onClick={() => setAmount('0')} className="text-[#678381] dark:text-gray-400 text-sm font-bold px-2 hover:text-[#2ec2b3] transition-colors">Reset</button>
                </div>

                {/* Transaction Type Toggle */}
                <div className="px-6 py-1 shrink-0">
                    <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#f1f4f3] dark:bg-white/5 p-1">
                        <label className={`relative flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all duration-300 group ${type === 'Expense' ? 'bg-[#2ec2b3] text-white shadow-sm' : 'text-[#678381] dark:text-gray-400'}`}>
                            <span className="text-sm font-bold z-10">Expense</span>
                            <input
                                type="radio"
                                name="type"
                                value="Expense"
                                className="hidden"
                                checked={type === 'Expense'}
                                onChange={() => setType('Expense')}
                            />
                        </label>
                        <label className={`relative flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all duration-300 group ${type === 'Income' ? 'bg-[#2ec2b3] text-white shadow-sm' : 'text-[#678381] dark:text-gray-400'}`}>
                            <span className="text-sm font-bold z-10">Income</span>
                            <input
                                type="radio"
                                name="type"
                                value="Income"
                                className="hidden"
                                checked={type === 'Income'}
                                onChange={() => setType('Income')}
                            />
                        </label>
                    </div>
                </div>

                {/* Hero Amount Display */}
                <div className="flex flex-col items-center justify-center py-6 shrink-0">
                    <div className="text-[#678381] dark:text-gray-500 text-sm font-medium mb-1">Amount</div>
                    <h1 className="text-[#121716] dark:text-white text-[48px] leading-tight font-extrabold tracking-tight">$ {amount}</h1>
                </div>

                {createTransaction.error && (
                    <div className="mx-6 mb-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                        {createTransaction.error instanceof Error ? createTransaction.error.message : 'Failed to save'}
                    </div>
                )}

                {/* Categories Grid (Flexible Area) */}
                <div className="flex-1 overflow-y-auto min-h-0 px-6 scrollbar-hide no-scrollbar">
                    <div className="grid grid-cols-4 gap-x-4 gap-y-6 pb-6">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`flex flex-col items-center gap-2 group transition-opacity ${selectedCategory === cat.name ? '' : 'opacity-60 hover:opacity-100'}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-active:scale-95 ${selectedCategory === cat.name ? 'bg-[#2ec2b3] text-white shadow-lg shadow-[#2ec2b3]/25' : 'bg-[#f1f4f3] dark:bg-white/10 text-[#121716] dark:text-white'}`}>
                                    <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                                </div>
                                <span className={`text-xs font-bold truncate w-full text-center ${selectedCategory === cat.name ? 'text-[#2ec2b3]' : 'text-[#678381] dark:text-gray-400'}`}>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Area (Metadata + Keypad + Action) */}
                <div className="bg-[#f9fafb] dark:bg-white/5 rounded-t-[2rem] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] mt-auto shrink-0 pb-6 relative z-20">
                    {/* Metadata Row */}
                    <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 dark:border-white/10">
                        <button className="flex items-center gap-2.5 text-[#121716] dark:text-white group">
                            <div className="bg-[#2ec2b3]/10 p-1.5 rounded-lg text-[#2ec2b3] group-hover:bg-[#2ec2b3] group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[18px] block">calendar_today</span>
                            </div>
                            <span className="text-sm font-bold">Today</span>
                        </button>
                        <div className="h-6 w-px bg-gray-200 dark:bg-white/10"></div>
                        <div className="flex items-center gap-2.5 text-[#678381] dark:text-gray-400">
                            <span className="material-symbols-outlined text-[20px]">edit_note</span>
                            <input
                                type="text"
                                placeholder="Add note..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="text-sm font-medium bg-transparent outline-none w-24"
                            />
                        </div>
                    </div>

                    {/* Numeric Keypad */}
                    <div className="grid grid-cols-3 gap-y-3 gap-x-6 px-8 py-5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button key={num} onClick={() => handleDigit(num.toString())} className="text-[26px] font-semibold text-[#121716] dark:text-white h-14 flex items-center justify-center rounded-2xl hover:bg-white dark:hover:bg-white/10 active:bg-gray-200 dark:active:bg-white/20 transition-colors select-none">
                                {num}
                            </button>
                        ))}
                        <button onClick={() => handleDigit('.')} className="text-[26px] font-semibold text-[#121716] dark:text-white h-14 flex items-center justify-center rounded-2xl hover:bg-white dark:hover:bg-white/10 active:bg-gray-200 dark:active:bg-white/20 transition-colors select-none">.</button>
                        <button onClick={() => handleDigit('0')} className="text-[26px] font-semibold text-[#121716] dark:text-white h-14 flex items-center justify-center rounded-2xl hover:bg-white dark:hover:bg-white/10 active:bg-gray-200 dark:active:bg-white/20 transition-colors select-none">0</button>
                        <button onClick={handleBackspace} className="text-xl font-semibold text-[#121716] dark:text-white h-14 flex items-center justify-center rounded-2xl hover:bg-white dark:hover:bg-white/10 active:bg-gray-200 dark:active:bg-white/20 transition-colors select-none">
                            <span className="material-symbols-outlined">backspace</span>
                        </button>
                    </div>

                    {/* Primary Action Button */}
                    <div className="px-6 pt-2">
                        <button
                            onClick={handleSave}
                            disabled={createTransaction.isPending}
                            className="w-full bg-[#2ec2b3] hover:bg-[#25a093] disabled:opacity-50 text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-[#2ec2b3]/30 active:scale-[0.98] active:shadow-none transition-all duration-150 flex items-center justify-center gap-2"
                        >
                            <span className="tracking-wide">{createTransaction.isPending ? 'SAVING...' : 'SAVE TRANSACTION'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
