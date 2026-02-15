
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AcademicDashboard from '@/components/portal/AcademicDashboard';


export default async function StudentPortalPage() {
    const supabase = await createClient();
    let user = null;
    try {
        console.log('--- DEBUG: Supabase Auth Fetch Starting ---');
        console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Defined' : 'Missing');
        console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Defined' : 'Missing');

        const { data } = await supabase.auth.getUser();
        user = data.user;

        console.log('Auth result user ID:', user?.id || 'No User');
    } catch (err: any) {
        console.error('CRITICAL: supabase.auth.getUser() fetch failed!', {
            message: err.message,
            cause: err.cause,
            stack: err.stack,
            env_url: process.env.NEXT_PUBLIC_SUPABASE_URL
        });
    }

    if (!user) {
        console.log('No user found, redirecting to login...');
        redirect('/portal/account/login');
    }

    // Fetch Student Record (SIS) with relations
    const { data: student, error } = await supabase
        .from('students')
        .select(`
            *,
            program:Course(*),
            user:profiles(*),
            application:applications(*)
        `)
        .eq('user_id', user.id)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching student record:', error);
    }
    console.log('Student data fetch result:', student ? 'Found' : 'Null', 'User ID:', user.id);

    if (!student) {
        // If no student record, redirect back to application dashboard
        redirect('/portal/dashboard');
    }

    return <AcademicDashboard student={student} />;
}
