import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { formatToDDMMYYYY } from '@/utils/date';
import { Plus, CreditCard, WarningCircle as AlertCircle, GraduationCap, SquaresFour as LayoutDashboard } from "@phosphor-icons/react/dist/ssr";
import { Application } from '@/types/database';
import AcademicDashboard from '@/components/portal/AcademicDashboard';
import DeleteApplicationBtn from './DeleteApplicationBtn';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/portal/account/login');
    }

    // Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // Fetch Applications
    const { data: applicationsRaw } = await supabase
        .from('applications')
        .select(`
            *,
            course:Course(title),
            offer:admission_offers(*)
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

    // Fetch Student Record (SIS)
    const { data: student } = await supabase
        .from('students')
        .select(`
            *,
            program:Course(*),
            user:profiles(*)
        `)
        .eq('user_id', user.id)
        .single();

    // If student is enrolled/active, show Academic Dashboard
    // Or if application is ENROLLED but SIS record not found (edge case sync issue), we still treat as enrolled conceptually? 
    // Actually, confirmEnrollment creates the SIS record. So if that succeeded, 'student' should exist. 
    // If 'application.status' is ENROLLED but 'student' is missing, that's a data integrity issue.
    // However, let's also check if user has ANY 'ENROLLED' application to be safe.

    // Auto-switch removed to prefer explicit navigation via button
    // as per user request to "add button" and fix switching issues.

    const enrolledApp = applicationsRaw?.find((app: any) => app.status === 'ENROLLED');

    // Cast the specific structure we asked for
    const applications = applicationsRaw as any[];

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-semibold uppercase tracking-tight text-neutral-900 leading-none">My Applications</h1>
                        {profile?.student_id && (
                            <span className="border border-primary text-primary px-2 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-widest leading-none">
                                ID: {profile.student_id}
                            </span>
                        )}
                    </div>
                    <p className="text-neutral-600 text-xs font-medium uppercase tracking-widest mt-1">
                        Welcome back, <span className="text-primary">{profile?.first_name || user.email}</span>
                    </p>
                </div>
                <Link
                    href="/portal/apply"
                    className="border border-primary text-primary px-4 py-2 rounded-sm text-[10px] font-semibold uppercase tracking-widest hover:bg-neutral-50 transition-all self-start md:self-auto"
                >
                    New Application
                </Link>
            </div>

            {/* Enrolled Student Alert Card */}
            {student && (
                <div className="flex items-start justify-between border-2 border-black p-6 md:p-8 rounded-sm text-black relative overflow-hidden bg-neutral-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                                <GraduationCap size={14} weight="bold" /> Active Student Status
                            </h4>
                            <p className="text-neutral-600 text-[10px] font-bold uppercase tracking-tight mt-1">
                                You are officially enrolled in <span className="text-black">{student.program?.title}</span>. Access your academic tools below.
                            </p>
                        </div>
                        <Link
                            href="/portal/student"
                            className="bg-black text-white px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all whitespace-nowrap shadow-lg"
                        >
                            Enter Student Portal
                        </Link>
                    </div>
                </div>
            )}

            {/* Applications List */}
            {applications && applications.length > 0 ? (
                <div className="grid gap-3">
                    {applications.map((app) => (
                        <div key={app.id}>
                            {/* Decision Alert Card - ADMITTED */}
                            {app.status === 'ADMITTED' && (
                                <div className="flex items-start justify-between border-2 border-black p-6 md:p-8 rounded-sm text-black relative overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
                                        <div>
                                            <h4 className="font-black text-[12px] uppercase tracking-widest flex items-center gap-2">
                                                <GraduationCap size={16} weight="bold" /> Formal Offer of Admission
                                            </h4>
                                            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-tight mt-1">
                                                An official offer letter has been issued. Action is required to secure your place.
                                            </p>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-2">
                                            <Link
                                                href={`/portal/application/${app.id}/letter`}
                                                className="bg-white text-black border-2 border-black px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 transition-all whitespace-nowrap"
                                            >
                                                View Offer Letter
                                            </Link>
                                            <Link
                                                href={`/portal/application/${app.id}/offer/payment`}
                                                className="bg-black text-white px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all whitespace-nowrap flex items-center justify-center gap-2"
                                            >
                                                <CreditCard size={14} weight="bold" />
                                                Pay Tuition
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Payment Pending Alert Card - OFFER_ACCEPTED */}
                            {app.status === 'OFFER_ACCEPTED' && (
                                <div className="flex items-start justify-between border border-neutral-200 p-6 md:p-8 rounded-sm text-neutral-900 relative overflow-hidden bg-white shadow-sm mb-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
                                        <div>
                                            <h4 className="font-black text-[10px] uppercase tracking-widest flex items-center gap-2 text-neutral-500">
                                                <CreditCard size={14} weight="bold" /> Payment Required
                                            </h4>
                                            <p className="text-neutral-900 text-[10px] font-bold uppercase tracking-tight mt-1">
                                                Complete your tuition payment via PayGoWire to secure your enrollment.
                                            </p>
                                        </div>
                                        {app.offer?.[0] && (
                                            <Link
                                                href={`/portal/application/${app.id}/offer/payment`}
                                                className="bg-black text-white px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all whitespace-nowrap"
                                            >
                                                Pay Tuition
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Payment Verification Pending - PAYMENT_SUBMITTED */}
                            {app.status === 'PAYMENT_SUBMITTED' && (
                                <div className="flex items-start justify-between border border-neutral-200 p-6 md:p-8 rounded-sm text-black relative overflow-hidden bg-neutral-50 mb-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
                                        <div>
                                            <h4 className="font-black text-[10px] uppercase tracking-widest flex items-center gap-2 text-black">
                                                <AlertCircle size={14} weight="bold" /> Payment Verification Pending
                                            </h4>
                                            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-tight mt-1">
                                                Your payment has been received. Our team is verifying the transaction before finalizing your enrollment.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-neutral-200">
                                            <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-black">Verifying</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {app.status === 'REJECTED' && (
                                <div className="border border-neutral-200 p-6 rounded-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h4 className="font-semibold text-[10px] uppercase tracking-widest">Decision updated</h4>
                                        <p className="text-neutral-400 text-[10px] font-medium uppercase tracking-tight mt-0.5">A decision has been reached regarding your application.</p>
                                    </div>
                                    <Link
                                        href={`/portal/application/${app.id}`}
                                        className="border border-neutral-200 text-neutral-600 px-4 py-2 rounded-sm text-[10px] font-semibold uppercase tracking-widest hover:bg-neutral-50 transition-all whitespace-nowrap"
                                    >
                                        Details
                                    </Link>
                                </div>
                            )}

                            <div className="bg-white p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all border-b border-neutral-100 hover:bg-neutral-50/50">
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h3 className="font-semibold text-sm uppercase tracking-tight text-neutral-900 leading-none">
                                            {app.course?.title || 'Untitled Application'}
                                            {app.course?.duration && (
                                                <span className="text-neutral-500 font-medium lowercase"> — {app.course.duration}</span>
                                            )}
                                        </h3>
                                        {app.application_number && (
                                            <span className="text-neutral-500 font-medium text-[10px]">#{app.application_number}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest leading-none mt-1">
                                        <span className={`${app.status === 'ADMITTED' || app.status === 'OFFER_ACCEPTED' || app.status === 'ENROLLED' || app.status === 'PAYMENT_SUBMITTED' ? 'text-black' :
                                            app.status === 'REJECTED' ? 'text-neutral-500' :
                                                'text-neutral-600'
                                            }`}>
                                            {app.status.replace('_', ' ')}
                                        </span>
                                        <span className="text-neutral-400">Updated: {formatToDDMMYYYY(app.updated_at)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Draft State */}
                                    {app.status === 'DRAFT' && (
                                        <Link
                                            href={`/portal/application/${app.id}`}
                                            className="px-4 py-2 border border-primary text-primary rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all"
                                        >
                                            Continue
                                        </Link>
                                    )}

                                    {/* Submitted / Under Review */}
                                    {(app.status === 'SUBMITTED' || app.status === 'UNDER_REVIEW') && (
                                        <Link
                                            href={`/portal/application/${app.id}/view`}
                                            className="px-4 py-2 border border-neutral-200 text-neutral-500 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all"
                                        >
                                            View Form
                                        </Link>
                                    )}

                                    {/* Decision / Pay Buttons */}
                                    {app.status === 'ADMITTED' && app.offer?.[0] && (
                                        <Link
                                            href={`/portal/application/${app.id}/letter`}
                                            className="px-4 py-2 bg-black text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-2"
                                        >
                                            <CreditCard size={12} />
                                            View Offer
                                        </Link>
                                    )}

                                    {(app.status === 'ADMITTED' || app.status === 'OFFER_ACCEPTED') && app.offer?.[0] && (
                                        <Link
                                            href={`/portal/application/${app.id}/offer/payment`}
                                            className="px-4 py-2 bg-black text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-2"
                                        >
                                            <CreditCard size={12} />
                                            Pay with PayGoWire
                                        </Link>
                                    )}

                                    {/* Enrolled State */}
                                    {app.status === 'ENROLLED' && (
                                        <Link
                                            href={`/portal/student`}
                                            className="px-4 py-2 bg-black text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-2"
                                        >
                                            <LayoutDashboard size={12} weight="bold" />
                                            Enter Portal
                                        </Link>
                                    )}

                                    {/* Delete Button for non-enrolled */}
                                    {app.status !== 'ENROLLED' && (
                                        <DeleteApplicationBtn id={app.id} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-12 text-center border border-neutral-100 rounded-sm">
                    <h3 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">No active applications</h3>
                    <Link
                        href="/portal/apply"
                        className="inline-block border border-primary text-primary px-6 py-2 rounded-sm text-[10px] font-semibold uppercase tracking-widest hover:bg-neutral-50 transition-all"
                    >
                        Start Journey
                    </Link>
                </div>
            )
            }
            <div className="mt-12 pt-6 border-t border-neutral-200 text-center">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold flex flex-wrap justify-center gap-6">
                    <Link href="/student-handbook" className="hover:text-black transition-colors">Student Handbook</Link>
                    <Link href="/code-of-conduct" className="hover:text-black transition-colors">Code of Conduct</Link>
                    <Link href="/refund-withdrawal-policy" className="hover:text-black transition-colors">Refund Policy</Link>
                </p>
            </div>
        </div >
    );
}
