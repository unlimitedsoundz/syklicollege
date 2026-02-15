import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import AcademicRecordClient from './AcademicRecordClient';

export default async function TranscriptPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    const { data: student } = await supabase
        .from('students')
        .select('id, student_id, institutional_email')
        .eq('user_id', user.id)
        .single();

    if (!student) redirect('/portal/dashboard');

    // Fetch enrollment history with grades
    const { data: enrollments } = await supabase
        .from('module_enrollments')
        .select(`
            *,
            module:modules(*),
            semester:semesters(*)
        `)
        .eq('student_id', student.id)
        .order('created_at', { ascending: false });

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

                <AcademicRecordClient
                    studentId={student.student_id}
                    enrollments={enrollments || []}
                />
            </div>
        </div>
    );
}
