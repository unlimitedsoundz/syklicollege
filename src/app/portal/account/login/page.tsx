'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from "@aalto-dx/react-components";
import { ProgressIndicator, Button } from "@aalto-dx/react-components";
import { createClient } from '@/utils/supabase/client';
import { signInWithEmailAndPassword } from '../actions';
import { Eye, EyeSlash } from "@phosphor-icons/react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const result = await signInWithEmailAndPassword(email, password);

            if (result?.error) {
                setMessage({ type: 'error', text: result.error });
                setIsLoading(false);
                return;
            }

            if (result?.success) {
                router.push('/portal/dashboard');
                // Clean up any old simulated session
                localStorage.removeItem('Kestora_user');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setMessage({
                type: 'error',
                text: 'An unexpected error occurred. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-[#2d2d2d]">
            <h1 className="text-2xl font-semibold mb-1 text-black tracking-tight">Welcome Back</h1>
            <p className="text-black text-[13px] font-normal mb-8">Sign in to your application portal</p>

            {message && (
                <div className={`p-4 rounded-none mb-6 text-[13px] font-medium border ${message.type === 'success' ? 'bg-neutral-50 text-black border-neutral-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-[13px] font-medium text-black mb-1">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-[#2d2d2d]"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="relative">
                    <label className="block text-[13px] font-medium text-black mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-[#2d2d2d] pr-12"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                        >
                            {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        type="primary"
                        htmlType="submit"
                        label="Sign In"
                        isLoading={isLoading}
                        className="w-full rounded-lg"
                    />
                </div>
            </form>

            <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
                <p className="text-neutral-500 text-sm">
                    Don't have an account yet?{' '}
                    <Link href="/portal/account/register" className="text-black font-bold hover:underline">
                        Start your application
                    </Link>
                </p>
            </div>
        </div>
    );
}
