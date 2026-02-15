import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { updateApplicationStatus, updateInternalNotes, createAdmissionOffer, regenerateOfferLetter } from '../actions';
import { ApplicationStatus } from '@/types/database';
import { getTuitionFee, mapSchoolToTuitionField, getProgramYears } from '@/utils/tuition';
import { formatToDDMMYYYY } from '@/utils/date';
import { FinancialOfferForm } from '../FinancialOfferForm';
import {
    CaretLeft as ChevronLeft,
    User,
    Envelope as Mail,
    Phone,
    Globe,
    Calendar,
    MapPin,
    GraduationCap,
    Trophy as Award,
    FileText,
    DownloadSimple as Download,
    CheckCircle as CheckCircle2,
    XCircle,
    WarningCircle as AlertCircle,
    Clock,
    ArrowCounterClockwise as RotateCcw,
    ShieldCheck,
    Percent,
    Info
} from "@phosphor-icons/react/dist/ssr";

export const revalidate = 0;

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: appRaw } = await supabase
        .from('applications')
        .select(`
            *,
            course:Course(*, school:School(slug)),
            user:profiles(*),
            documents:application_documents(*),
            offer:admission_offers(*)
        `)
        .eq('id', id)
        .single();

    if (!appRaw) notFound();

    // Fetch admission record separately if it exists (linked by user_id)
    const { data: admissionRecord } = await supabase
        .from('admissions')
        .select('*')
        .eq('user_id', appRaw.user_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    const app = appRaw as any;
    const personal = app.personal_info || {};
    const contact = app.contact_details || {};
    const education = app.education_history || {};
    const motivation = app.motivation || {};

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Link href="/admin/admissions" className="p-2 hover:bg-neutral-100 rounded-xl transition-colors">
                    <ChevronLeft size={24} weight="bold" />
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold uppercase tracking-tight">Application Review</h1>
                    <p className="text-neutral-500 text-sm font-medium">Viewing details for {app.user?.first_name} {app.user?.last_name}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Data Details */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Applicant Section */}
                    <div className="bg-white rounded-3xl overflow-hidden">
                        <div className="bg-neutral-900 p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center font-semibold text-2xl">
                                    {(app.user?.first_name?.[0] || 'A').toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold uppercase tracking-tight">{app.user?.first_name} {app.user?.last_name}</h2>
                                    <p className="text-neutral-400 text-xs font-semibold uppercase tracking-widest">Student ID: {app.user?.student_id || 'Generating...'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest block mb-1">Applying For</span>
                                <span className="text-sm font-semibold uppercase tracking-tight">{app.course?.title}</span>
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Info */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">Personal Information</h3>
                                <div className="space-y-3">
                                    <InfoItem icon={Calendar} label="Date of Birth" value={personal.dateOfBirth} iconWeight="regular" />
                                    <InfoItem icon={User} label="Gender" value={personal.gender} isCapitalized iconWeight="regular" />
                                    <InfoItem icon={Globe} label="Nationality" value={personal.nationality} iconWeight="regular" />
                                    <InfoItem icon={FileText} label="Passport/ID" value={personal.passportNumber} iconWeight="regular" />
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">Contact Details</h3>
                                <div className="space-y-3">
                                    <InfoItem icon={Mail} label="Email Address" value={contact.email || app.user?.email} iconWeight="regular" />
                                    <InfoItem icon={Phone} label="Phone Number" value={contact.phone} iconWeight="regular" />
                                    <InfoItem icon={MapPin} label="Address" value={`${contact.addressLine1}${contact.addressLine2 ? ', ' + contact.addressLine2 : ''}, ${contact.city}, ${contact.country}`} iconWeight="regular" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic History */}
                    <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2 flex items-center gap-2">
                            <GraduationCap size={16} weight="bold" /> Academic History
                        </h3>
                        {education.education?.length > 0 ? (
                            <div className="space-y-8">
                                {education.education.map((edu: any, idx: number) => (
                                    <div key={idx} className={`${idx !== 0 ? 'pt-6 border-t border-neutral-50' : ''}`}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <InfoItem label="Institution Name" value={edu.institution} />
                                                <InfoItem label="Degree / Qualification" value={edu.degree} />
                                                <InfoItem label="Period" value={`${edu.startYear} - ${edu.endYear}`} />
                                            </div>
                                            <div className="space-y-3">
                                                <InfoItem label="GPA / Grade" value={edu.grade} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-neutral-400 text-sm italic">No academic history provided.</p>
                        )}
                    </div>

                    {/* Motivation */}
                    <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2 flex items-center gap-2">
                            <Award size={16} weight="bold" /> Motivation & Goals
                        </h3>
                        <div className="prose prose-sm max-w-none text-neutral-600 font-medium">
                            {motivation.statementOfPurpose || "No motivation statement provided."}
                        </div>

                        {motivation.languageProficiency && (
                            <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InfoItem label="English Level" value={motivation.languageProficiency.englishLevel} isCapitalized />
                                <InfoItem label="Test Taken" value={motivation.languageProficiency.testTaken} />
                                <InfoItem label="Test Score" value={motivation.languageProficiency.testScore} />
                            </div>
                        )}
                    </div>

                    {/* Documents */}
                    <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2 flex items-center gap-2">
                            <FileText size={16} weight="bold" /> Attached Documents
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {app.documents?.length > 0 ? (
                                app.documents.map((doc: any) => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100 group hover:border-black transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-neutral-100 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                                                <FileText size={18} weight="regular" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-black uppercase tracking-tight">{doc.type.replace('_', ' ')}</div>
                                                <div className="text-[10px] font-bold text-neutral-400 truncate max-w-[150px]">{doc.name}</div>
                                            </div>
                                        </div>
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-black hover:text-white rounded-lg transition-all"
                                        >
                                            <Download size={16} weight="bold" />
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p className="text-neutral-400 text-sm italic col-span-2">No documents uploaded yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Status Card */}
                    <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm sticky top-8">
                        <div className="mb-6">
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-2">Current Status</span>
                            <StatusDisplay status={app.status} />
                        </div>

                        <div className="space-y-4 pt-6 border-t border-neutral-100">
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">Update Pipeline</span>
                            <div className="grid grid-cols-1 gap-1.5">
                                <StatusActionButton label="Move to Review" status="UNDER_REVIEW" appId={app.id} currentStatus={app.status} variant="warning" />
                                <StatusActionButton label="Request Documents" status="DOCS_REQUIRED" appId={app.id} currentStatus={app.status} variant="purple" />
                                <StatusActionButton label="Admit Student" status="ADMITTED" appId={app.id} currentStatus={app.status} variant="success" />
                                <StatusActionButton label="Reject Application" status="REJECTED" appId={app.id} currentStatus={app.status} variant="danger" />
                            </div>
                        </div>

                        {/* Block 1: Admission Letter Documentation */}
                        {app.status === 'ADMITTED' && (
                            <div className="mt-8 pt-6 border-t-2 border-dashed border-neutral-100 animate-in fade-in slide-in-from-top-2 duration-500">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2">
                                    <FileText size={14} weight="bold" /> Official Admission Letter
                                </h3>

                                {admissionRecord?.offer_letter_url ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                    <FileText size={14} weight="regular" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-blue-900 leading-none mb-1">Status: Generated</p>
                                                    <p className="text-[9px] font-bold text-blue-400 uppercase">Letter is ready for student</p>
                                                </div>
                                            </div>
                                            <a
                                                href={admissionRecord.offer_letter_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 hover:bg-blue-600 hover:text-white rounded-lg transition-all text-blue-600 border border-blue-200"
                                            >
                                                <Download size={14} weight="bold" />
                                            </a>
                                        </div>

                                        <form action={async () => {
                                            'use server';
                                            await regenerateOfferLetter(app.id);
                                        }}>
                                            <button type="submit" className="w-full bg-neutral-900 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
                                                <RotateCcw size={12} weight="bold" /> Regenerate PDF Letter
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center text-center gap-2">
                                            <AlertCircle size={24} weight="bold" className="text-amber-400" />
                                            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-tight">
                                                No formal letter found in system for this admitted student.
                                            </p>
                                        </div>
                                        <form action={async () => {
                                            'use server';
                                            await regenerateOfferLetter(app.id);
                                        }}>
                                            <button type="submit" className="w-full bg-blue-600 text-white rounded-xl py-3 text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                                Generate Admission Letter
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Block 2: Financial Issuance (Tuition & Fees) */}
                        {app.status === 'ADMITTED' && (
                            <div className="mt-8 pt-6 border-t-2 border-dashed border-neutral-100">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4 flex items-center gap-2">
                                    <Award size={14} weight="bold" /> Financial Offer / Tuition
                                </h3>

                                {app.offer?.[0] ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col gap-3">
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-tight">
                                                        {app.offer[0].offer_type === 'FULL_TUITION' ? 'Full Tuition' : 'Initial Deposit'}
                                                    </span>
                                                    <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">{app.offer[0].currency}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-black text-emerald-900 leading-none">€{app.offer[0].tuition_fee?.toLocaleString()}</span>
                                                    {app.offer[0].discount_amount > 0 && (
                                                        <p className="text-[8px] font-bold text-emerald-600 uppercase">Includes €{app.offer[0].discount_amount?.toLocaleString()} discount</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-2 border-t border-emerald-100">
                                                <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-tight">Deadline</span>
                                                <span className="text-[10px] font-black text-emerald-900">{formatToDDMMYYYY(app.offer[0].payment_deadline)}</span>
                                            </div>

                                            <div className="pt-2 text-center">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${app.offer[0].status === 'ACCEPTED' ? 'bg-emerald-200 text-emerald-800' :
                                                    app.offer[0].status === 'DECLINED' ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800'
                                                    }`}>
                                                    {app.offer[0].status}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-[9px] font-bold text-neutral-400 text-center line-clamp-2">
                                            Financial details issued. Modification requires registrar intervention.
                                        </p>
                                    </div>
                                ) : (
                                    <FinancialOfferForm
                                        applicationId={app.id}
                                        baseTuition={getTuitionFee(
                                            app.course?.degreeLevel || 'BACHELOR',
                                            mapSchoolToTuitionField(app.course?.school?.slug || 'technology')
                                        )}
                                        programYears={getProgramYears(app.course?.duration || '2 Years')}
                                    />
                                )}
                            </div>
                        )}

                        {/* Internal Notes */}
                        <div className="mt-8 pt-6 border-t border-neutral-100">
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-3 leading-none underline decoration-amber-400 decoration-2 underline-offset-4">Internal Staff Notes</span>
                            <form action={async (formData) => {
                                'use server';
                                const notes = formData.get('notes') as string;
                                await updateInternalNotes(app.id, notes);
                            }} className="space-y-3">
                                <textarea
                                    name="notes"
                                    defaultValue={app.internal_notes || ''}
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-sm font-medium outline-none focus:border-black transition-all min-h-[120px] shadow-inner"
                                    placeholder="Add notes for the admissions team..."
                                />
                                <button type="submit" className="w-full bg-neutral-900 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-sm">
                                    Save Notes
                                </button>
                            </form>
                        </div>

                        <div className="mt-8 pt-6 border-t border-neutral-100">
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-3 leading-none">Application Log</span>
                            <div className="space-y-4">
                                <LogItem
                                    date={app.created_at}
                                    action="Application Created"
                                    user="System"
                                />
                                {app.submitted_at && (
                                    <LogItem
                                        date={app.submitted_at}
                                        action="Form Submitted"
                                        user="Applicant"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value, isCapitalized, iconWeight = 'bold' }: { icon?: any, label: string, value: any, isCapitalized?: boolean, iconWeight?: any }) {
    return (
        <div className="flex gap-3">
            {Icon && <Icon size={16} weight={iconWeight} className="text-neutral-300 mt-0.5 shrink-0" />}
            <div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className={`text-sm font-bold text-neutral-900 ${isCapitalized ? 'capitalize' : ''}`}>
                    {value || <span className="text-neutral-300 italic">Not provided</span>}
                </p>
            </div>
        </div>
    );
}

function StatusDisplay({ status }: { status: string }) {
    const variants: Record<string, { label: string, color: string, icon: any }> = {
        'DRAFT': { label: 'Draft', color: 'bg-neutral-100 text-neutral-500', icon: Clock },
        'SUBMITTED': { label: 'Submitted', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
        'UNDER_REVIEW': { label: 'In Review', color: 'bg-amber-100 text-amber-700', icon: Clock },
        'DOCS_REQUIRED': { label: 'Action Needed', color: 'bg-purple-100 text-purple-700', icon: AlertCircle },
        'ADMITTED': { label: 'Admitted', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
        'REJECTED': { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
    };

    const s = variants[status] || variants['DRAFT'];
    const Icon = s.icon;

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl ${s.color} font-black uppercase text-xs tracking-wider border border-current opacity-80`}>
            <Icon size={14} weight="bold" />
            {s.label}
        </div>
    );
}

function StatusActionButton({ label, status, appId, currentStatus, variant }: { label: string, status: ApplicationStatus, appId: string, currentStatus: string, variant: string }) {
    if (currentStatus === status) return null;

    const variantClasses: Record<string, string> = {
        'success': 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white',
        'warning': 'bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white',
        'danger': 'bg-red-50 text-red-700 hover:bg-red-600 hover:text-white',
        'purple': 'bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white',
    };

    return (
        <form action={async () => {
            'use server';
            await updateApplicationStatus(appId, status);
        }}>
            <button
                type="submit"
                className={`w-full text-left px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${variantClasses[variant]}`}
            >
                {label}
            </button>
        </form>
    );
}

function LogItem({ date, action, user }: { date: string, action: string, user: string }) {
    return (
        <div className="flex gap-3 relative before:absolute before:left-1.5 before:top-4 before:bottom-0 before:w-px before:bg-neutral-100 last:before:hidden">
            <div className="w-3 h-3 rounded-full bg-neutral-200 mt-1 relative z-10 shrink-0" />
            <div>
                <p className="text-xs font-black text-neutral-900 leading-none mb-1 uppercase tracking-tight">{action}</p>
                <p className="text-[10px] font-bold text-neutral-400">
                    {formatToDDMMYYYY(date)} • By {user}
                </p>
            </div>
        </div>
    );
}
