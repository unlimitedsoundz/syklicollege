import { createClient } from '@/utils/supabase/server';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import EventForm from './EventForm';

export default async function EventEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === 'new';
    const supabase = await createClient();

    let event: any = null;
    if (!isNew) {
        const { data } = await supabase.from('Event').select('*').eq('id', id).single();
        event = data;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <Link href="/admin/events" className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors font-bold">
                    <ArrowLeft size={18} weight="bold" /> Back to Events
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'Create New Event' : 'Edit Event'}</h1>
            </div>

            <EventForm id={id} isNew={isNew} eventItem={event} />
        </div>
    );
}
