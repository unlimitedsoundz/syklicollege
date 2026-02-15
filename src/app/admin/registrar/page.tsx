
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import RegistrarClient from './RegistrarClient';

export default async function RegistrarPage() {
    const supabase = await createClient();

    // 1. Auth & Admin/Registrar Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'ADMIN' && profile?.role !== 'REGISTRAR') {
        // redirect('/portal');
    }

    // 2. Fetch Semesters & Windows
    const { data: semesters } = await supabase
        .from('semesters')
        .select('*')
        .order('start_date', { ascending: false });

    const { data: windows } = await supabase
        .from('registration_windows')
        .select('*, semester:semesters(*)');

    // 3. Fetch Enrollment Stats per module
    const { data: moduleStats } = await supabase
        .from('modules')
        .select(`
            id,
            code,
            title,
            capacity,
            module_enrollments(
                id,
                status,
                student:students(
                    id,
                    student_id,
                    user:profiles(first_name, last_name)
                )
            )
        `);

    // 4. Fetch Provisional Grades
    const { data: provisionalGrades } = await supabase
        .from('module_enrollments')
        .select(`
            *,
            student:students(*, user:profiles(*)),
            module:modules(*)
        `)
        .eq('grade_status', 'PROVISIONAL')
        .not('grade', 'is', null);

    // 5. Fetch Students with Housing
    const { data: students } = await supabase
        .from('students')
        .select('*, user:profiles(*), housing_assignments(status, room:housing_rooms(room_number, building:housing_buildings(name)))')
        .order('created_at', { ascending: false });

    // 6. Fetch Housing Buildings
    const { data: buildings } = await supabase
        .from('housing_buildings')
        .select('*, housing_rooms(count, status)');

    // 7. Fetch Class Sessions (Timetable)
    const { data: sessions } = await supabase
        .from('class_sessions')
        .select('*, module:modules(*), semester:semesters(*)')
        .order('day_of_week', { ascending: true })
        .order('start_time', { ascending: true });

    // 8. Fetch Tuition Payments
    const { data: tuitionPayments } = await supabase
        .from('tuition_payments')
        .select('*, offer:admission_offers(*, application:applications(*, user:profiles(*)))')
        .order('created_at', { ascending: false });

    // 9. Fetch Recent Audit Logs
    const { data: auditLogs } = await supabase
        .from('audit_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(20);

    return (
        <div className="min-h-screen bg-neutral-50/50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <RegistrarClient
                    semesters={semesters || []}
                    windows={windows || []}
                    moduleStats={moduleStats || []}
                    provisionalGrades={provisionalGrades || []}
                    students={students || []}
                    buildings={buildings || []}
                    sessions={sessions || []}
                    auditLogs={auditLogs || []}
                    tuitionPayments={tuitionPayments || []}
                />
            </div>
        </div>
    );
}
