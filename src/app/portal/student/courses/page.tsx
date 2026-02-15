
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import RegistrationClient from './RegistrationClient';

export default async function CourseRegistrationPage() {
    const supabase = await createClient();

    // 1. Auth & Student Context
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) redirect('/portal/account/login');

    // Fetch Student SIS record
    const { data: student } = await supabase
        .from('students')
        .select('*, program:Course(*), user:profiles(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (!student) redirect('/portal/dashboard');

    // 2. Fetch Active Window & Semester
    const { data: window } = await supabase
        .from('registration_windows')
        .select('*, semester:semesters(*)')
        .eq('status', 'OPEN')
        .order('open_at', { ascending: false })
        .limit(1)
        .single();

    // 3. Fetch Subjects available for this student's program
    const { data: subjects } = await supabase
        .from('Subject')
        .select('*')
        .eq('courseId', student.program_id)
        .order('code', { ascending: true });

    // 4. Fetch Student's current enrollments for this semester
    const { data: enrollments } = await supabase
        .from('module_enrollments')
        .select('*, subject:Subject(*)')
        .eq('student_id', student.id)
        .eq('semester_id', window?.semester_id)
        .eq('status', 'REGISTERED');

    // Map subjects and enrollments to match RegistrationClient's expected "module" structure
    const mappedModules = (subjects || []).map(s => ({
        id: s.id,
        code: s.code,
        title: s.name,
        credits: s.creditUnits,
        description: `Curriculum subject for ${student.program?.title || 'your program'}.`,
        capacity: 100, // Placeholder
        instructor: 'Department Faculty', // Placeholder 
        academic_level: student.program?.degreeLevel || 'Bachelor'
    }));

    const mappedEnrollments = (enrollments || []).map(e => ({
        ...e,
        module_id: e.subject_id, // Client expects module_id
        module: e.subject ? {
            id: e.subject.id,
            title: e.subject.name,
            credits: e.subject.creditUnits
        } : null
    }));

    return (
        <div className="min-h-screen bg-neutral-50/50 p-2 md:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-4">
                    <Link
                        href="/portal/student"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Dashboard
                    </Link>
                </div>
                <RegistrationClient
                    student={student}
                    window={window}
                    modules={mappedModules}
                    initialEnrollments={mappedEnrollments}
                />
            </div>
        </div>
    );
}
