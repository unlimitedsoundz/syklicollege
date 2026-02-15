
import { createClient } from '@/utils/supabase/server';
import SubjectsClient from './SubjectsClient';

export const revalidate = 0;

export default async function AdminSubjectsPage() {
    const supabase = await createClient();

    // Fetch subjects with their associated courses
    const { data: subjects } = await supabase
        .from('Subject')
        .select('*, course:Course(title)')
        .order('semester', { ascending: true });

    return <SubjectsClient subjects={subjects || []} />;
}
