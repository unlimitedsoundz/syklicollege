import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { Application } from '@/types/database';
import Link from 'next/link';
import { CaretLeft as ChevronLeft, CheckCircle, WarningCircle as AlertCircle } from "@phosphor-icons/react/dist/ssr";
import { formatToDDMMYYYY } from '@/utils/date';
import PrintButton from '@/components/portal/PrintButton';
import { acceptOffer } from '@/app/portal/actions';
import RejectOfferButton from './RejectOfferButton';
import Image from 'next/image';

export default async function AdmissionLetterPage(props: {
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
            course:Course(*, school:School(*)),
            user:profiles(*),
            offer:admission_offers(*)
        `)
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (!applicationRaw || !applicationRaw.offer?.[0]) notFound();

    const application = applicationRaw as Application & {
        user: any,
        course: any,
        offer: any[]
    };
    const offer = application.offer[0];
    const today = new Date(); // In real system, this should be offer.created_at

    const showAcceptButton = application.status === 'ADMITTED';

    return (
        <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6">
            {/* Control Bar (Hidden on Print) */}
            <div className="max-w-[210mm] mx-auto mb-8 flex items-center justify-between print:hidden">
                <Link
                    href="/portal/dashboard"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors"
                >
                    <ChevronLeft size={14} weight="bold" />
                    Back to Dashboard
                </Link>
                <div className="flex items-center gap-4">
                    {/* Accept Offer Action - Client Side Wrapper needed for form actions usually, but inline form works for simple cases */}
                    {showAcceptButton && (
                        <form action={async () => {
                            'use server';
                            await acceptOffer(id);
                        }}>
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-sm"
                            >
                                <CheckCircle size={16} weight="bold" />
                                Accept Offer
                            </button>
                        </form>
                    )}
                    {showAcceptButton && (
                        <RejectOfferButton applicationId={id} />
                    )}
                    <PrintButton />
                </div>
            </div>

            {/* Letter Container (A4 Aspect Ratio approx) */}
            <div className="max-w-[210mm] mx-auto bg-white shadow-xl print:shadow-none min-h-[297mm] p-[20mm] md:p-[25mm] relative overflow-hidden text-neutral-900 border border-neutral-100 print:border-0">

                {/* 1. Header: Logo & Address */}
                <div className="flex justify-between items-start mb-16 border-b-2 border-neutral-900 pb-8">
                    <div>
                        <div className="mb-4 relative w-48 h-16">
                            <Image
                                src="/images/sykli-logo-official.png"
                                alt="Sykli College Official Logo"
                                fill
                                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                                priority
                            />
                        </div>
                    </div>
                    <div className="text-right text-[10px] font-medium text-neutral-600 leading-relaxed uppercase tracking-wide">
                        <strong className="text-black">SYKLI College</strong><br />
                        Office of Admissions<br />
                        Pohjoisesplanadi 51<br />
                        00150 Helsinki, Finland<br />
                        <a href="https://syklicollege.fi" className="underline">www.syklicollege.fi</a><br />
                        admissions@syklicollege.fi
                    </div>
                </div>

                <div className="flex justify-between items-end mb-12 text-xs">
                    <div>
                        <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Date</span>
                        <span className="font-bold">{formatToDDMMYYYY(today.toISOString())}</span>
                    </div>
                    <div className="text-right">
                        <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Student ID / Ref</span>
                        <div className="flex items-center gap-2 justify-end">
                            <span className="font-mono bg-neutral-100 px-3 py-1.5 rounded-sm text-xs font-bold">{application.user?.student_id || 'PENDING'}</span>
                            <span className="font-mono bg-neutral-100 px-3 py-1.5 rounded-sm text-xs font-bold">{application.id.slice(0, 8).toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                {/* 2. Greeting */}
                <div className="mb-8">
                    <p className="font-bold text-sm uppercase tracking-wide text-neutral-900">
                        Dear {application.personal_info?.firstName} {application.personal_info?.lastName},
                    </p>
                </div>

                {/* 3. Offer Statement */}
                <div className="mb-8 text-sm leading-relaxed text-neutral-800">
                    <p className="mb-4">
                        We are pleased to offer you admission to Sykli College for the following programme:
                    </p>
                </div>

                {/* 4. Programme Details Table */}
                <div className="bg-neutral-50 border-l-4 border-neutral-900 p-6 mb-10">
                    <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Programme</div>
                            <div className="text-sm font-bold text-neutral-900">{application.course?.title}</div>
                        </div>
                        <div>
                            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Degree Awarded</div>
                            <div className="text-sm font-bold text-neutral-900">{application.course?.degreeLevel === 'MASTER' ? "Master of Science" : "Bachelor of Science"}</div>
                        </div>
                        <div>
                            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Mode of Study</div>
                            <div className="text-sm font-bold text-neutral-900">Full-time, On-campus</div>
                        </div>
                        <div>
                            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Duration</div>
                            <div className="text-sm font-bold text-neutral-900">{application.course?.duration}</div>
                        </div>
                        <div className="col-span-2">
                            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Start Date</div>
                            <div className="text-sm font-bold text-neutral-900">September 1, 2026 (Autumn Semester)</div>
                        </div>
                    </div>
                </div>

                {/* 5. Admission Type */}
                <div className="mb-10">
                    <h4 className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest mb-2 border-b border-neutral-200 pb-1">Admission Type</h4>
                    <div className="text-sm font-bold text-neutral-900">
                        Unconditional Offer
                    </div>
                </div>

                {/* 6. Tuition & Fees Table */}
                <div className="mb-10">
                    <h4 className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest mb-4 border-b border-neutral-200 pb-1">Tuition & Fees</h4>
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-neutral-500 text-[10px] uppercase border-b border-neutral-100">
                                <th className="pb-2 font-bold tracking-widest">Item</th>
                                <th className="pb-2 font-bold tracking-widest text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-neutral-900">
                            <tr className="border-b border-neutral-100">
                                <td className="py-3">Tuition Fee (Year 1)</td>
                                <td className="py-3 text-right font-mono">{offer.currency} {offer.tuition_fee.toLocaleString()}</td>
                            </tr>
                            <tr className="border-b border-neutral-100">
                                <td className="py-3">Enrollment Fee (One-time)</td>
                                <td className="py-3 text-right font-mono">{offer.currency} 0</td>
                            </tr>
                            <tr className="font-bold bg-neutral-50">
                                <td className="py-3 pl-2">Total Due</td>
                                <td className="py-3 pr-2 text-right font-mono">{offer.currency} {offer.tuition_fee.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-2 flex items-start gap-2 text-[10px] text-neutral-500">
                        <AlertCircle size={12} weight="bold" className="mt-0.5" />
                        <p>Payment Deadline: <span className="font-bold text-neutral-700">{formatToDDMMYYYY(offer.payment_deadline)}</span>. Installment plans are not available for the first year tuition. See refund policy at syklicollege.fi/refunds.</p>
                    </div>
                </div>

                {/* 7. Offer Acceptance Instructions */}
                <div className="mb-8 text-sm text-neutral-800 bg-neutral-50 p-4 rounded-sm">
                    <p className="font-bold mb-1">To accept this offer:</p>
                    <p>Log in to the Sykli College Application Portal and click <span className="font-bold">"Accept Offer"</span> before the deadline. Failure to accept by the deadline may result in the withdrawal of this offer.</p>
                </div>

                {/* 8. Visa & Immigration Statement */}
                <div className="mb-8 text-xs text-neutral-600 italic border-l-2 border-neutral-300 pl-3">
                    "This admission offer is valid for the purpose of applying for a student residence permit, subject to tuition payment and enrollment confirmation."
                </div>

                {/* 9. Academic & Conduct Policies */}
                <div className="mb-12 text-[10px] text-neutral-500">
                    <p className="mb-1">By accepting this offer, you agree to comply with Sykli College's <a href="#" className="underline">Academic Integrity Policy</a> and <a href="#" className="underline">Student Code of Conduct</a>.</p>
                </div>

                {/* 10. Closing & Signature */}
                <div className="mt-12 pt-8 border-t-2 border-neutral-900 flex justify-between items-end">
                    <div>
                        <div className="w-48 h-20 mb-2 relative">
                            <Image
                                src="/images/official-signature.png"
                                alt="Signature"
                                fill
                                style={{ objectFit: 'contain', objectPosition: 'left bottom' }}
                            />
                        </div>
                        <div className="text-sm font-bold text-neutral-900 uppercase">
                            Dr. Arvis Hallik
                        </div>
                        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest leading-none mt-1">
                            Head of Admissions & Registration
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-[10mm] left-[20mm] right-[20mm] border-t border-neutral-100 pt-2 flex justify-between items-center opacity-60">
                    <div className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                        Sykli Educational Services | Pohjoisesplanadi 51, 00150 Helsinki, Finland
                    </div>
                    <div className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                        Page 1 of 1
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
