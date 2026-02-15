import { createAdminClient } from '@/utils/supabase/admin';
import { updateStudentStatus, updateStudentTuition, adminApproveTuition } from '../actions';
import { User, Envelope as Mail, Globe, CheckCircle, XCircle, Clock, CreditCard, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { formatToDDMMYYYY } from '@/utils/date';
import DeleteStudentBtn from './DeleteStudentBtn';

export const revalidate = 0;

export default async function AdminStudentsPage() {
    const supabase = createAdminClient();

    // Fetch Enrolled Students (New System)
    const { data: enrolledStudents } = await supabase
        .from('students')
        .select(`
    *,
    user: profiles!user_id(first_name, last_name, email),
        program: Course(title)
            `)
        .order('created_at', { ascending: false });

    // Fetch Pending Enrollments (Offer Accepted but not Enrolled)
    const { data: pendingApplications } = await supabase
        .from('applications')
        .select(`
            *,
            user: profiles!user_id(first_name, last_name, email),
                offer: admission_offers(*),
                    course: Course(title)
                        `)
        .in('status', ['OFFER_ACCEPTED', 'PAYMENT_SUBMITTED'])
        .order('updated_at', { ascending: false });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">Enrolled Students</h1>
                    <p className="text-neutral-500 text-sm mt-1">Manage official student records.</p>
                </div>
            </div>

            {/* PENDING ENROLLMENTS SECTION */}
            {pendingApplications && pendingApplications.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                        <Clock size={20} weight="bold" className="text-amber-500" />
                        Pending Enrollments
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{pendingApplications.length}</span>
                    </h2>
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-amber-50/50 border-b border-neutral-200">
                                <tr>
                                    <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Applicant</th>
                                    <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Program</th>
                                    <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Offer Status</th>
                                    <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Tuition Fee</th>
                                    <th className="p-4 font-bold text-neutral-600 text-xs uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {pendingApplications.map((app: any) => (
                                    <tr key={app.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-neutral-900 text-sm">{app.user?.first_name} {app.user?.last_name}</div>
                                            <div className="text-xs text-neutral-500">{app.user?.email}</div>
                                        </td>
                                        <td className="p-4 text-xs font-medium text-neutral-600">
                                            {app.course?.title}
                                        </td>
                                        <td className="p-4">
                                            {app.status === 'PAYMENT_SUBMITTED' ? (
                                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                                                    <CheckCircle size={10} weight="bold" /> Payment Success
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                                                    <Clock size={10} weight="bold" /> Offer Accepted
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-xs font-bold text-neutral-900">
                                            €{app.offer?.[0]?.tuition_fee}
                                        </td>
                                        <td className="p-4 text-right">
                                            <form action={adminApproveTuition.bind(null, app.id)}>
                                                <button
                                                    className={`px-3 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ml-auto ${app.status === 'PAYMENT_SUBMITTED'
                                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                                        : 'bg-neutral-900 text-white hover:bg-neutral-700 opacity-50'
                                                        }`}
                                                    title={app.status === 'PAYMENT_SUBMITTED' ? 'Finalize Enrollment' : 'Waiting for student payment'}
                                                >
                                                    <CreditCard size={12} weight="bold" />
                                                    {app.status === 'PAYMENT_SUBMITTED' ? 'Confirm & Enroll' : 'Approve Tuition'}
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <CheckCircle size={20} weight="bold" className="text-emerald-500" />
                Active Student Body
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                        <tr>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Student ID</th>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Student</th>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Program</th>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Email</th>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Status</th>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase">Joined</th>
                            <th className="p-4 font-bold text-neutral-600 text-xs uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {enrolledStudents?.map((student: any) => (
                            <tr key={student.id} className="hover:bg-neutral-50 transition-colors">
                                <td className="p-4 text-xs font-mono font-medium text-neutral-500">
                                    {student.student_id}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500 font-bold text-xs">
                                            {student.user?.first_name?.[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-neutral-900 text-sm">{student.user?.first_name} {student.user?.last_name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="text-xs font-medium text-neutral-600 truncate max-w-[200px] block" title={student.program?.title}>
                                        {student.program?.title || 'N/A'}
                                    </span>
                                </td>
                                <td className="p-4 text-xs text-neutral-500 font-mono">
                                    {student.institutional_email}
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                                        <CheckCircle size={10} weight="bold" /> {student.enrollment_status}
                                    </span>
                                </td>
                                <td className="p-4 text-xs text-neutral-400">
                                    {formatToDDMMYYYY(student.created_at)}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end gap-3">
                                        <button className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black">
                                            View
                                        </button>
                                        <DeleteStudentBtn id={student.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {(!enrolledStudents || enrolledStudents.length === 0) && (
                    <div className="p-20 text-center text-neutral-400">
                        <User size={48} weight="regular" className="mx-auto mb-4 opacity-20" />
                        <p>No enrolled students found.</p>
                        <p className="text-xs mt-2">Students appear here after tuition payment and enrollment confirmation.</p>
                    </div>
                )}
            </div>
        </div >
    );
}
function StatusBadge({ status }: { status: string }) {
    const s = status.toUpperCase();
    if (s === 'APPROVED') return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><CheckCircle size={10} weight="bold" /> Approved</span>;
    if (s === 'REJECTED') return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><XCircle size={10} weight="bold" /> Rejected</span>;
    return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 w-fit"><Clock size={10} weight="bold" /> Pending</span>;
}
