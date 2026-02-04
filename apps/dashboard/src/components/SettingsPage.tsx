

interface SettingsPageProps {
    onLogout?: () => void;
}

export default function SettingsPage({ onLogout }: SettingsPageProps) {
    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark">
            {/* TopAppBar */}
            <div className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <div className="flex items-center justify-between p-4 h-16">
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Settings</h2>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 no-scrollbar">
                {/* Account Section */}
                <section>
                    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide px-4 pb-2 ml-1">Account</h3>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                        {/* Profile Item */}
                        <div className="group flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-[24px]">person</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-base font-medium leading-normal dark:text-gray-100">Profile</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">chevron_right</span>
                        </div>
                        {/* Currency Item */}
                        <div className="group flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-[24px]">attach_money</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-base font-medium leading-normal dark:text-gray-100">Currency</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500 dark:text-slate-400 text-base">USD</span>
                                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">chevron_right</span>
                            </div>
                        </div>
                        {/* Month Start Item */}
                        <div className="group flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-slate-700">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-base font-medium leading-normal dark:text-gray-100">Month Start</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500 dark:text-slate-400 text-base">1st</span>
                                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">chevron_right</span>
                            </div>
                        </div>
                        {/* Log Out Item */}
                        <div
                            onClick={onLogout}
                            className="group flex items-center gap-4 p-4 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                        >
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                <span className="material-symbols-outlined text-[24px]">logout</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-base font-medium leading-normal text-red-600 dark:text-red-400">Log Out</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Section */}
                <section>
                    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide px-4 pb-2 ml-1">Data</h3>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                        {/* Export Item */}
                        <div className="group flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-[24px]">download</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-base font-medium leading-normal dark:text-gray-100">Export to CSV</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">chevron_right</span>
                        </div>
                        {/* Reset Item (Destructive) */}
                        <div className="group flex items-center gap-4 p-4 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                <span className="material-symbols-outlined text-[24px]">delete</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-base font-medium leading-normal text-red-600 dark:text-red-400">Reset Monthly Data</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section>
                    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide px-4 pb-2 ml-1">About</h3>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                        {/* Version Item */}
                        <div className="flex items-center gap-4 p-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-[24px]">info</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-base font-medium leading-normal dark:text-gray-100">Version</p>
                            </div>
                            <span className="text-slate-500 dark:text-slate-400 text-base">1.0.0</span>
                        </div>
                        {/* Feedback Item */}
                        <div className="group flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-[24px]">mail</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-base font-medium leading-normal dark:text-gray-100">Send Feedback</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">chevron_right</span>
                        </div>
                    </div>
                </section>

                {/* Footer info */}
                <div className="text-center pb-8 pt-2">
                    <p className="text-xs text-slate-400 dark:text-slate-600">Family Budget Tracker © 2023</p>
                </div>
            </div>
        </div>
    );
}
