import { createClient } from '@/utils/supabase/server';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import NewsForm from './NewsForm';

export default async function NewsEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === 'new';
    const supabase = await createClient();

    let item: any = null;
    if (!isNew) {
        const { data } = await supabase.from('News').select('*').eq('id', id).single();
        item = data;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <Link href="/admin/news" className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors font-bold">
                    <ArrowLeft size={18} weight="bold" /> Back to News
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'New Article' : 'Edit Article'}</h1>
            </div>

            <NewsForm id={id} isNew={isNew} newsItem={item} />
        </div>
    );
}
