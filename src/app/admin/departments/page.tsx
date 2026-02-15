import { createClient } from '@/utils/supabase/server';
import { PencilSimple as Edit, Plus, Buildings as SchoolIcon } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import Image from 'next/image';
import DeleteDepartmentButton from '@/components/admin/DeleteDepartmentButton';

export const revalidate = 0;

export default async function AdminDepartmentsPage() {
    const supabase = await createClient();

    // Fetch departments with school and HOD details
    const { data: departments, error } = await supabase
        .from('Department')
        .select(`
            *,
            school:School(name),
            headOfDepartment:Faculty!headOfDepartmentId(name)
        `)
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching departments:', error);
    }

    // Group by school
    const groupedDepartments: Record<string, any[]> = {};
    departments?.forEach(dept => {
        const schoolName = dept.school?.name || 'Unassigned';
        if (!groupedDepartments[schoolName]) {
            groupedDepartments[schoolName] = [];
        }
        groupedDepartments[schoolName].push(dept);
    });

    return (
        <div className="max-w-7xl mx-auto pb-24">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Academic Departments</h1>
                    <p className="text-neutral-500">Manage department details, featured images, and leadership.</p>
                </div>
            </div>

            <div className="space-y-16">
                {Object.entries(groupedDepartments).map(([schoolName, depts]) => (
                    <div key={schoolName} className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
                            <SchoolIcon size={24} weight="bold" className="text-neutral-400" />
                            <h2 className="text-2xl font-bold">{schoolName}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {depts.map((dept) => (
                                <div key={dept.id} className="bg-white border border-neutral-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                                    <div className="aspect-[16/9] relative bg-neutral-100 overflow-hidden">
                                        <Image
                                            src={dept.imageUrl || `/images/placeholders/${dept.slug}.png`}
                                            alt={dept.name}
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                                            <Link
                                                href={`/admin/departments/${dept.id}`}
                                                className="bg-white/90 backdrop-blur-sm p-3 hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                                            >
                                                <Edit size={18} weight="bold" />
                                            </Link>
                                            <DeleteDepartmentButton
                                                departmentId={dept.id}
                                                departmentName={dept.name}
                                            />
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-1">Department of {dept.name.replace('Department of', '').trim()}</h3>
                                        <p className="text-neutral-400 text-xs mb-4 uppercase tracking-widest">{dept.slug}</p>

                                        <div className="pt-4 border-t border-neutral-50 border-dashed">
                                            <p className="text-[10px] font-bold uppercase text-neutral-400 mb-1">Head of Department</p>
                                            <p className="text-sm font-semibold text-neutral-800">
                                                {dept.headOfDepartment?.name || 'To be appointed'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
