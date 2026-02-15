import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { OfferClient } from './OfferClient';

export default async function StudentOfferPage() {
    const supabase = await createClient();

    // 1. Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    // 2. Fetch Admission record
    const { data: admission } = await supabase
        .from('admissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (!admission) {
        // 2.5 Fallback: Check application status
        const { data: app } = await supabase
            .from('applications')
            .select('status')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (app?.status === 'ADMITTED') {
            return (
                <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 text-center max-w-sm">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="animate-pulse text-xl">📝</span>
                        </div>
                        <h1 className="text-xl font-black uppercase mb-2 text-blue-600">Offer Processing</h1>
                        <p className="text-neutral-500 text-xs font-bold uppercase tracking-tight">
                            Admission approved! We are generating your formal Letter of Offer.
                            Please check back shortly.
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 text-center max-w-sm">
                    <h1 className="text-xl font-black uppercase mb-2">No Active Offer</h1>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-tight">
                        Official offer pending. Please check your application status on the dashboard.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 p-3 md:p-6">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-black uppercase tracking-tight mb-1 leading-none">Your Admission Offer</h1>
                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Formal Invitation for Enrollment</p>
                </div>

                <OfferClient admission={admission} />
            </div>
        </div>
    );
}
