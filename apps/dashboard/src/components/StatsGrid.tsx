

export default function StatsGrid() {
    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Income Card */}
            <div className="bg-card-light dark:bg-card-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-2 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-accent text-lg">arrow_downward</span>
                    </div>
                    <span className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Income</span>
                </div>
                <p className="text-2xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">$4,500</p>
            </div>
            {/* Expenses Card */}
            <div className="bg-card-light dark:bg-card-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-2 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-lg">arrow_upward</span>
                    </div>
                    <span className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Expenses</span>
                </div>
                <p className="text-2xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">$2,852</p>
            </div>
        </div>
    );
}
