import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import {
    CaretLeft as ChevronLeft,
    CheckCircle as CheckCircle2,
    XCircle,
    Calendar,
    CurrencyEur as Euro,
    FileText,
    ShieldCheck,
    CaretRight as ArrowRight,
    CreditCard,
    Lightning as Zap,
    DownloadSimple as Download
} from "@phosphor-icons/react/dist/ssr";
import { respondToOffer } from './actions';
import PayButton from './PayButton';
import { calculateDiscountedFee, EARLY_PAYMENT_DISCOUNT_PERCENT } from '@/utils/tuition';
import { formatToDDMMYYYY } from '@/utils/date';

export default async function OfferPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: application } = await supabase
        .from('applications')
        .select(`
            *,
            course:Course(*),
            offer:admission_offers(*)
        `)
        .eq('id', id)
        .single();

    if (!application || !application.offer?.[0]) {
        notFound();
    }

    const offer = application.offer[0];

    const isEarly = new Date() <= new Date(offer.payment_deadline);
    const baseFee = offer.tuition_fee;
    const discountedFee = calculateDiscountedFee(baseFee);
    const finalFee = isEarly ? discountedFee : baseFee;

    if (offer.status !== 'PENDING') {
        // Show status page or redirect to dashboard
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 pb-20">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/portal/dashboard" className="p-1 hover:bg-neutral-50 rounded transition-colors">
                        <ChevronLeft size={16} weight="bold" className="text-black" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-semibold uppercase tracking-tight text-primary">Admission Offer</h1>
                        <p className="text-black text-sm font-medium uppercase tracking-widest">Official Enrollment Invitation</p>
                    </div>
                </div>
                {(offer.status === 'ACCEPTED' || (offer.status === 'PENDING' && application.status === 'ADMITTED')) && application.status !== 'ENROLLED' && (
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href={`/portal/application/${id}/letter`}
                            className="bg-white text-neutral-600 border border-neutral-200 rounded-sm px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Download size={14} weight="bold" />
                            Download Letter
                        </Link>
                        <Link
                            href={`/portal/application/${id}/offer/payment`}
                            className="bg-[#00A651] text-white rounded-sm px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#008c44] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/10 group"
                        >
                            <CreditCard size={14} weight="bold" />
                            Pay Tuition
                            <ArrowRight size={12} weight="bold" className="group-hover:translate-x-1 transition-all" />
                        </Link>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Offer Content */}
                <div className="lg:col-span-8 space-y-8 md:space-y-12">
                    <div className="space-y-8 md:space-y-12">
                        <section className="p-8 rounded-sm border border-primary">
                            <h2 className="text-2xl font-bold uppercase tracking-tight text-primary leading-none mb-3">Admission Granted</h2>
                            <p className="text-black font-semibold text-sm leading-relaxed max-w-lg uppercase tracking-tight">
                                Invitation for enrollment into the <span className="text-primary">{application.course?.title}</span> program.
                                {application.course?.duration && (
                                    <span className="text-black block mt-1 font-medium lowercase text-sm">Duration: {application.course.duration}</span>
                                )}
                            </p>
                        </section>

                        <div className="space-y-8 md:space-y-10">
                            <section className="space-y-6">
                                <h3 className="text-sm font-semibold uppercase tracking-widest text-black pb-2 border-b border-neutral-100 mb-6">Program Details</h3>

                                <div className="p-8 rounded-sm border border-neutral-100 space-y-8">
                                    <div>
                                        <h2 className="text-sm font-semibold text-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                            <CheckCircle2 size={16} weight="bold" className="text-primary" />
                                            Admission Granted
                                        </h2>
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-bold text-neutral-900 leading-tight">
                                                {application.course?.title}
                                                {application.course?.duration && (
                                                    <span className="text-black block mt-1 font-medium lowercase text-sm">Duration: {application.course.duration}</span>
                                                )}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-neutral-100">
                                        <div className="space-y-6">
                                            <h4 className="text-sm font-bold text-black uppercase tracking-[0.2em]">Financial Obligation</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-black uppercase tracking-widest leading-none">Tuition Fee</p>
                                                    <p className="text-2xl font-bold text-primary">€{offer.tuition_fee}</p>
                                                    <p className="text-sm font-medium text-black  lowercase tracking-tight">Per academic year</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-black uppercase tracking-widest leading-none">Response Deadline</p>
                                                    <p className="text-2xl font-bold text-primary">{formatToDDMMYYYY(offer.payment_deadline)}</p>
                                                    <p className="text-sm font-medium text-black  lowercase tracking-tight">Required for session reservation</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-primary p-6 md:p-12 rounded-sm text-primary relative overflow-hidden">
                                    <div className="relative z-10 space-y-3">
                                        <h4 className="text-sm font-bold uppercase tracking-widest leading-none">Incentive Plan</h4>
                                        <p className="text-black text-sm font-medium leading-relaxed uppercase tracking-tight">
                                            Confirm and settle payment by <span className="font-bold text-primary">{formatToDDMMYYYY(offer.payment_deadline)}</span> to receive a {EARLY_PAYMENT_DISCOUNT_PERCENT}% early enrollment credit.
                                        </p>
                                        <div className="pt-2 flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-primary">€{calculateDiscountedFee(offer.tuition_fee)}</span>
                                            <span className="text-sm font-semibold text-black uppercase tracking-widest">Discounted Rate</span>
                                        </div>
                                    </div>
                                    <Zap className="absolute -bottom-4 -right-4 w-24 h-24 text-primary opacity-5 -rotate-12" weight="bold" />
                                </div>
                            </section>

                            <div className=" text-black text-sm font-medium leading-relaxed uppercase tracking-tight border-l-2 border-primary pl-4">
                                "Acceptance of this offer signifies agreement to abide by the academic regulations and financial policies of Sykli College."
                            </div>
                        </div>
                    </div>
                </div>

                {/* Response Sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-8 space-y-6">
                        {offer.status === 'PENDING' ? (
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-black">Your Decision</h4>
                                    <p className="text-primary text-sm font-bold uppercase tracking-tight">Action Required</p>
                                </div>

                                <div className="space-y-3">
                                    <form action={async () => {
                                        'use server';
                                        await respondToOffer(offer.id, application.id, 'ACCEPT');
                                    }}>
                                        <button className="w-full border border-primary text-primary rounded-sm py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all flex items-center justify-center gap-2">
                                            Confirm Acceptance
                                        </button>
                                    </form>

                                    <form action={async () => {
                                        'use server';
                                        await respondToOffer(offer.id, application.id, 'DECLINE');
                                    }}>
                                        <button className="w-full text-black py-3 text-sm font-semibold uppercase tracking-widest hover:text-red-500 transition-all hover:bg-neutral-50 rounded-sm">
                                            Decline Position
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className="py-4 space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-black leading-none mb-1">Status</h4>
                                    <p className="text-primary text-lg font-bold uppercase tracking-tight">
                                        Offer {offer.status}
                                    </p>
                                    <p className="text-black text-sm font-medium mt-2 uppercase tracking-tight leading-relaxed mb-6">
                                        {offer.status === 'ACCEPTED'
                                            ? (application.status === 'ENROLLED'
                                                ? 'Your enrollment is confirmed and your student account is active.'
                                                : 'Finalize enrollment by completing the tuition payment below.')
                                            : 'This admission offer has been declined.'}
                                    </p>
                                    {application.status === 'ENROLLED' && (
                                        <Link
                                            href={`/portal/enrollment/${application.id}`}
                                            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-sm"
                                        >
                                            Next Steps & Orientation
                                            <ArrowRight size={14} weight="bold" />
                                        </Link>
                                    )}
                                </div>

                                {(offer.status === 'ACCEPTED' || (offer.status === 'PENDING' && application.status === 'ADMITTED')) && application.status !== 'ENROLLED' && (
                                    <div className="space-y-4">
                                        <Link
                                            href={`/portal/application/${id}/letter`}
                                            className="w-full flex items-center justify-center gap-2 bg-white text-neutral-600 border border-neutral-200 px-6 py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all shadow-sm"
                                        >
                                            <Download size={16} weight="bold" />
                                            Download Formal Letter
                                        </Link>
                                        <PayButton
                                            href={`/portal/application/${id}/offer/payment`}
                                        />
                                        {isEarly && (
                                            <p className="text-sm font-bold uppercase tracking-widest text-[#00A651] text-center">
                                                Early Payment Discount Applied
                                            </p>
                                        )}
                                    </div>
                                )}

                                <Link href="/portal/dashboard" className="inline-block pt-2 text-sm font-semibold uppercase tracking-widest text-primary hover:underline transition-all">
                                    Return to Dashboard
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
