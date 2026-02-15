import { createClient } from '@/utils/supabase/server';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import DepartmentForm from './DepartmentForm';

export const revalidate = 0;

export default async function DepartmentEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch department data
    const { data: department } = await supabase
        .from('Department')
        .select('*')
        .eq('id', id)
        .single();

    // Fetch dependencies for the form
    const { data: schools } = await supabase.from('School').select('id, name');

    // Fetch faculty for HOD selection - filter by department if assigned
    const { data: facultyMembers } = await supabase
        .from('Faculty')
        .select('id, name, role')
        .order('name', { ascending: true });

    if (!department) {
        return (
            <div className="p-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Department Not Found</h1>
                <Link href="/admin/departments" className="text-blue-600 hover:underline">
                    Back to Departments
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-24">
            <div className="mb-8 flex items-center justify-between">
                <Link href="/admin/departments" className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors font-bold">
                    <ArrowLeft size={18} weight="bold" /> Back to Departments
                </Link>
                <h1 className="text-3xl font-bold">Edit Department</h1>
            </div>

            <DepartmentForm
                department={department}
                schools={schools || []}
                facultyMembers={facultyMembers || []}
            />
        </div>
    );
}
