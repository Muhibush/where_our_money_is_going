import React from 'react';

type Tab = 'home' | 'history' | 'budget' | 'settings';

interface LayoutProps {
    children: React.ReactNode;
    currentTab: Tab;
    onTabChange: (tab: Tab) => void;
    onAddClick: () => void;
}

export default function Layout({ children, currentTab, onTabChange, onAddClick }: LayoutProps) {
    return (
        <div className="mx-auto w-full max-w-md bg-background-light dark:bg-background-dark min-h-screen relative overflow-hidden shadow-2xl transition-colors duration-200">
            {children}

            {/* Floating Action Button */}
            <div className="fixed bottom-24 right-6 z-40">
                <button onClick={onAddClick} className="bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group active:scale-95">
                    <span className="material-symbols-outlined text-[32px] font-medium">add</span>
                </button>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 w-full max-w-md bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-white/5 pb-6 pt-3 px-6 z-30 transition-colors">
                <div className="grid grid-cols-4 items-center">
                    <button
                        onClick={() => onTabChange('home')}
                        className={`flex flex-col items-center gap-1 transition-colors w-full ${currentTab === 'home' ? 'text-primary dark:text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                    >
                        <span className="material-symbols-outlined text-[24px] fill-current">home</span>
                        <span className={`text-[10px] font-medium ${currentTab === 'home' ? 'font-bold' : ''}`}>Home</span>
                    </button>

                    <button
                        onClick={() => onTabChange('history')}
                        className={`flex flex-col items-center gap-1 transition-colors w-full ${currentTab === 'history' ? 'text-primary dark:text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                    >
                        <span className="material-symbols-outlined text-[24px] fill-current">receipt_long</span>
                        <span className={`text-[10px] font-medium ${currentTab === 'history' ? 'font-bold' : ''}`}>History</span>
                    </button>

                    <button
                        onClick={() => onTabChange('budget')}
                        className={`flex flex-col items-center gap-1 transition-colors w-full ${currentTab === 'budget' ? 'text-primary dark:text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                    >
                        <span className="material-symbols-outlined text-[24px]">pie_chart</span>
                        <span className={`text-[10px] font-medium ${currentTab === 'budget' ? 'font-bold' : ''}`}>Budget</span>
                    </button>

                    <button
                        onClick={() => onTabChange('settings')}
                        className={`flex flex-col items-center gap-1 transition-colors w-full ${currentTab === 'settings' ? 'text-primary dark:text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                    >
                        <span className="material-symbols-outlined text-[24px]">settings</span>
                        <span className={`text-[10px] font-medium ${currentTab === 'settings' ? 'font-bold' : ''}`}>Settings</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
