'use client';

import { createClient } from '@/utils/supabase/client';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CaretLeft as ChevronLeft } from "@phosphor-icons/react/dist/ssr";
import { formatToDDMMYYYY } from '@/utils/date';
import PrintButton from '@/components/portal/PrintButton';
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';

function AdmissionLetterContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [admission, setAdmission] = useState<any>(null);
    const [payment, setPayment] = useState<any>(null);

    useEffect(() => {
        if (!id) {
            router.push('/portal/dashboard');
            return;
        }

        const fetchData = async () => {
            const supabase = createClient();
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push('/portal/account/login');
                    return;
                }

                // Fetch Application with Offer and Payments
                const { data: applicationRaw, error } = await supabase
                    .from('applications')
                    .select(`
                        *,
                        course:Course(*),
                        offer:admission_offers(*, payments:tuition_payments(*))
                    `)
                    .eq('id', id)
                    .eq('user_id', user.id)
                    .single();

                if (error || !applicationRaw) {
                    setData(null);
                    return;
                }

                setData(applicationRaw);

                // Fetch admission details
                const { data: admissionData } = await supabase
                    .from('admissions')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('program', applicationRaw.course?.title)
                    .maybeSingle();

                if (admissionData) setAdmission(admissionData);

                // Get completed payment
                const completedPayment = applicationRaw.offer?.[0]?.payments?.find((p: any) => p.status === 'COMPLETED');
                setPayment(completedPayment);

            } catch (e) {
                console.error('Error fetching admission letter data:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-neutral-200 border-t-black rounded-full animate-spin"></div>
                    <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">Loading Admission Letter...</p>
                </div>
            </div>
        );
    }

    if (!data) return notFound();

    const application = data;
    // Check if enrolled or admitted/paid
    const isEnrolled = application.status === 'ENROLLED' || (application.status === 'ADMITTED' && payment);

    if (!isEnrolled) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 text-center max-w-sm">
                    <h1 className="text-xl font-black uppercase mb-2">Access Denied</h1>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-tight">
                        Official Admission Letter is only available after tuition payment confirmation.
                    </p>
                    <Link href="/portal/dashboard" className="block mt-6 text-xs font-bold underline">Return to Dashboard</Link>
                </div>
            </div>
        );
    }

    const today = new Date();
    const issueDate = admission?.created_at ? formatToDDMMYYYY(admission.created_at) : formatToDDMMYYYY(today.toISOString());
    const academicYear = admission?.academic_year || '2026/2027';
    const intake = admission?.intake || 'Autumn 2026';
    const programStart = '24th August 2026'; // Hardcoded as per previous logic

    return (
        <div className="min-h-screen bg-neutral-100/50 py-6 md:py-12 px-4 sm:px-6 font-rubik">
            {/* Control Bar */}
            <div className="max-w-[210mm] mx-auto mb-8 flex items-center justify-between print:hidden">
                <Link
                    href="/portal/dashboard"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
                >
                    <ChevronLeft size={14} weight="bold" />
                    Back to Dashboard
                </Link>
                <PrintButton />
            </div>

            {/* Document Container - A4 Size */}
            <div className="w-full max-w-[210mm] mx-auto bg-white print:shadow-none p-[15mm] md:p-[20mm] border border-neutral-200 print:border-0 relative overflow-hidden min-h-[297mm] flex flex-col justify-between">

                {/* Content Wrapper */}
                <div>
                    {/* 1. Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0 mb-8 border-b-2 border-black pb-6">
                        <div className="space-y-4">
                            <div className="relative w-40 h-10">
                                <Image
                                    src="/images/sykli-logo-official.png"
                                    alt="Sykli College"
                                    fill
                                    style={{ objectFit: 'contain', objectPosition: 'left center' }}
                                />
                            </div>
                        </div>
                        <div className="text-left md:text-right text-[9px] font-medium text-neutral-600 leading-relaxed uppercase tracking-wide">
                            <strong className="text-black block mb-1">SYKLI College Registrar</strong>
                            Pohjoisesplanadi 51<br />
                            00150 Helsinki, Finland<br />
                            Website: https://syklicollege.fi<br />
                            Email: admissions@syklicollege.fi
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black uppercase tracking-[0.1em] text-black">Official Admission Letter</h1>
                    </div>

                    {/* 2. Meta Data */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-neutral-50 p-4 mb-8 border border-neutral-100">
                        <div>
                            <span className="block text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-1">Enrollment Date</span>
                            <span className="font-bold text-xs">{issueDate}</span>
                        </div>
                        <div>
                            <span className="block text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-1">Admission Reference</span>
                            <span className="font-bold text-xs font-mono">{admission?.admission_reference || 'PENDING'}</span>
                        </div>
                        <div>
                            <span className="block text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-1">Official Student ID</span>
                            <span className="font-bold text-xs font-mono">{admission?.student_id || application.user?.student_id || 'PENDING'}</span>
                        </div>
                    </div>

                    {/* 3. Confirmation Box (Locked Wording) */}
                    <div className="border-l-4 border-black pl-6 py-2 mb-8 bg-neutral-50/50">
                        <p className="text-sm font-medium text-neutral-900 leading-relaxed italic">
                            “We are pleased to confirm that you have been officially admitted and enrolled as a student of SYKLI College for the above-named programme and academic year.”
                        </p>
                    </div>

                    {/* 4. Student & Program Info Grid */}
                    <div className="mb-8">
                        <h4 className="text-[10px] font-black text-neutral-900 uppercase tracking-widest mb-3 border-b border-neutral-200 pb-1">Student Information & Enrollment Status</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Full Legal Name</div>
                                <div className="text-sm font-bold text-neutral-900">{application.personal_info?.firstName} {application.personal_info?.lastName}</div>
                            </div>
                            <div>
                                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Student ID</div>
                                <div className="text-sm font-bold text-neutral-900">{admission?.student_id || application.user?.student_id || 'Generating...'}</div>
                            </div>
                            <div>
                                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Programme</div>
                                <div className="text-sm font-bold text-neutral-900">{application.course?.title}</div>
                            </div>
                            <div>
                                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Degree Level</div>
                                <div className="text-sm font-bold text-neutral-900">{application.course?.degreeLevel}</div>
                            </div>
                            <div>
                                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Academic Year</div>
                                <div className="text-sm font-bold text-neutral-900">{academicYear}</div>
                            </div>
                            <div>
                                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Intake</div>
                                <div className="text-sm font-bold text-neutral-900">{intake}</div>
                            </div>
                            <div>
                                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Enrollment Status</div>
                                <div className="text-sm font-black text-black uppercase">Active</div>
                            </div>
                            <div>
                                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Programme Start</div>
                                <div className="text-sm font-bold text-neutral-900">{programStart}</div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Tuition Confirmation */}
                    <div className="mb-8">
                        <h4 className="text-[10px] font-black text-neutral-900 uppercase tracking-widest mb-3 border-b border-neutral-200 pb-1">Tuition Confirmation</h4>
                        <div className="bg-neutral-50 p-4 border border-neutral-100 text-xs">
                            <p className="font-medium text-neutral-800 mb-2">
                                The required tuition fees for the first academic year have been received and confirmed.
                            </p>
                            {payment && (
                                <p className="text-[10px] text-neutral-500 font-mono">
                                    Official Receipt Reference: <span className="text-black font-bold">{payment.transaction_reference}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 6. Rights & Access */}
                    <div className="mb-6">
                        <h4 className="text-[10px] font-black text-neutral-900 uppercase tracking-widest mb-2 border-b border-neutral-200 pb-1">Rights & Access</h4>
                        <p className="text-[10px] leading-relaxed text-neutral-600">
                            As a fully enrolled student, you are entitled to access all campus facilities, library resources, student support services, and the digital learning environment (Canvas/LMS). You are also eligible to apply for student housing and student union membership.
                        </p>
                    </div>

                    {/* 7. Official Use Statement */}
                    <div className="mb-6">
                        <h4 className="text-[10px] font-black text-neutral-900 uppercase tracking-widest mb-2 border-b border-neutral-200 pb-1">Immigration / Official Use</h4>
                        <p className="text-[10px] leading-relaxed text-neutral-600">
                            This document is an official certificate of admission and may be used for visa applications, residence permit processing (Migri), and other official purposes requiring proof of student status in Finland.
                        </p>
                    </div>

                    {/* 8. Next Steps */}
                    <div className="mb-6">
                        <h4 className="text-[10px] font-black text-neutral-900 uppercase tracking-widest mb-2 border-b border-neutral-200 pb-1">Next Steps</h4>
                        <ul className="text-[10px] leading-relaxed text-neutral-600 list-disc ml-4 space-y-1">
                            <li>Activate your student email and IT account (credentials sent separately).</li>
                            <li>Register for the orientation week sessions via the student portal.</li>
                            <li>Submit your housing application if you have not done so.</li>
                            <li>Arrival instructions will be communicated to your student email.</li>
                        </ul>
                    </div>

                    {/* 9. Refund Policy */}
                    <div className="mb-8">
                        <h4 className="text-[10px] font-black text-neutral-900 uppercase tracking-widest mb-2 border-b border-neutral-200 pb-1">Refund Policy</h4>
                        <p className="text-[10px] leading-relaxed text-neutral-600">
                            Tuition fees are subject to the college’s refund policy. Full details can be found at <a href="https://syklicollege.fi/admissions/tuition/" className="underline text-black">https://syklicollege.fi/admissions/tuition/</a>.
                        </p>
                    </div>

                </div>

                {/* Footer Content */}
                <div>
                    {/* 10. Authorization */}
                    <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-row justify-between items-end">
                        <div>
                            <div className="w-40 h-16 mb-2 relative">
                                <Image
                                    src="/images/anna-virtanen-signature.jpg"
                                    alt="Official Signature"
                                    fill
                                    style={{ objectFit: 'contain', objectPosition: 'left bottom' }}
                                />
                            </div>
                            <div className="text-xs font-black text-black uppercase">Office of the Registrar</div>
                            <div className="text-[10px] font-bold text-neutral-900 mt-0.5">Dosentti (Docent) Anna Virtanen, FT (Doctor of Philosophy)</div>
                            <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">SYKLI College | Finland</div>
                        </div>
                        <div className="text-right">
                            {/* Authentication Code or QR could go here in future */}
                        </div>
                    </div>

                    {/* Footer Legal */}
                    <div className="mt-8 text-center border-t border-neutral-100 pt-4">
                        <p className="text-[8px] text-neutral-400 uppercase tracking-widest">
                            Generated electronically via Sykli SIS. Valid without physical signature if verified online.
                        </p>
                    </div>
                </div>

            </div>
            {/* Print Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { margin: 0; size: A4; }
                    body { background: white; padding: 0; }
                    .min-h-screen { min-height: 0; background: white; padding: 0; }
                    .max-w-[210mm] { max-width: 100%; margin: 0; padding: 0; }
                    .shadow-xl, .shadow-sm { box-shadow: none !important; }
                    .print\\:hidden { display: none !important; }
                    .print\\:border-0 { border: none !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    /* Force background graphics for logos */
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                }
            ` }} />
        </div>
    );
}

export default function AdmissionLetterPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-neutral-200 border-t-black rounded-full animate-spin"></div>
            </div>
        }>
            <AdmissionLetterContent />
        </Suspense>
    );
}
