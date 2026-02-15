import { createClient } from '@/utils/supabase/server';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import FacultyForm from './FacultyForm';

export const revalidate = 0;

export default async function FacultyEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === 'new';
    const supabase = await createClient();

    let facultyMember: any = null;
    if (!isNew) {
        const { data } = await supabase.from('Faculty').select('*').eq('id', id).single();
        facultyMember = data;
    }

    // Fetch dependencies
    let schools: { id: string; name: string }[] = [];
    let departments: { id: string; name: string; schoolId: string }[] = [];

    try {
        const { data: schoolsData, error: sErr } = await supabase.from('School').select('id, name');
        if (sErr) throw sErr;
        schools = schoolsData || [];

        const { data: departmentsData, error: dErr } = await supabase.from('Department').select('id, name, schoolId, headOfDepartmentId');
        if (dErr) throw dErr;
        departments = departmentsData || [];
    } catch (error) {
        console.error('FacultyEditorPage Data Fetch Error:', error);
    }

    return (
        <div className="max-w-4xl mx-auto pb-24 pt-12 pl-12">
            <div className="mb-8 flex items-center justify-between">
                <Link href="/admin/faculty" className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors font-bold">
                    <ArrowLeft size={18} weight="bold" /> Back to Faculty
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'Create New Member' : 'Edit Faculty Member'}</h1>
            </div>

            <FacultyForm
                id={id}
                isNew={isNew}
                facultyMember={facultyMember}
                schools={schools}
                departments={departments}
            />
        </div>
    );
}
