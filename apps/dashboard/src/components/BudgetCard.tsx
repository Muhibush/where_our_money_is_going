

export default function BudgetCard() {
    return (
        <div className="w-full bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex flex-col items-center gap-1 mb-6">
                <h3 className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium uppercase tracking-wider">Remaining to Spend</h3>
                <h1 className="text-4xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">$1,247.50</h1>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                    <span className="text-accent text-sm font-bold">62% used</span>
                    <span className="text-text-sub-light dark:text-text-sub-dark text-xs font-medium">Reset in 12 days</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div className="bg-accent h-3 rounded-full" style={{ width: '62%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                    <p className="text-text-sub-light dark:text-text-sub-dark text-xs">Total Budget: $4,100</p>
                </div>
            </div>
        </div>
    );
}
