
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import ItAccessClient from './ItAccessClient';

export default async function ItAccessPage() {
    const supabase = await createClient();

    // 1. Auth & Student Context
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    const { data: student } = await supabase
        .from('students')
        .select('id, student_id')
        .eq('user_id', user.id)
        .single();

    if (!student) {
        console.log('No student found for user:', user.id);
        redirect('/portal/dashboard');
    }

    console.log('Fetching IT access for student:', student.id, 'User:', user.id);

    // 2. Fetch IT Access
    const { data: access, error } = await supabase
        .from('student_it_access')
        .select(`
            *,
            asset:it_assets(*)
        `)
        .eq('student_id', student.id)
        .order('created_at', { ascending: false });

    if (error) console.error('Error fetching IT access:', error);
    console.log('IT Access found:', access?.length);

    return (
        <div className="min-h-screen bg-neutral-50/50 p-2 md:p-6 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="mb-4">
                    <Link
                        href="/portal/student"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Dashboard
                    </Link>
                </div>

                <ItAccessClient access={access || []} />
            </div>
        </div>
    );
}
