
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, House as Home, Stack, PencilSimple as Edit } from "@phosphor-icons/react/dist/ssr";
import { createClient } from '@/utils/supabase/server';
import { Faculty } from '@/types/database';

export const revalidate = 0;

export default async function ArtsSchoolPage() {
    const supabase = await createClient();

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    const isAdmin = !!user; // Simplified check for now

    // School of Arts ID: 75aa8b88-a35d-4e3e-8447-7b4df3031baf
    const schoolId = '75aa8b88-a35d-4e3e-8447-7b4df3031baf';

    const { data: faculty } = await supabase
        .from('Faculty')
        .select('*')
        .eq('schoolId', schoolId)
        .limit(6);

    const { data: departments } = await supabase
        .from('Department')
        .select('*, headOfDepartment:Faculty!headOfDepartmentId(name, role)')
        .eq('schoolId', schoolId);

    // Color theme for links/hover (Red)
    const themeColor = 'group-hover:text-[#e31837]';

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans">
            {/* 1. HERO SECTION (Red Split Style) */}
            <section className="bg-[#e31837] text-white overflow-hidden">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-32 pb-4 md:pt-48 lg:py-0 lg:h-[650px] relative mb-12">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-8 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight pt-8">
                            School of Arts, Design and Architecture
                        </h1>
                        <p className="text-xl text-white/90 max-w-xl leading-relaxed">
                            A global community of makers, thinkers, and visionaries, redefining the boundaries of creativity and human-centered design.
                        </p>

                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative mt-8 lg:mt-0 lg:translate-y-16 z-20">
                        <div className="relative w-full h-[450px] lg:h-[100%] bg-neutral-800 shadow-2xl overflow-hidden">
                            <Image
                                src="/images/school-arts.jpg"
                                alt="School of Arts"
                                fill
                                priority
                                className="object-cover opacity-90"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ACADEMIC DEPARTMENTS (Dynamic Grid) */}
            <section id="departments" className="py-8 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-4">Academic Departments</h2>
                        <p className="text-neutral-600 text-lg max-w-2xl">Six specialized departments encompassing the full spectrum of creative and architectural practice.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {departments?.map((dept) => {
                            const hod = dept.headOfDepartment as any;
                            return (
                                <Link
                                    key={dept.id}
                                    href={`/schools/arts/${dept.slug}`}
                                    className="bg-white p-10 flex flex-col justify-between group hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-100 rounded-2xl"
                                >
                                    <div>
                                        <div className="aspect-[3/2] bg-neutral-100 mb-6 overflow-hidden relative rounded-xl">
                                            <Image
                                                src={dept.imageUrl || `/images/placeholders/${dept.slug}.png`}
                                                alt={dept.name}
                                                fill
                                                className="object-cover opacity-80"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                        <h3 className={`text-xl font-bold mb-3 transition-colors ${themeColor}`}>
                                            Department of {dept.name.startsWith('Department of') ? dept.name.replace('Department of', '').trim() : dept.name}
                                        </h3>
                                        <p className="text-neutral-600 mb-6 leading-relaxed line-clamp-3 text-sm">
                                            {dept.description || 'Exploring new frontiers in creativity, design, and spatial practice to shape a sustainable and beautiful future.'}
                                        </p>
                                    </div>
                                    <div className="pt-6 pl-1 pb-1">
                                        <p className="text-[10px] font-bold uppercase text-neutral-400 mb-1 tracking-widest">Head of Department</p>
                                        <p className="text-base font-bold">{hod?.name || 'To be appointed'}</p>
                                        <p className="text-xs text-neutral-500">{hod?.role || 'Department Administration'}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. RESEARCH & ACTIVITY */}
            <section className="py-8 md:py-24 bg-black text-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold">Research and Impact</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                Our research drives tangible impact across industries, focusing on addressing global challenges through artistic and design-led inquiry. The School supports practice-based research, experimental methods, and theoretical exploration.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Sustainable design & environments",
                                    "Visual culture & contemporary art",
                                    "Digital media & interaction",
                                    "Architecture & urban resilience",
                                    "Creative processes & innovation"
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 bg-white/5 p-4 border border-white/20 hover:border-white/40 transition-colors">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        <span className="text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-neutral-900 aspect-video relative group overflow-hidden border border-white/10">
                            <Image src="/images/admissions/student_life_events.png" alt="Research Activity" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 100vw, 50vw" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                                <p className="text-lg text-white/90 font-medium">
                                    Bridging the gap between academic theory and real-world solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. MEET OUR PEOPLE (Database-linked) */}
            <section className="py-8 md:py-24 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-4">Meet our people</h2>
                        <p className="text-black max-w-2xl">The visionaries and creative experts shaping the future of arts and design at Sykli College.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {faculty?.map((person) => (
                            <div key={person.id} className="bg-white border border-neutral-100 flex flex-col">
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-base font-bold mb-0.5">{person.name}</h3>
                                        <p className="text-black text-[10px] font-bold uppercase tracking-wider mb-2">{person.role}</p>
                                        <p className="text-black text-xs line-clamp-2 mb-4">{person.bio}</p>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-t border-neutral-100 pl-1">
                                        <span className="text-[11px] text-black truncate">{person.email}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. COLLABORATION & LEADERSHIP */}
            <section className="py-8 md:py-24 bg-white text-black">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Collaboration */}
                        <div className="bg-black text-white p-12">
                            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                                Collaboration & Partnerships
                            </h2>
                            <ul className="space-y-6">
                                {[
                                    "Design studios and creative agencies",
                                    "Architecture firms and urban development organisations",
                                    "Film production companies and media houses",
                                    "Museums, galleries, and cultural institutions",
                                    "International universities and research networks"
                                ].map((item) => (
                                    <li key={item} className="flex items-center justify-between border-b border-white/10 pb-4 group cursor-default">
                                        <span className="text-lg text-neutral-300 group-hover:text-white transition-colors">{item}</span>
                                        <ArrowRight size={16} weight="bold" className="text-[#f3e600]" />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Leadership */}
                        <div className="bg-black text-white p-12 ">
                            <h2 className="text-3xl font-bold mb-8">Leadership & Administration</h2>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#f3e600] mb-2">Dean of the School</p>
                                    <p className="text-2xl font-bold">Prof. Harri Lindholm</p>
                                    <p className="text-neutral-400 text-sm">Dean, School of Arts, Design and Architecture</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                                    <div>
                                        <p className="text-neutral-500 mb-2">Administrative</p>
                                        <ul className="space-y-1 text-neutral-300">
                                            <li>Prof. Ali Räsänen - Finance</li>
                                            <li>Prof. Kati Kaiser - HR</li>
                                            <li>Prof. Venla Thomas - Research</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-neutral-500 mb-2">Heads of Dept.</p>
                                        <ul className="space-y-1 text-neutral-300">
                                            <li>Architecture: Dr. Chloé Gruber</li>
                                            <li>Film: Dr. Hans Mikkelsen</li>
                                            <li>Design: Dr. Francesca Watanabe</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. WHY & CONTACT */}
            <section className="py-8 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Why Section */}
                        <div className="bg-[#f3e600] p-16 text-black flex flex-col justify-center">
                            <h2 className="text-4x font-black mb-8 uppercase tracking-tighter">Why the School of Arts?</h2>
                            <div className="space-y-6">
                                {[
                                    "Strong focus on creativity and innovation",
                                    "Interdisciplinary and collaborative culture",
                                    "Close connections to industry and cultural sectors",
                                    "International outlook and global partnerships",
                                    "Commitment to sustainability and responsibility"
                                ].map((point) => (
                                    <div key={point} className="flex gap-4 items-start">
                                        <p className="text-xl font-bold leading-tight">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-4xl font-bold mb-8 underline underline-offset-8">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex gap-4 items-start">
                                    <div className="bg-neutral-100 p-10 border border-black">
                                        <p className="font-bold">Pohjoisesplanadi 51, Helsinki</p>
                                        <p className="text-neutral-500">Sykli College</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="font-medium">General: arts@syklicollege.fi</span>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <span className="font-medium">Students: artsstudents@syklicollege.fi</span>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <span className="font-medium">Partnerships: arts.partnerships@syklicollege.fi</span>
                                    </div>
                                </div>
                                <Link href="/contact" className="inline-flex items-center gap-2 font-bold group">
                                    Global Contact Directory <ArrowRight size={18} weight="bold" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FOOTER CALL TO ACTION */}
            <section className="bg-black text-white py-12">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-2xl font-bold underline decoration-white/30">Start your creative journey at Sykli.</p>
                    <Link href="/admissions" className="bg-[#f3e600] text-black px-10 py-4 font-bold hover:bg-white transition-colors">
                        View Application Guide
                    </Link>
                </div>
            </section>
        </div>
    );
}
