import { ReactNode } from 'react';
import PortalHeader from '@/components/portal/PortalHeader';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-open-sans",
});

export default async function PortalLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: profile } = await supabase
        .from('profiles')
        .select('student_id, first_name, avatar_url')
        .eq('id', user?.id)
        .single();

    return (
        <div className={`min-h-screen bg-white flex flex-col ${openSans.className} text-base`} data-theme="portal">
            <PortalHeader
                userEmail={user?.email}
                studentId={profile?.student_id}
                avatarUrl={profile?.avatar_url}
                firstName={profile?.first_name}
            />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-black text-white py-12">
                <div className="container mx-auto px-4 text-center text-[10px] font-medium uppercase tracking-widest text-white/60">
                    &copy; {new Date().getFullYear()} Sykli College Portal. Secure Admissions Environment.
                </div>
            </footer>
        </div>
    );
}
