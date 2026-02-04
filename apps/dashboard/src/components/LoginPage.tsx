import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
    onNavigateToRegister: () => void;
}

export default function LoginPage({ onNavigateToRegister }: LoginPageProps) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4 transition-colors">
            <div className="w-full max-w-[480px] bg-white dark:bg-[#1a2b29] rounded-xl shadow-sm overflow-hidden p-6 sm:p-8 transition-colors">
                {/* App Logo & Title Area */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 bg-[#2ec2b6]/10 rounded-2xl flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-[#2ec2b6] text-5xl">account_balance_wallet</span>
                    </div>
                    <h1 className="text-[#121716] dark:text-white text-2xl font-bold tracking-tight">Family Budget</h1>
                    <p className="text-[#678381] text-sm mt-1">Smart tracking for your family's health</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#121716] dark:text-white text-sm font-medium">Email</label>
                        <div className="relative">
                            <input
                                className="w-full rounded-lg border-[#dde4e3] dark:border-[#2d3d3b] dark:bg-[#131f1e] dark:text-white focus:border-[#2ec2b6] focus:ring-1 focus:ring-[#2ec2b6] h-14 px-4 text-base placeholder:text-[#678381] outline-none transition-colors"
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#121716] dark:text-white text-sm font-medium">Password</label>
                        <div className="relative flex items-stretch">
                            <input
                                className="w-full rounded-l-lg border-r-0 border-[#dde4e3] dark:border-[#2d3d3b] dark:bg-[#131f1e] dark:text-white focus:border-[#2ec2b6] focus:ring-1 focus:ring-[#2ec2b6] h-14 px-4 text-base placeholder:text-[#678381] outline-none transition-colors"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="flex items-center px-4 rounded-r-lg border border-l-0 border-[#dde4e3] dark:border-[#2d3d3b] dark:bg-[#131f1e] text-[#678381] cursor-pointer transition-colors">
                                <span className="material-symbols-outlined">visibility</span>
                            </div>
                        </div>
                    </div>

                    {/* Primary Action */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-[#2ec2b6] hover:bg-[#28ad1b] disabled:opacity-50 text-white text-lg font-bold rounded-lg transition-colors flex items-center justify-center"
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex flex-col items-center gap-4 mt-6">
                        <button type="button" className="text-[#ff9f1c] text-sm font-semibold hover:underline decoration-2 underline-offset-4">
                            Forgot Password?
                        </button>
                        <div className="h-px w-full bg-[#dde4e3] dark:bg-[#2d3d3b] my-2 transition-colors"></div>
                        <p className="text-[#678381] text-sm">
                            Don't have an account?
                            <button
                                type="button"
                                onClick={onNavigateToRegister}
                                className="text-[#ff9f1c] font-bold hover:underline decoration-2 underline-offset-4 ml-1"
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </form>

                {/* Decorative Footer */}
                <div className="mt-12 text-center">
                    <div className="flex justify-center gap-2 mb-4">
                        <div className="w-12 h-1 bg-[#2ec2b6]/20 rounded-full"></div>
                        <div className="w-4 h-1 bg-[#2ec2b6]/20 rounded-full"></div>
                        <div className="w-4 h-1 bg-[#2ec2b6]/20 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
