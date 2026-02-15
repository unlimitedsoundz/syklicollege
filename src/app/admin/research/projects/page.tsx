
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Plus, PencilSimple as Pencil, Trash, Microscope } from "@phosphor-icons/react/dist/ssr";
import { deleteResearchProject } from '@/app/admin/actions';

export default async function ResearchProjectsAdmin() {
    const supabase = await createClient();
    const { data: projects } = await supabase
        .from('ResearchProject')
        .select('*')
        .order('createdAt', { ascending: false });

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Microscope size={32} weight="bold" className="text-amber-500" />
                        Research Projects
                    </h1>
                    <p className="text-neutral-500">Manage research projects and publications</p>
                </div>
                <Link href="/admin/research/projects/new" className="bg-neutral-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-neutral-800 transition-colors">
                    <Plus size={18} weight="bold" /> New Project
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                        <tr>
                            <th className="p-4 font-bold text-sm text-neutral-500 uppercase tracking-wider">Title</th>
                            <th className="p-4 font-bold text-sm text-neutral-500 uppercase tracking-wider">Slug</th>
                            <th className="p-4 font-bold text-sm text-neutral-500 uppercase tracking-wider">Funding</th>
                            <th className="p-4 font-bold text-sm text-neutral-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {projects?.map((project) => (
                            <tr key={project.id} className="hover:bg-neutral-50">
                                <td className="p-4 font-medium text-neutral-900">{project.title}</td>
                                <td className="p-4 text-neutral-500">{project.slug}</td>
                                <td className="p-4 text-sm">
                                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-bold">
                                        {project.fundingSource || 'N/A'}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2 justify-end">
                                    <Link href={`/admin/research/projects/${project.id}`} className="p-2 text-neutral-500 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Edit">
                                        <Pencil size={18} weight="bold" />
                                    </Link>
                                    <form action={deleteResearchProject}>
                                        <input type="hidden" name="id" value={project.id} />
                                        <button type="submit" className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                            <Trash size={18} weight="bold" />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {projects?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-neutral-500">
                                    No research projects found. Click "New Project" to add one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
