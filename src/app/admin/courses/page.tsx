
import { createClient } from '@/utils/supabase/server';
import CoursesClient from './CoursesClient';

export const revalidate = 0; // Dynamic

export default async function AdminCoursesPage() {
    const supabase = await createClient();
    const { data: courses } = await supabase
        .from('Course')
        .select('*, school:School(name)')
        .order('createdAt', { ascending: false });

    return <CoursesClient courses={courses || []} />;
}
