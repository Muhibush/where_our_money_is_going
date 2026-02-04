import { useState } from 'react';

export default function BudgetPage() {
    const [view, setView] = useState<'Categories' | 'Recurring'>('Categories');

    return (
        <div className="flex flex-col w-full pb-24">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/50">
                <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">
                    Budget Management
                </h2>
                <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors relative">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 size-2 bg-alert rounded-full border border-white dark:border-background-dark"></span>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col p-4 gap-6 max-w-md mx-auto w-full">
                {/* Segmented Toggle */}
                <div className="flex">
                    <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-200 dark:bg-surface-dark p-1">
                        <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 ${view === 'Categories' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'} text-sm font-bold transition-all duration-200`}>
                            <span className="truncate">Categories</span>
                            <input
                                checked={view === 'Categories'}
                                onChange={() => setView('Categories')}
                                className="invisible w-0"
                                name="view-toggle"
                                type="radio"
                                value="Categories"
                            />
                        </label>
                        <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 ${view === 'Recurring' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'} text-sm font-bold transition-all duration-200`}>
                            <span className="truncate">Recurring</span>
                            <input
                                checked={view === 'Recurring'}
                                onChange={() => setView('Recurring')}
                                className="invisible w-0"
                                name="view-toggle"
                                type="radio"
                                value="Recurring"
                            />
                        </label>
                    </div>
                </div>

                {/* Total Summary Card */}
                <div className="bg-gradient-to-br from-primary to-[#15cfbe] rounded-2xl p-6 text-slate-900 shadow-lg shadow-primary/20 relative overflow-hidden">
                    {/* Abstract shapes for background */}
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-black/5 rounded-full blur-xl"></div>
                    <div className="relative z-10">
                        <p className="text-sm font-bold opacity-70 mb-1">Total Spent</p>
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-4xl font-extrabold tracking-tight">$2,195</h1>
                            <span className="text-lg font-medium opacity-70">/ $2,600</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                            <span>$405 Remaining</span>
                            <span className="bg-black/10 px-2 py-1 rounded-md">84%</span>
                        </div>
                        <div className="mt-2 w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-slate-900 h-full rounded-full" style={{ width: '84%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Envelope List */}
                <div className="flex flex-col gap-4">
                    {/* Rent Card (100% - Warning/Red) */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-primary">
                                    <span className="material-symbols-outlined">home</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Rent</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monthly Fixed</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-primary dark:hover:text-primary transition-colors p-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">$1,500</span>
                                    <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">/ $1,500</span>
                                </div>
                                <span className="text-xs font-bold text-alert bg-alert/10 px-2 py-1 rounded-md">$0 remaining</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-alert rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs font-medium text-slate-400">
                                <span>100% Used</span>
                                <span className="text-alert">Limit Reached</span>
                            </div>
                        </div>
                    </div>

                    {/* Groceries Card (70% - Primary/Teal) */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-primary">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Groceries</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Weekly Essentials</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-primary dark:hover:text-primary transition-colors p-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">$420</span>
                                    <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">/ $600</span>
                                </div>
                                <span className="text-xs font-bold text-primary-dark dark:text-primary bg-primary/10 px-2 py-1 rounded-md">$180 remaining</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs font-medium text-slate-400">
                                <span>70% Used</span>
                                <span className="text-slate-500 dark:text-slate-400">On track</span>
                            </div>
                        </div>
                    </div>

                    {/* Fun Card (60% - Primary/Teal) */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-primary">
                                    <span className="material-symbols-outlined">stadia_controller</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Fun</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Entertainment</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-primary dark:hover:text-primary transition-colors p-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">$180</span>
                                    <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">/ $300</span>
                                </div>
                                <span className="text-xs font-bold text-primary-dark dark:text-primary bg-primary/10 px-2 py-1 rounded-md">$120 remaining</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs font-medium text-slate-400">
                                <span>60% Used</span>
                                <span className="text-slate-500 dark:text-slate-400">Good standing</span>
                            </div>
                        </div>
                    </div>

                    {/* Transportation Card (48% - Primary/Teal) */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-primary">
                                    <span className="material-symbols-outlined">commute</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Transportation</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gas & Transit</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-primary dark:hover:text-primary transition-colors p-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">$95</span>
                                    <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">/ $200</span>
                                </div>
                                <span className="text-xs font-bold text-primary-dark dark:text-primary bg-primary/10 px-2 py-1 rounded-md">$105 remaining</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '48%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs font-medium text-slate-400">
                                <span>48% Used</span>
                                <span className="text-slate-500 dark:text-slate-400">On track</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add New Category Placeholder (Ghost Button) */}
                <button className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                    <span className="font-bold">Add New Envelope</span>
                </button>
            </main>
        </div>
    );
}
