

const categories = [
    {
        name: 'Rent',
        type: 'Monthly fixed',
        amount: '$1,500',
        total: '$1,500',
        color: 'red',
        icon: 'home',
        progress: 100
    },
    {
        name: 'Groceries',
        type: 'Essential',
        amount: '$420',
        total: '$600',
        color: 'accent',
        icon: 'shopping_basket',
        progress: 70
    },
    {
        name: 'Fun',
        type: 'Discretionary',
        amount: '$180',
        total: '$300',
        color: 'purple',
        icon: 'theater_comedy',
        progress: 60
    }
];

export default function CategoriesList() {
    return (
        <div className="flex flex-col gap-4 pt-2">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Top Categories</h3>
                <button className="text-primary text-sm font-semibold hover:underline">See all</button>
            </div>
            <div className="flex flex-col gap-4">
                {categories.map((cat, index) => (
                    <div key={index} className="bg-card-light dark:bg-card-dark p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                        <div className="flex justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${cat.color === 'accent' ? 'bg-accent/10' :
                                    cat.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' :
                                        'bg-purple-100 dark:bg-purple-900/30'
                                    }`}>
                                    <span className={`material-symbols-outlined ${cat.color === 'accent' ? 'text-accent' :
                                        cat.color === 'red' ? 'text-red-600 dark:text-red-400' :
                                            'text-purple-600 dark:text-purple-400'
                                        }`}>{cat.icon}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-text-main-light dark:text-text-main-dark">{cat.name}</p>
                                    <p className="text-xs text-text-sub-light dark:text-text-sub-dark">{cat.type}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-text-main-light dark:text-text-main-dark">{cat.amount}</p>
                                <p className="text-xs text-text-sub-light dark:text-text-sub-dark">of {cat.total}</p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-2 rounded-full ${cat.color === 'red' ? 'bg-red-500' : cat.color === 'accent' ? 'bg-accent' : 'bg-accent'}`}
                                style={{ width: `${cat.progress}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
