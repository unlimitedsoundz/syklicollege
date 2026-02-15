'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, CheckCircle as CheckCircle2, Copy, ArrowRight, CircleNotch as Loader2 } from "@phosphor-icons/react/dist/ssr";
import { getStudentIdByEmail, registerApplicant } from '../actions';
import DateSelector from '@/components/ui/DateSelector';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        email: '',
        dateOfBirth: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [generatedId, setGeneratedId] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const result = await registerApplicant(formData);

            if (result.error) {
                throw new Error(result.error);
            }

            if (result.studentId) {
                setGeneratedId(result.studentId);
            }

            setMessage({
                type: 'success',
                text: 'Account created successfully!'
            });
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.message || 'Failed to create account.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (generatedId && message?.type === 'success') {
        return (
            <div className="max-w-md mx-auto mt-12 bg-white p-8 border border-neutral-100 text-center space-y-6 animate-in zoom-in-95 duration-500 text-[#2d2d2d]">
                <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto text-neutral-900">
                    <CheckCircle2 size={32} weight="bold" />
                </div>

                <div className="space-y-1">
                    <h1 className="text-2xl font-black uppercase tracking-tight">Welcome to Sykli</h1>
                    <p className="text-xs font-medium">Your account has been successfully created.</p>
                </div>

                <div className="p-6 bg-neutral-900 rounded-2xl text-white space-y-3 shadow-md">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#2d2d2d]" style={{ filter: 'invert(1) grayscale(1) brightness(2)' }}>Unique Student ID</p>
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-3xl font-black tracking-tighter text-white">{generatedId}</span>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(generatedId);
                                alert("Student ID copied to clipboard");
                            }}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors"
                            title="Copy ID"
                        >
                            <Copy size={16} weight="bold" className="text-neutral-400" />
                        </button>
                    </div>
                    <p className="text-[9px] font-bold uppercase leading-tight pt-1">
                        Required for future logins alongside your Date of Birth.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="p-3 bg-neutral-50 border border-neutral-100 flex items-center justify-center gap-3 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest leading-none">
                            Success! Your account is active.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Link
                            href="/portal/dashboard"
                            className="w-full bg-neutral-900 text-white font-bold py-3.5 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2"
                        >
                            Enter Dashboard <ArrowRight size={16} weight="bold" />
                        </Link>

                        <p className="text-[9px] font-medium uppercase tracking-widest">
                            Email confirmation sent
                        </p>
                    </div>

                    <Link
                        href="/portal/account/login"
                        className="inline-block text-[10px] font-black uppercase tracking-widest border-b border-[#2d2d2d] transition-colors pt-2"
                    >
                        Go to Login Page
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 border border-neutral-100 text-[#2d2d2d]">
            <h1 className="text-2xl font-bold mb-2">Create Account</h1>
            <p className="mb-8">Start your application to Sykli College</p>

            {message && (
                <div className={`p-4 mb-6 text-xs font-bold uppercase tracking-widest border ${message.type === 'success' ? 'bg-neutral-50 border-neutral-100' : 'bg-red-50 text-red-700 border-red-100'}`} style={message.type === 'success' ? { color: '#2d2d2d' } : {}}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-[#2d2d2d]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-[#2d2d2d]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Country of Residence</label>
                    <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-[#2d2d2d]"
                        placeholder="e.g. Finland"
                    />
                </div>

                <DateSelector
                    name="dateOfBirth"
                    label="Date of Birth"
                    required
                    value={formData.dateOfBirth}
                    onChange={(name, value) => setFormData({ ...formData, [name]: value })}
                />

                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-[#2d2d2d]"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} weight="bold" /> : 'Create Account'}
                    </button>
                    <p className="text-xs mt-4 text-center">
                        By creating an account, you agree to our <Link href="/terms" className="font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="font-bold hover:underline">Privacy Policy</Link>.
                    </p>
                </div>
            </form>

            <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
                <p className="text-sm">
                    Already have an account?{' '}
                    <Link href="/portal/account/login" className="font-bold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
