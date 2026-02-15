
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SquaresFour as LayoutDashboard, BookOpen, Newspaper, Calendar, GraduationCap, Users, Buildings as SchoolIcon, FileText, House as Home, Cpu, Microscope } from "@phosphor-icons/react/dist/ssr";
import { Logo } from '@/components/ui/Logo';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-open-sans",
});

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, avatar_url')
        .eq('id', user.id)
        .single();

    return (
        <div className={`min-h-screen bg-neutral-100 flex ${openSans.className} text-base`} data-theme="admin">
            {/* Sidebar */}
            <aside className="w-64 bg-neutral-900 text-white flex-shrink-0 flex flex-col">
                <div className="p-8">
                    <Logo className="text-white brightness-100 invert h-16 grayscale" />
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors text-white/60 hover:text-white group">
                        <LayoutDashboard size={18} weight="regular" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/admissions" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors text-white font-medium">
                        <FileText size={18} weight="regular" />
                        <span>Admissions</span>
                    </Link>
                    <Link href="/admin/courses" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors">
                        <BookOpen size={18} weight="regular" />
                        <span>Courses</span>
                    </Link>
                    <Link href="/admin/subjects" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors">
                        <GraduationCap size={18} weight="regular" />
                        <span>Subjects</span>
                    </Link>
                    <Link href="/admin/housing" className="flex items-center gap-2 p-2 rounded hover:bg-neutral-800 text-white/60 hover:text-white transition-colors group">
                        <Home size={18} weight="regular" /> Housing Manager
                    </Link>
                    <Link href="/admin/it" className="flex items-center gap-2 p-2 rounded hover:bg-neutral-800 text-white/60 hover:text-white transition-colors">
                        <Cpu size={18} weight="regular" /> IT Asset Management
                    </Link>
                    <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors">
                        <Newspaper size={18} weight="regular" />
                        <span>News</span>
                    </Link>
                    <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors">
                        <Calendar size={18} weight="regular" />
                        <span>Events</span>
                    </Link>
                    <Link href="/admin/students" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors">
                        <Users size={18} weight="regular" />
                        <span>Students</span>
                    </Link>
                    <Link href="/admin/research/projects" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors">
                        <Microscope size={18} weight="regular" />
                        <span>Research Projects</span>
                    </Link>
                    <Link href="/admin/departments" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors">
                        <SchoolIcon size={18} weight="regular" />
                        <span>Departments</span>
                    </Link>
                    <Link href="/admin/faculty" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors">
                        <Users size={18} weight="regular" />
                        <span>Faculty Editor</span>
                    </Link>
                    <Link href="/admin/registrar" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors">
                        <FileText size={18} weight="regular" />
                        <span>Registrar</span>
                    </Link>
                    <div className="my-4 pt-4">
                        <Link href="/" className="block px-4 py-2 hover:bg-neutral-800 transition-colors text-white/60 text-sm">
                            VIEW WEBSITE
                        </Link>
                    </div>
                </nav>

                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <UserAvatar src={profile?.avatar_url} firstName={profile?.first_name} email={user.email} size="sm" />
                        <div className="overflow-hidden">
                            <p className="text-sm font-black truncate text-white">{profile?.first_name || user.email?.split('@')[0]}</p>
                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Administrator</p>
                        </div>
                    </div>
                    <form action="/auth/signout" method="post">
                        <button className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider w-full text-left">
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
