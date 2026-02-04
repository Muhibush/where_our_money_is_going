import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface RegisterPageProps {
    onNavigateToLogin: () => void;
}

export default function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!agreedToTerms) {
            setError('You must agree to the terms and conditions');
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password);
            // After successful registration, user is auto-logged in by AuthContext
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center transition-colors">
            {/* Main Mobile Container */}
            <div className="relative flex h-auto min-h-screen w-full max-w-[430px] flex-col bg-white dark:bg-background-dark group/design-root overflow-x-hidden shadow-2xl transition-colors">
                {/* Top Bar (iOS Style) */}
                <div className="flex items-center bg-white dark:bg-background-dark p-4 pb-2 justify-between transition-colors">
                    <button
                        onClick={onNavigateToLogin}
                        aria-label="Go back"
                        className="text-[#121716] dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </button>
                    <div className="flex-1"></div>
                </div>

                {/* Headline Section */}
                <div className="px-6 pt-2 pb-6">
                    <h1 className="text-[#121716] dark:text-white tracking-tight text-[32px] font-extrabold leading-tight text-left">
                        Create Account
                    </h1>
                    <p className="text-[#678381] dark:text-[#a1b3b2] text-base mt-2">
                        Start tracking your family's financial health today.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-1 px-2">
                    {error && (
                        <div className="mx-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Full Name Field */}
                    <div className="flex flex-wrap items-end gap-4 px-4 py-2">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#121716] dark:text-white text-sm font-semibold leading-normal pb-1.5 ml-1">Full Name</p>
                            <input
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121716] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#2ec2b3]/50 border border-[#dde4e3] dark:border-[#2d3a39] bg-white dark:bg-[#1a2625] focus:border-[#2ec2b3] h-14 placeholder:text-[#678381] p-[15px] text-base font-normal leading-normal transition-colors"
                                placeholder="Enter your full name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-wrap items-end gap-4 px-4 py-2">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#121716] dark:text-white text-sm font-semibold leading-normal pb-1.5 ml-1">Email</p>
                            <input
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121716] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#2ec2b3]/50 border border-[#dde4e3] dark:border-[#2d3a39] bg-white dark:bg-[#1a2625] focus:border-[#2ec2b3] h-14 placeholder:text-[#678381] p-[15px] text-base font-normal leading-normal transition-colors"
                                placeholder="name@email.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-wrap items-end gap-4 px-4 py-2">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#121716] dark:text-white text-sm font-semibold leading-normal pb-1.5 ml-1">Password</p>
                            <div className="flex w-full flex-1 items-stretch">
                                <input
                                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-xl text-[#121716] dark:text-white focus:outline-0 focus:ring-0 border border-[#dde4e3] dark:border-[#2d3a39] bg-white dark:bg-[#1a2625] focus:border-[#2ec2b3] h-14 placeholder:text-[#678381] p-[15px] border-r-0 pr-2 text-base font-normal leading-normal transition-colors"
                                    placeholder="Enter password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="text-[#678381] flex border border-[#dde4e3] dark:border-[#2d3a39] bg-white dark:bg-[#1a2625] items-center justify-center pr-[15px] rounded-r-xl border-l-0 cursor-pointer transition-colors">
                                    <span className="material-symbols-outlined">visibility</span>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-wrap items-end gap-4 px-4 py-2">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#121716] dark:text-white text-sm font-semibold leading-normal pb-1.5 ml-1">Confirm Password</p>
                            <input
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121716] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#2ec2b3]/50 border border-[#dde4e3] dark:border-[#2d3a39] bg-white dark:bg-[#1a2625] focus:border-[#2ec2b3] h-14 placeholder:text-[#678381] p-[15px] text-base font-normal leading-normal transition-colors"
                                placeholder="Re-enter password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-center gap-3 px-6 py-4">
                        <input
                            className="h-5 w-5 rounded border-[#dde4e3] text-[#2ec2b3] focus:ring-[#2ec2b3] cursor-pointer"
                            id="terms"
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                        />
                        <label className="text-[#121716] dark:text-white text-sm font-medium leading-tight cursor-pointer" htmlFor="terms">
                            I agree to the <span className="text-[#2ec2b3] font-bold">terms and conditions</span>
                        </label>
                    </div>

                    {/* Sign Up Button */}
                    <div className="px-4 py-4 mt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-[#2ec2b3] hover:bg-[#28ad9f] disabled:opacity-50 text-white text-lg font-bold rounded-xl transition-colors shadow-lg shadow-[#2ec2b3]/20"
                        >
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="flex justify-center py-6 mb-8">
                        <p className="text-[#121716] dark:text-white text-sm font-medium">
                            Already have an account?
                            <button
                                type="button"
                                onClick={onNavigateToLogin}
                                className="text-[#ff9f1c] font-bold hover:underline ml-1"
                            >
                                Log In
                            </button>
                        </p>
                    </div>
                </form>

                {/* Decorative Element (Bottom) */}
                <div className="mt-auto flex justify-center pb-2">
                    <div className="w-32 h-1 bg-[#dde4e3] dark:bg-[#2d3a39] rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
