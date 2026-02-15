import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { User, Envelope as Mail, Globe, Calendar, GraduationCap, Clock, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import { formatToDDMMYYYY } from '@/utils/date';
import AvatarUpload from '@/components/portal/AvatarUpload';

export const revalidate = 0;

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect('/portal/account/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!profile) redirect('/portal/account/login');

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-xl font-black uppercase tracking-tight text-[#2d2d2d]">Student Profile</h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d2d2d]">Account Details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Account Details */}
                <div className="md:col-span-8 space-y-6">
                    <div className="bg-white p-6 border border-neutral-200">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#2d2d2d] border-b border-neutral-100 pb-2 mb-4">Account Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ProfileItem label="Email Address" value={user.email} />
                            <ProfileItem label="Date of Birth" value={profile.date_of_birth} />
                            <ProfileItem label="Country" value={profile.country_of_residence} />
                            <ProfileItem label="Joined" value={formatToDDMMYYYY(profile.created_at)} />
                        </div>
                    </div>

                    <div className="bg-neutral-900 p-6 text-white">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-2">Account Security</h3>
                        <p className="text-[10px] font-bold leading-relaxed mb-4 uppercase tracking-tight text-white/90">
                            Your account is protected by Sykli College biometric-ready authentication.
                        </p>
                        <button className="text-[9px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-all">
                            Request Data Update
                        </button>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="md:col-span-4 space-y-4">
                    <div className="bg-white rounded-xl border border-neutral-200 p-6 text-center">
                        <AvatarUpload
                            userId={user.id}
                            currentAvatarUrl={profile.avatar_url}
                            firstName={profile.first_name}
                            email={user.email}
                        />
                        <h2 className="text-sm font-black uppercase tracking-tight text-[#2d2d2d]">
                            {profile.first_name} {profile.last_name}
                        </h2>

                        <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col gap-1 items-center">
                            <div className="text-[9px] font-black uppercase tracking-widest leading-none text-[#2d2d2d]">Student ID</div>
                            <div className="text-base font-black leading-none text-[#2d2d2d]">{profile.student_id || 'N/A'}</div>
                        </div>
                    </div>

                    <Link
                        href="/portal/dashboard"
                        className="flex items-center justify-center w-full py-3 bg-neutral-100 rounded text-[10px] font-black uppercase tracking-widest hover:bg-neutral-200 transition-all"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ProfileItem({ label, value }: { label: string, value?: string }) {
    return (
        <div className="space-y-0.5">
            <div className="text-[9px] font-black uppercase tracking-widest text-[#2d2d2d]">{label}</div>
            <div className="text-xs font-bold leading-tight text-[#2d2d2d]">{value || 'N/A'}</div>
        </div>
    );
}
