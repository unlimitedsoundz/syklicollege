
import { createClient } from '@/utils/supabase/server';
import FacultyClient from './FacultyClient';

export const revalidate = 0;

export default async function AdminFacultyPage() {
    const supabase = await createClient();

    const { data: faculty } = await supabase
        .from('Faculty')
        .select('*, school:School(name), department:Department!departmentId(name)')
        .order('name', { ascending: true });

    return <FacultyClient faculty={faculty || []} />;
}
