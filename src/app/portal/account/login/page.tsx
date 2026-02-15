'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CircleNotch as Loader2 } from "@phosphor-icons/react/dist/ssr";
import { loginWithStudentId } from '../actions';
import DateSelector from '@/components/ui/DateSelector';

export default function LoginPage() {
    const [studentId, setStudentId] = useState('');
    const [dob, setDob] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const result = await loginWithStudentId(studentId, dob);

            if (result.error) {
                setMessage({ type: 'error', text: result.error });
            } else {
                // Success! The user is signed in on the server via verifyOtp
                router.push('/portal/dashboard');
                router.refresh();
            }
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: 'An unexpected error occurred. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-neutral-500 mb-8">Sign in to your application portal</p>

            {message && (
                <div className={`p-4 rounded-lg mb-6 text-xs font-bold uppercase tracking-widest border ${message.type === 'success' ? 'bg-neutral-50 text-neutral-900 border-neutral-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Student ID</label>
                    <input
                        type="text"
                        required
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                        placeholder="SKXXXXXXX"
                    />
                </div>

                <DateSelector
                    name="dob"
                    label="Date of Birth"
                    required
                    value={dob}
                    onChange={(name, value) => setDob(value)}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                </button>
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
