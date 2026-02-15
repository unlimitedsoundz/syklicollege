
import { createClient } from '@/utils/supabase/server';
import { deleteEvent } from '../actions';
import { Calendar, MapPin, Trash, PencilSimple as Edit } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminEventsPage() {
    const supabase = await createClient();
    const { data: events } = await supabase
        .from('Event')
        .select('*')
        .order('date', { ascending: false });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-neutral-900">Manage Events</h1>
                <Link href="/admin/events/new" className="bg-neutral-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-neutral-800 transition-colors">
                    + New Event
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {events?.map((event) => (
                    <div key={event.id} className="bg-white p-6 rounded-xl border border-neutral-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-black transition-colors group">
                        <div className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-neutral-100 rounded-lg flex flex-col items-center justify-center text-neutral-600">
                                <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{event.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-neutral-500 mt-1">
                                    <span className="flex items-center gap-1"><Calendar size={14} weight="bold" /> {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} weight="bold" /> {event.location || 'Online'}</span>
                                    <span className="px-2 py-0.5 bg-neutral-100 rounded text-xs font-bold uppercase tracking-wider">{event.category}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/admin/events/${event.id}`} className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50" title="Edit">
                                <Edit size={18} weight="bold" />
                            </Link>
                            <form action={async () => {
                                'use server';
                                await deleteEvent(event.id);
                            }}>
                                <button className="p-2 border border-neutral-200 rounded-lg hover:bg-red-50 text-red-600" title="Delete">
                                    <Trash size={18} weight="bold" />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}

                {(!events || events.length === 0) && (
                    <div className="text-center py-20 bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200">
                        <Calendar className="mx-auto mb-4 text-neutral-300" size={48} weight="regular" />
                        <h3 className="text-lg font-bold text-neutral-400">No events found</h3>
                        <p className="text-neutral-400 text-sm mt-1">Start by creating your first campus event.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
