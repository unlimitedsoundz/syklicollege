'use client';

import { XCircle } from "@phosphor-icons/react/dist/ssr";
import { rejectOffer } from '@/app/portal/actions';
import { useState } from 'react';

export default function RejectOfferButton({ applicationId }: { applicationId: string }) {
    const [isRejecting, setIsRejecting] = useState(false);

    const handleReject = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to DECLINE this offer of admission?\n\nThis action cannot be undone. Your spot will be released to another student."
        );

        if (!confirmed) return;

        setIsRejecting(true);
        try {
            await rejectOffer(applicationId);
        } catch (error: any) {
            alert(error.message || "Failed to reject offer");
            setIsRejecting(false);
        }
    };

    return (
        <button
            onClick={handleReject}
            disabled={isRejecting}
            className="flex items-center gap-2 bg-transparent text-neutral-500 border border-neutral-300 px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-100 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
        >
            <XCircle size={16} weight="bold" />
            {isRejecting ? 'Declining...' : 'Decline Offer'}
        </button>
    );
}
