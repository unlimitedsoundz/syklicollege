import { createClient } from '@/utils/supabase/server';
import { Application } from '@/types/database';
import Link from 'next/link';
import { User, Clock, FileText, CheckCircle, XCircle, CaretRight as ChevronRight, MagnifyingGlass as Search } from "@phosphor-icons/react/dist/ssr";
import { updateApplicationStatus } from './actions';
import { formatToDDMMYYYY } from '@/utils/date';

export const revalidate = 0;

export default async function AdmissionsPage() {
    const supabase = await createClient();

    // Fetch all applications with user profiles and courses
    const { data: applicationsRaw } = await supabase
        .from('applications')
        .select(`
            *,
            course:Course(title),
            user:profiles(first_name, last_name, email, student_id)
        `)
        .order('submitted_at', { ascending: false });

    const applications = (applicationsRaw || []) as (Application & {
        course: { title: string },
        user: { first_name: string, last_name: string, email: string, student_id: string }
    })[];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-neutral-900 uppercase tracking-tight">Admissions Dashboard</h1>
                    <p className="text-neutral-500 text-sm font-medium">Review and process student applications across all programmes.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} weight="bold" />
                        <input
                            placeholder="Search applications..."
                            className="bg-white border-none pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none focus:ring-1 focus:ring-black transition-all w-64 font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Application Stages Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                    { label: 'All', count: applications.length, status: null },
                    { label: 'Submitted', count: applications.filter(a => a.status === 'SUBMITTED').length, status: 'SUBMITTED' },
                    { label: 'Reviewing', count: applications.filter(a => a.status === 'UNDER_REVIEW' || a.status === 'DOCS_REQUIRED').length, status: 'UNDER_REVIEW' },
                    { label: 'Admitted', count: applications.filter(a => a.status === 'ADMITTED' || a.status === 'OFFER_ACCEPTED').length, status: 'ADMITTED' },
                    { label: 'Drafts', count: applications.filter(a => a.status === 'DRAFT').length, status: 'DRAFT' },
                ].map((stage) => (
                    <div key={stage.label} className="bg-white p-4 rounded-2xl flex flex-col gap-1">
                        <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest leading-none">{stage.label}</span>
                        <span className="text-2xl font-semibold text-neutral-900">{stage.count}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50/50">
                                <th className="p-6 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Applicant Details</th>
                                <th className="p-6 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Programme</th>
                                <th className="p-6 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Status</th>
                                <th className="p-6 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Submission Date</th>
                                <th className="p-6 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50 text-neutral-900">
                            {applications.length > 0 ? (
                                applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-neutral-50/50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-white font-semibold text-lg">
                                                    {app.user?.first_name?.[0] || app.user?.email?.[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-base uppercase tracking-tight">
                                                        {app.user?.first_name} {app.user?.last_name}
                                                    </div>
                                                    <div className="text-xs font-semibold text-neutral-400">
                                                        {app.user?.email} • ID: <span className="text-neutral-900">{app.user?.student_id || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="text-sm font-semibold text-neutral-900 uppercase tracking-tight leading-tight max-w-[200px]">
                                                {app.course?.title}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <StatusBadge status={app.status} />
                                        </td>
                                        <td className="p-6 text-sm font-bold text-neutral-500">
                                            {app.submitted_at ? formatToDDMMYYYY(app.submitted_at) : 'In Draft'}
                                        </td>
                                        <td className="p-6 text-right">
                                            <Link
                                                href={`/admin/admissions/${app.id}`}
                                                className="inline-flex items-center gap-2 bg-neutral-100 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm active:scale-95"
                                            >
                                                Review <ChevronRight size={14} weight="bold" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-300">
                                            <FileText size={32} weight="regular" />
                                        </div>
                                        <h3 className="font-black text-xl text-neutral-900 uppercase mb-2">No Applications Found</h3>
                                        <p className="text-neutral-500 max-w-xs mx-auto text-sm font-medium">When students submit their applications, they will appear here for review.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const variants: Record<string, string> = {
        'DRAFT': 'bg-neutral-100 text-neutral-400 border-neutral-200',
        'SUBMITTED': 'bg-blue-50 text-blue-600 border-blue-100',
        'UNDER_REVIEW': 'bg-amber-50 text-amber-600 border-amber-100',
        'DOCS_REQUIRED': 'bg-purple-50 text-purple-600 border-purple-100',
        'ADMITTED': 'bg-emerald-50 text-emerald-600 border-emerald-100',
        'OFFER_ACCEPTED': 'bg-emerald-900 text-white border-emerald-900',
        'REJECTED': 'bg-red-50 text-red-600 border-red-100',
        'OFFER_DECLINED': 'bg-red-900 text-white border-red-900',
    };

    return (
        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter border ${variants[status] || variants['DRAFT']}`}>
            {status.replace('_', ' ')}
        </span>
    );
}
