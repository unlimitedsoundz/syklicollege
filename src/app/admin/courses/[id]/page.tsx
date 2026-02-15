
import { createClient } from '@/utils/supabase/server';
import { createCourse, updateCourse } from '../../actions';
import { CaretLeft as ArrowLeft, FloppyDisk as Save } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';

export default async function CourseEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === 'new';
    const supabase = await createClient();

    let course: any = null;
    if (!isNew) {
        const { data } = await supabase.from('Course').select('*').eq('id', id).single();
        course = data;
    }

    // Fetch dependencies
    const { data: schools } = await supabase.from('School').select('id, name');
    const { data: departments } = await supabase.from('Department').select('id, name, schoolId');

    return (
        <div className="max-w-4xl mx-auto pt-12 pl-12">
            <div className="mb-8 flex items-center justify-between">
                <Link href="/admin/courses" className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors font-bold">
                    <ArrowLeft size={18} weight="bold" /> Back to Courses
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'Create New Course' : 'Edit Course'}</h1>
            </div>

            <form
                action={async (formData: FormData) => {
                    'use server';
                    if (isNew) {
                        await createCourse(formData);
                    } else {
                        await updateCourse(id, formData);
                    }
                }}
                className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden"
            >
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600">Course Title</label>
                            <input
                                name="title"
                                defaultValue={course?.title || ''}
                                required
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
                                placeholder="e.g. BSc in Accounting & Finance"
                            />
                        </div>

                        {/* Slug */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600">URL Slug</label>
                            <input
                                name="slug"
                                defaultValue={course?.slug || ''}
                                required
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
                                placeholder="e.g. bsc-accounting-finance"
                            />
                        </div>

                        {/* Degree Level */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600">Degree Level</label>
                            <select
                                name="degreeLevel"
                                defaultValue={course?.degreeLevel || 'BACHELOR'}
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none"
                            >
                                <option value="BACHELOR">Bachelor's Degree</option>
                                <option value="MASTER">Master's Degree</option>
                            </select>
                        </div>

                        {/* Credits */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600">ECTS Credits</label>
                            <input
                                name="credits"
                                type="number"
                                defaultValue={course?.credits || 180}
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none"
                            />
                        </div>

                        {/* School */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600">School</label>
                            <select
                                name="schoolId"
                                defaultValue={course?.schoolId || schools?.[0]?.id}
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none"
                            >
                                {schools?.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Duration */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600">Duration</label>
                            <input
                                name="duration"
                                defaultValue={course?.duration || '3 years'}
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-neutral-600">Description</label>
                        <textarea
                            name="description"
                            defaultValue={course?.description || ''}
                            rows={4}
                            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none resize-none"
                        />
                    </div>
                </div>

                <div className="bg-neutral-50 p-6 border-t border-neutral-200 flex justify-end">
                    <button
                        type="submit"
                        className="bg-black text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-neutral-800 transition-colors shadow-lg"
                    >
                        <Save size={18} weight="bold" /> {isNew ? 'Create Course' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
