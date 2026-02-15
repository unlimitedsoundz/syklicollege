
import { createClient } from '@/utils/supabase/server';
import { createResearchProject, updateResearchProject } from '@/app/admin/actions';
import { notFound } from 'next/navigation';
import { CaretLeft as ArrowLeft, FloppyDisk as Save } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';

export default async function ResearchProjectForm({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === 'new';
    let project = null;

    if (!isNew) {
        const supabase = await createClient();
        const { data } = await supabase.from('ResearchProject').select('*').eq('id', id).single();
        if (!data) return notFound();
        project = data;
    }

    const action = isNew ? createResearchProject : updateResearchProject.bind(null, id);

    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/admin/research/projects" className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 transition-colors">
                <ArrowLeft size={18} weight="bold" /> Back to Projects
            </Link>

            <h1 className="text-3xl font-bold mb-8">
                {isNew ? 'New Research Project' : `Edit: ${project?.title}`}
            </h1>

            <form action={action} className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-700">Project Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            defaultValue={project?.title || ''}
                            className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                            placeholder="e.g. Carbon Neutral Construction 2030"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-700">Slug (URL)</label>
                        <input
                            type="text"
                            name="slug"
                            required
                            defaultValue={project?.slug || ''}
                            className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                            placeholder="e.g. carbon-neutral-2030"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-700">Lead Researcher</label>
                        <input
                            type="text"
                            name="leadResearcher"
                            defaultValue={project?.leadResearcher || ''}
                            className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                            placeholder="e.g. Dr. Sarah Mitchell"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-700">Funding Source</label>
                        <input
                            type="text"
                            name="fundingSource"
                            defaultValue={project?.fundingSource || ''}
                            className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                            placeholder="e.g. EU Horizon"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-700">Short Description</label>
                    <textarea
                        name="description"
                        required
                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all h-24"
                        defaultValue={project?.description || ''}
                        placeholder="Brief summary shown on the listing page..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-700">Full Content</label>
                    <textarea
                        name="content"
                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all h-64 font-mono text-sm"
                        defaultValue={project?.content || ''}
                        placeholder="Markdown content or HTML..."
                    />
                    <p className="text-xs text-neutral-500">HTML or Markdown supported.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-700">Cover Image</label>
                    {project?.imageUrl && (
                        <div className="w-32 h-32 relative mb-2 rounded-lg overflow-hidden bg-neutral-100">
                            <img src={project.imageUrl} alt="Current" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full p-3 border border-neutral-300 rounded-lg"
                    />
                </div>

                <div className="pt-6 border-t border-neutral-100 flex justify-end">
                    <button type="submit" className="bg-neutral-900 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-neutral-800 transition-colors">
                        <Save size={18} weight="bold" /> {isNew ? 'Create Project' : 'Update Project'}
                    </button>
                </div>
            </form>
        </div>
    );
}
