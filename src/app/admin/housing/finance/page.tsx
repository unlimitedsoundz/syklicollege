import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import FinanceManagementClient from './FinanceManagementClient';

export default async function AdminHousingFinancePage() {
    const supabase = await createClient();

    // Check authentication and admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'ADMIN') {
        redirect('/portal/dashboard');
    }

    // Fetch all invoices with student details
    const { data: invoices, error: invError } = await supabase
        .from('housing_invoices')
        .select('*, student:students(id, student_id, user:profiles(*)), items:housing_invoice_items(*)')
        .order('created_at', { ascending: false });

    // Fetch all payments
    const { data: payments, error: payError } = await supabase
        .from('housing_payments')
        .select('*, student:students(id, user:profiles(first_name, last_name)), invoice:housing_invoices(reference_number)')
        .order('created_at', { ascending: false });

    // Fetch initial students for selection
    const { data: students } = await supabase
        .from('students')
        .select('*, user:profiles(first_name, last_name)')
        .limit(100);

    return (
        <div className="min-h-screen bg-neutral-50/50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin/housing"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Housing Management
                    </Link>
                </div>

                <FinanceManagementClient
                    initialInvoices={invoices || []}
                    initialPayments={payments || []}
                    students={students || []}
                />
            </div>
        </div>
    );
}
