'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CircleNotch as Loader2, ShieldCheck, Envelope as Mail, Calendar } from "@phosphor-icons/react/dist/ssr";
import { adminLoginWithEmail } from '../actions';
import DateSelector from '@/components/ui/DateSelector';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const result = await adminLoginWithEmail(email, dob);

            if (result.error) {
                setMessage({ type: 'error', text: result.error });
            } else {
                // Success! The user is signed in on the server via verifyOtp
                router.push('/admin/admissions');
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
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 relative overflow-hidden">
            {/* Admin Badge */}
            <div className="absolute top-0 right-0 bg-neutral-900 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                Admin Access
            </div>

            <div className="flex items-center gap-3 mb-6 mt-2">
                <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white shadow-xl shadow-neutral-200">
                    <ShieldCheck size={24} weight="bold" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold leading-tight">Admin Login</h1>
                    <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider">Sykli College SIS</p>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl mb-8 flex items-start gap-3">
                <div className="text-amber-600 mt-0.5">
                    <ShieldCheck size={16} weight="bold" />
                </div>
                <p className="text-[11px] text-amber-800 font-bold uppercase leading-relaxed">
                    Administrative Personnel Only. Unauthorized access is strictly prohibited and logged.
                </p>
            </div>

            {message && (
                <div className={`p-4 rounded-lg mb-6 text-xs font-bold uppercase tracking-widest border ${message.type === 'success' ? 'bg-neutral-50 text-neutral-900 border-neutral-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label className="block text-[10px] font-black uppercase text-neutral-400 mb-2 ml-1">Work Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} weight="bold" />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all font-bold text-sm"
                            placeholder="name@syklicollege.fi"
                        />
                    </div>
                </div>

                <DateSelector
                    name="dob"
                    label="Date of Birth"
                    required
                    value={dob}
                    onChange={(name, value) => setDob(value)}
                />

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-neutral-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg shadow-neutral-200 group"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} weight="bold" />
                        ) : (
                            <>
                                Authenticate Access
                                <ShieldCheck size={18} weight="bold" className="group-hover:scale-110 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-4">
                <Link
                    href="/portal/account/login"
                    className="text-neutral-400 text-[10px] font-black uppercase tracking-widest hover:text-black text-center transition-colors"
                >
                    Student Portal Login
                </Link>
            </div>
        </div>
    );
}
