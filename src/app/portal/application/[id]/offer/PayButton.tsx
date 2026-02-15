'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, ArrowRight } from "@phosphor-icons/react/dist/ssr";

interface PayButtonProps {
    href: string;
}

export default function PayButton({ href }: PayButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        router.push(href);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className="w-full bg-[#00A651] text-white rounded-sm py-5 text-sm font-black uppercase tracking-widest hover:bg-[#008c44] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/10 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    <CreditCard size={16} weight="bold" />
                    Pay with PayGoWire
                    <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-all" />
                </>
            )}
        </button>
    );
}
