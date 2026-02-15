import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Course } from '@/types/database';
import CourseSelector from './CourseSelector';

export default async function ApplyPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/portal/account/login');
    }

    // Fetch all courses
    const { data: courses } = await supabase
        .from('Course')
        .select(`
            *,
            school:School(name, slug)
        `)
        .order('title');

    return (
        <div className="max-w-4xl">
            <h1 className="text-xl font-black uppercase tracking-tight mb-1 text-neutral-900 leading-none">Select a Programme</h1>
            <p className="text-neutral-600 text-[10px] font-bold uppercase tracking-widest mb-10 leading-relaxed max-w-2xl">
                Choose the programme you wish to apply for. Multiple active applications are permitted.
                Ensure you meet the minimum entry requirements listed in the programme details.
            </p>

            <CourseSelector initialCourses={courses as any || []} />
        </div>
    );
}
