import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { Application } from '@/types/database';
import Link from 'next/link';
import { CheckCircle as CheckCircle2, CaretRight as ChevronRight } from "@phosphor-icons/react/dist/ssr";
import PersonalInfoForm from '@/components/portal/wizard/PersonalInfoForm';
import ContactDetailsForm from '@/components/portal/wizard/ContactDetailsForm';
import AcademicHistoryForm from '@/components/portal/wizard/AcademicHistoryForm';
import MotivationForm from '@/components/portal/wizard/MotivationForm';
import DocumentsForm from '@/components/portal/wizard/DocumentsForm';
import ReviewStep from '@/components/portal/wizard/ReviewStep';
import WelcomeStep from '@/components/portal/wizard/WelcomeStep';
import { getProgrammeInstructions } from '@/utils/programme-instructions';
import { submitApplication } from '@/app/portal/actions';

export default async function ApplicationWizardPage(props: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ step?: string }>
}) {
    const { id } = await props.params;
    const { step: stepParam } = await props.searchParams;
    const supabase = await createClient();

    // Verify Access
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    const { data: applicationRaw } = await supabase
        .from('applications')
        .select(`
            *,
            course:Course(*, school:School(*)),
            user:profiles(email),
            documents:application_documents(*)
        `)
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (!applicationRaw) notFound();

    const application = applicationRaw as Application & {
        user: { email: string },
        documents: any[],
        course: any
    };

    // Define Base Steps
    const stepsConf = [
        { id: 1, name: 'Instructions', key: 'instructions' },
        { id: 2, name: 'Personal Info', key: 'personal_info' },
        { id: 3, name: 'Contact Details', key: 'contact_details' },
        { id: 4, name: 'Academic History', key: 'education_history' },
        { id: 5, name: 'Motivation & Language', key: 'motivation' },
        { id: 6, name: 'Documents', key: 'documents' },
        { id: 7, name: 'Review', key: 'review' },
    ];

    // Calculate Progress and Allowed Step
    const getStepStatus = (index: number) => {
        const step = stepsConf[index];
        if (step.key === 'instructions') return true;
        if (step.key === 'documents') {
            const requiredTypes = ['PASSPORT', 'TRANSCRIPT', 'CERTIFICATE', 'CV'];
            const uploadedTypes = application.documents?.map(d => d.type) || [];
            return requiredTypes.every(type => uploadedTypes.includes(type));
        }
        if (step.key === 'review') return false;
        return (application as any)[step.key] != null;
    };

    // Find the latest step reached
    let maxAllowedStep = 1;
    // We want to force them to step 1 if it's a completely new application?
    // Actually, if instructions are always "done", maxAllowedStep will be 2 by default.
    // Let's make it so if they haven't filled anything, they start at 1.
    const hasStartedFilling = application.personal_info != null;

    for (let i = 0; i < stepsConf.length - 1; i++) {
        if (getStepStatus(i)) {
            maxAllowedStep = i + 2;
        } else {
            break;
        }
    }

    // Determine requested step vs allowed step
    // If it's a fresh application (no personal info), default to step 1 (Instructions)
    const defaultStep = hasStartedFilling ? maxAllowedStep : 1;
    const requestedStep = stepParam ? parseInt(stepParam) : defaultStep;
    const currentStepId = Math.min(requestedStep, maxAllowedStep);
    const currentStep = stepsConf.find(s => s.id === currentStepId) || stepsConf[0];

    // Instructions for the current course
    const programmeInstructions = getProgrammeInstructions(application.course?.slug);

    const steps = stepsConf.map((step) => {
        const isCompleted = getStepStatus(step.id - 1);
        let status = 'upcoming';
        if (step.id === currentStepId) {
            status = 'current';
        } else if (isCompleted || step.id < currentStepId) {
            status = 'completed';
        }
        return { ...step, status, isLocked: step.id > maxAllowedStep };
    });

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8 border-b border-neutral-200 pb-6 text-neutral-900">
                <div className="flex items-center gap-2 text-sm text-[#2d2d2d] mb-2">
                    <Link href="/portal/dashboard" className="hover:text-black transition-colors">Dashboard</Link>
                    <ChevronRight size={14} weight="bold" />
                    <span className="font-medium">Application #{application.application_number || application.id.slice(0, 8)}</span>
                </div>
                <h1 className="text-xl font-semibold tracking-tight uppercase">
                    {application.course?.title}
                    {application.course?.duration && (
                        <span className="text-[#2d2d2d] font-medium lowercase"> — {application.course.duration}</span>
                    )}
                    {application.course?.school && (
                        <span className="text-[#2d2d2d] font-medium lowercase"> — {application.course.school.name}</span>
                    )}
                </h1>
                <p className="text-[#2d2d2d] font-semibold tracking-tight text-xs uppercase">Step {currentStepId} / {stepsConf.length}: {currentStep.name}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-2 space-y-0.5">
                    {steps.map((step) => {
                        const isClickable = !step.isLocked;
                        const content = (
                            <div
                                className={`flex items-center gap-2 p-2 rounded-sm text-[10px] font-semibold transition-all ${step.status === 'current' ? 'border border-primary text-primary' :
                                    step.status === 'completed' ? 'text-primary hover:bg-neutral-50' : 'text-[#2d2d2d]'
                                    } ${!isClickable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${step.status === 'current' ? 'border-primary' : 'border-current'
                                    }`}>
                                    {step.id}
                                </div>
                                <span className="uppercase tracking-widest">{step.name}</span>
                            </div>
                        );

                        if (isClickable) {
                            return <Link key={step.id} href={`?step=${step.id}`}>{content}</Link>;
                        }
                        return <div key={step.id}>{content}</div>;
                    })}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-7 bg-white p-6 rounded-sm border border-neutral-100 h-fit space-y-6">
                    <div className="flex-1">
                        <h2 className="text-sm font-semibold uppercase tracking-widest mb-6 pb-2 border-b border-neutral-100 text-neutral-900 leading-none">
                            {currentStep.name}
                        </h2>

                        {currentStep.id === 1 && (
                            <WelcomeStep
                                instructions={programmeInstructions}
                                nextStepHref="?step=2"
                            />
                        )}

                        {currentStep.id === 2 && (
                            <PersonalInfoForm
                                applicationId={application.id}
                                initialData={application.personal_info}
                            />
                        )}

                        {currentStep.id === 3 && (
                            <ContactDetailsForm
                                applicationId={application.id}
                                initialData={application.contact_details}
                                defaultEmail={application.user?.email}
                            />
                        )}

                        {currentStep.id === 4 && (
                            <AcademicHistoryForm
                                applicationId={application.id}
                                initialData={application.education_history}
                            />
                        )}

                        {currentStep.id === 5 && (
                            <MotivationForm
                                applicationId={application.id}
                                initialData={application.motivation}
                            />
                        )}

                        {currentStep.id === 6 && (
                            <DocumentsForm
                                applicationId={application.id}
                                existingDocuments={application.documents}
                            />
                        )}

                        {currentStep.id === 7 && (
                            <ReviewStep application={application} />
                        )}
                    </div>
                </div>

                {/* Summary Sidebar (Always On) */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white md:bg-neutral-50/50 p-4 md:p-8 rounded-sm border border-neutral-100 min-h-[500px]">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#2d2d2d] mb-4">Application Summary</h3>

                        <div className="space-y-4">
                            {application.personal_info && (
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-[#2d2d2d] uppercase tracking-tight">Applicant</p>
                                    <p className="text-sm font-semibold text-neutral-900 leading-tight">
                                        {application.personal_info.firstName} {application.personal_info.lastName}
                                    </p>
                                </div>
                            )}

                            {application.contact_details && (
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-[#2d2d2d] uppercase tracking-tight">Contact</p>
                                    <p className="text-sm font-semibold text-neutral-900 leading-tight">{application.contact_details.email}</p>
                                    <p className="text-sm font-semibold text-neutral-900 leading-tight">{application.contact_details.phone}</p>
                                    {(application.contact_details.city || application.contact_details.country) && (
                                        <p className="text-xs text-neutral-500 mt-1">
                                            {[application.contact_details.city, application.contact_details.country].filter(Boolean).join(', ')}
                                        </p>
                                    )}
                                </div>
                            )}

                            {application.motivation && application.motivation.statementOfPurpose && (
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-[#2d2d2d] uppercase tracking-tight">Statement</p>
                                    <p className="text-xs font-medium text-neutral-500 line-clamp-2">
                                        {application.motivation.statementOfPurpose}
                                    </p>
                                </div>
                            )}

                            {application.education_history?.education?.[0] && (
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-[#2d2d2d] uppercase tracking-tight">Latest Education</p>
                                    <p className="text-sm font-semibold text-neutral-900 leading-tight">
                                        {application.education_history.education[0].institution}
                                    </p>
                                    <p className="text-xs text-[#2d2d2d] font-medium">
                                        {application.education_history.education[0].degree}
                                    </p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-neutral-200">
                                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-tight text-[#2d2d2d]">
                                    <span>Documents</span>
                                    <span>{application.documents?.length || 0} / 4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
