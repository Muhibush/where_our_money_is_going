
import BudgetCard from './BudgetCard';
import StatsGrid from './StatsGrid';
import CategoriesList from './CategoriesList';

export default function DashboardPage() {
    return (
        <>
            {/* Top App Bar - Moved from Layout */}
            <header className="flex items-center justify-between px-6 py-4 pt-12 sticky top-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm z-10 transition-colors">
                <h2 className="text-2xl font-bold leading-tight tracking-tight">Dashboard</h2>
                <button className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-text-main-light dark:text-text-main-dark">settings</span>
                </button>
            </header>

            <main className="px-6 flex flex-col gap-6 pb-24"> {/* Added pb-24 for bottom nav clearance */}
                <BudgetCard />
                <StatsGrid />
                <CategoriesList />
            </main>
        </>
    );
}
