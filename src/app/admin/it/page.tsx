import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ITManagementClient from './ITManagementClient';

export default async function AdminITPage() {
    const supabase = await createClient();

    // Check authentication and admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'ADMIN') {
        redirect('/portal/dashboard');
    }

    // Fetch IT assets
    const { data: assets } = await supabase
        .from('it_assets')
        .select('*')
        .order('name');

    // Fetch student access records with student and user details
    const { data: accessRecords } = await supabase
        .from('student_it_access')
        .select(`
            *,
            asset:it_assets(*),
            student:students(
                id,
                student_id,
                enrollment_status,
                user:profiles(first_name, last_name, email)
            )
        `)
        .order('created_at', { ascending: false });

    // Fetch active students who might need provisioning
    const { data: students } = await supabase
        .from('students')
        .select('id, student_id, enrollment_status, user:profiles(first_name, last_name, email)')
        .eq('enrollment_status', 'ACTIVE');

    return (
        <div className="min-h-screen bg-neutral-50/50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <ITManagementClient
                    assets={assets || []}
                    accessRecords={accessRecords || []}
                    students={students || []}
                />
            </div>
        </div>
    );
}
