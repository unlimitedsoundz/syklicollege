
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import HousingDashboardClient from './HousingClient';

export default async function HousingPage() {
    const supabase = await createClient();

    // 1. Auth & Student Context
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    const { data: student } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .single();

    if (!student) redirect('/portal/dashboard');

    // 2. Fetch Housing Application (most recent)
    const { data: application } = await supabase
        .from('housing_applications')
        .select(`
            *,
            deposit:housing_deposits(*)
        `)
        .eq('student_id', student.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    // 3. Fetch Housing Assignment (if exists)
    const { data: assignment } = await supabase
        .from('housing_assignments')
        .select(`
            *,
            room:housing_rooms(*, building:housing_buildings(*))
        `)
        .eq('student_id', student.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    // 4. Fetch available buildings
    const { data: buildings } = await supabase
        .from('housing_buildings')
        .select('*')
        .order('name');

    // 5. Fetch active/upcoming semesters
    const { data: semesters } = await supabase
        .from('semesters')
        .select('*')
        .order('start_date');

    // 6. Fetch invoices
    const { data: invoices } = await supabase
        .from('housing_invoices')
        .select(`
            *,
            items:housing_invoice_items(*),
            payments:housing_payments(*)
        `)
        .eq('student_id', student.id)
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-neutral-50/50 p-2 md:p-6 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="mb-4">
                    <Link
                        href="/portal/student"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Dashboard
                    </Link>
                </div>

                <HousingDashboardClient
                    application={application}
                    assignment={assignment}
                    buildings={buildings || []}
                    semesters={semesters || []}
                    invoices={invoices || []}
                />
            </div>
        </div>
    );
}
