
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import TimetableClient from './TimetableClient';

export default async function TimetablePage() {
    const supabase = await createClient();

    // 1. Auth & Student Context
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    const { data: student } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .single();

    if (!student) redirect('/portal/dashboard');

    // 2. Fetch Sessions for modules the student is registered for
    // In a real system, we'd join through module_enrollments
    const { data: enrollments } = await supabase
        .from('module_enrollments')
        .select('module_id')
        .eq('student_id', student.id)
        .eq('status', 'REGISTERED');

    const moduleIds = enrollments?.map(e => e.module_id) || [];

    const { data: sessions } = await supabase
        .from('class_sessions')
        .select(`
            *,
            module:modules(*)
        `)
        .in('module_id', moduleIds);

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

                <TimetableClient sessions={sessions || []} />
            </div>
        </div>
    );
}
