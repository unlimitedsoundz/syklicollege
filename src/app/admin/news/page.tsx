import { createClient } from '@/utils/supabase/server';
import { News } from '@/types/database';
import { deleteNews } from '../actions';
import { Trash, PencilSimple as Edit } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import { formatToDDMMYYYY } from '@/utils/date';

export const revalidate = 0;

export default async function AdminNewsPage() {
    const supabase = await createClient();
    const { data: news } = await supabase
        .from('News')
        .select('*')
        .order('publishDate', { ascending: false });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-neutral-900">Manage News</h1>
                <Link href="/admin/news/new" className="bg-neutral-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-neutral-800 transition-colors">
                    + New Article
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                        <tr>
                            <th className="p-4 font-semibold text-neutral-600">Title</th>
                            <th className="p-4 font-semibold text-neutral-600">Published</th>
                            <th className="p-4 font-semibold text-neutral-600 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {(news as News[])?.map((item) => (
                            <tr key={item.id} className="hover:bg-neutral-50 group">
                                <td className="p-4 font-medium text-neutral-900">{item.title}</td>
                                <td className="p-4 text-neutral-600">{formatToDDMMYYYY(item.publishDate)}</td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/admin/news/${item.id}`} className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50" title="Edit">
                                            <Edit size={16} weight="bold" />
                                        </Link>
                                        <form action={async () => {
                                            'use server';
                                            await deleteNews(item.id);
                                        }}>
                                            <button className="p-2 border border-neutral-200 rounded-lg hover:bg-red-50 text-red-600" title="Delete">
                                                <Trash size={16} weight="bold" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
