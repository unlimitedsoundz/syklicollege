
import { createClient } from '@/utils/supabase/server';
import { createSubject, updateSubject } from '../../actions';
import { CaretLeft as ArrowLeft, FloppyDisk as Save, Book, Hash, Stack as Layers } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';

export default async function SubjectEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === 'new';
    const supabase = await createClient();

    let subject: any = null;
    if (!isNew) {
        const { data } = await supabase.from('Subject').select('*').eq('id', id).single();
        subject = data;
    }

    // Fetch courses for selection
    const { data: courses } = await supabase.from('Course').select('id, title').order('title');

    return (
        <div className="max-w-4xl mx-auto pt-12 pl-12">
            <div className="mb-8 flex items-center justify-between">
                <Link href="/admin/subjects" className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors font-bold">
                    <ArrowLeft size={18} weight="bold" /> Back to Subjects
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'New Subject' : 'Edit Subject'}</h1>
            </div>

            <form
                action={async (formData: FormData) => {
                    'use server';
                    if (isNew) {
                        await createSubject(formData);
                    } else {
                        await updateSubject(id, formData);
                    }
                }}
                className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden"
            >
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600 flex items-center gap-1"><Book size={14} weight="bold" /> Subject Name</label>
                            <input
                                name="name"
                                defaultValue={subject?.name || ''}
                                required
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none"
                                placeholder="e.g. Introduction to Renewable Energy"
                            />
                        </div>

                        {/* Code */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600 flex items-center gap-1"><Hash size={14} weight="bold" /> Subject Code</label>
                            <input
                                name="code"
                                defaultValue={subject?.code || ''}
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none"
                                placeholder="e.g. RE101"
                            />
                        </div>

                        {/* Course Association */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600">Associated Course</label>
                            <select
                                name="courseId"
                                defaultValue={subject?.courseId || courses?.[0]?.id}
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none"
                            >
                                {courses?.map(c => (
                                    <option key={c.id} value={c.id}>{c.title}</option>
                                ))}
                            </select>
                        </div>

                        {/* ECTS Credits */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600">Credits (ECTS)</label>
                            <input
                                name="creditUnits"
                                type="number"
                                defaultValue={subject?.creditUnits || 5}
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none"
                            />
                        </div>

                        {/* Semester */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-neutral-600 flex items-center gap-1"><Layers size={14} weight="bold" /> Semester</label>
                            <input
                                name="semester"
                                type="number"
                                min="1"
                                max="8"
                                defaultValue={subject?.semester || 1}
                                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-50 p-6 border-t border-neutral-200 flex justify-end">
                    <button
                        type="submit"
                        className="bg-black text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-neutral-800 transition-colors shadow-lg"
                    >
                        <Save size={18} weight="bold" /> {isNew ? 'Create Subject' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
