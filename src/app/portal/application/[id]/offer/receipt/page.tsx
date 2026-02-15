import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { CaretLeft as ChevronLeft } from "@phosphor-icons/react/dist/ssr";
import { formatToDDMMYYYY } from '@/utils/date';
import PrintButton from '@/components/portal/PrintButton';
import Image from 'next/image';

export default async function TuitionReceiptPage(props: {
    params: Promise<{ id: string }>
}) {
    const { id } = await props.params;
    const supabase = await createClient();

    // Verify Access
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    const { data: applicationRaw } = await supabase
        .from('applications')
        .select(`
            *,
            course:Course(*),
            offer:admission_offers(*, payments:tuition_payments(*))
        `)
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (!applicationRaw || !applicationRaw.offer?.[0]) notFound();

    const application = applicationRaw;
    const offer = application.offer[0];
    const payment = offer.payments?.[0]; // Assuming single payment for now

    if (!payment) {
        // No payment found, redirect to payment page
        redirect(`/portal/application/${id}/offer/payment`);
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 font-rubik">
            {/* Control Bar (Hidden on Print) */}
            <div className="max-w-[210mm] mx-auto mb-8 flex items-center justify-between print:hidden">
                <Link
                    href="/portal/dashboard"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors"
                >
                    <ChevronLeft size={14} weight="bold" />
                    Back to Dashboard
                </Link>
                <PrintButton />
            </div>

            {/* Document Container */}
            <div className="max-w-[210mm] mx-auto bg-white shadow-xl print:shadow-none min-h-[148mm] p-[15mm] border border-neutral-100 print:border-0 relative">

                <div className="flex justify-between items-start mb-8 border-b border-neutral-200 pb-4">
                    <div>
                        <div className="mb-2 relative w-32 h-10">
                            <Image
                                src="/images/sykli-logo-official.png"
                                alt="Sykli College"
                                fill
                                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                            />
                        </div>
                        <div className="text-[9px] text-neutral-500 uppercase tracking-widest">Financial Services Office</div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-neural-900 uppercase">Payment Receipt</div>
                        <div className="text-[10px] font-mono text-neutral-500">{payment.transaction_reference}</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                    <div>
                        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Received From</div>
                        <div className="font-bold text-neutral-900">{application.personal_info?.firstName} {application.personal_info?.lastName}</div>
                        <div className="text-neutral-500 text-xs">{application.contact_details?.address}, {application.contact_details?.country}</div>
                    </div>
                    <div>
                        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Payment Details</div>
                        <div className="flex justify-between py-1 border-b border-neutral-100">
                            <span className="text-neutral-600">Date Received</span>
                            <span className="font-mono">{formatToDDMMYYYY(payment.created_at)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-neutral-100">
                            <span className="text-neutral-600">Method</span>
                            <span>{payment.payment_method?.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="flex justify-between py-1 font-bold">
                            <span>Amount Paid</span>
                            <span>{offer.currency} {payment.amount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-50 p-4 rounded-sm text-xs text-neutral-600 mb-8">
                    <p className="font-bold uppercase tracking-wide mb-1">Payment For:</p>
                    <p>Tuition Fees - {application.course?.title} (Year 1)</p>
                    <p>Academic Year 2026/2027</p>
                </div>

                <div className="text-[10px] text-neutral-400 text-center uppercase tracking-widest mb-4">
                    This is an electronically generated receipt and is valid without a signature.
                </div>

                <div className="border-t border-neutral-100 pt-2 text-center opacity-60">
                    <div className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                        Sykli Educational Services | Pohjoisesplanadi 51, 00150 Helsinki, Finland
                    </div>
                </div>
            </div>
            {/* Print Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { margin: 0; }
                    body { background: white; padding: 0; }
                    .min-h-screen { min-height: 0; background: white; padding: 0; }
                    .max-w-[210mm] { max-width: 100%; margin: 0; padding: 0; }
                    .shadow-xl { box-shadow: none !important; }
                    .print\\:hidden { display: none !important; }
                    .print\\:border-0 { border: none !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                }
            ` }} />
        </div>
    );
}
