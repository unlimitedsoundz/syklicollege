import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import Image from 'next/image';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';

export const metadata = {
    title: 'Exchange Student Guide | Kestora University',
    description: 'Detailed information for exchange students planning to study at Kestora University.',
    alternates: {
        canonical: 'https://kestora.online/student-guide/exchange/',
    },
};

export default function ExchangeStudentsPage() {
    const sections = [
        { id: 'intro', title: 'Welcome', content: '' },
        { id: 'orientation', title: 'Orientation', content: '' },
        { id: 'courses', title: 'Course Selection', content: '' },
        { id: 'registration', title: 'Registration', content: '' },
        { id: 'housing', title: 'Housing & Arrival', content: '' },
        { id: 'living', title: 'Student Life', content: '' },
        { id: 'checklist', title: 'Departure Checklist', content: '' },
    ];

    return (
            <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white">
            <section className="text-black overflow-hidden" style={{ backgroundColor: '#FDF2F8' }}>
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-12 pb-12 lg:pb-0 h-auto lg:h-[600px] lg:py-0 relative mb-0">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <h1 className="font-bold leading-[1.1] tracking-tight pt-8 text-black" style={{ fontSize: '40px' }}>
                            Exchange Students Guide
                        </h1>
                        <p className="text-[21px] text-black max-w-xl leading-relaxed">
                            Everything you need to know for your exchange semester or year at Kestora University. We look forward to welcoming you to our vibrant international community!
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="/images/news/helsinki_study_hero_1771086684833.png"
                                    alt="Exchange Students"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 368px, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 md:py-16">
                <Link
                    href="/student-guide"
                    className="inline-flex items-center text-black hover:opacity-70 mb-8 transition-colors font-bold"
                >
                    Back to Student Guide
                </Link>
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content */}
                    <main className="lg:w-full space-y-8 md:space-y-16">

                        {/* Welcome */}
                        <section id="intro" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-6 text-black">Welcome to Kestora University!</h2>
                            <p className="text-lg text-black leading-relaxed">
                                Completing an exchange at Kestora University is a unique opportunity to experience Finnish education,
                                culture, and student life. This guide will help you navigate the practical steps of your exchange.
                            </p>
                            <div className="mt-8 grid md:grid-cols-2 gap-6">
                                <div className="bg-neutral-50 p-6 rounded-2xl">
                                    <h3 className="font-bold mb-2 flex items-center gap-2 text-black">
                                        International Office
                                    </h3>
                                    <p className="text-sm text-black">
                                        Our exchange coordinators are here to support you with learning agreements,
                                        official signatures, and general advice.
                                    </p>
                                </div>
                                <div className="bg-neutral-50 p-6 rounded-2xl">
                                    <h3 className="font-bold mb-2 flex items-center gap-2 text-black">
                                        Student Tutors
                                    </h3>
                                    <p className="text-sm text-black">
                                        Every exchange student is assigned a local "buddy" or peer tutor to help you
                                        settle in and meet new friends.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 1. Orientation */}
                        <section id="orientation" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <h2 className="text-3xl font-bold pt-1 text-black">Orientation Week</h2>
                            </div>
                            <div className="prose max-w-none text-black">
                                <p className="mb-4 font-bold">Orientation is mandatory for all incoming exchange students.</p>
                                <p className="mb-6">
                                    Orientation week usually takes place during the last week of August (for Autumn semester)
                                    and first week of January (for Spring semester).
                                </p>
                                <div className="bg-neutral-50 p-6 rounded-xl">
                                    <h4 className="font-bold text-black mb-4">What happens during Orientation?</h4>
                                    <ul className="grid sm:grid-cols-2 gap-4 text-sm">
                                        <li className="flex gap-2 items-center"><ArrowRight size={20} weight="bold" className="text-black" /> <span className="font-bold">Campus tours</span></li>
                                        <li className="flex gap-2 items-center"><ArrowRight size={20} weight="bold" className="text-black" /> <span className="font-bold">IT system training</span></li>
                                        <li className="flex gap-2 items-center"><ArrowRight size={20} weight="bold" className="text-black" /> <span className="font-bold">Course registration help</span></li>
                                        <li className="flex gap-2 items-center"><ArrowRight size={20} weight="bold" className="text-black" /> <span className="font-bold">Social events & parties</span></li>
                                        <li className="flex gap-2 items-center"><ArrowRight size={20} weight="bold" className="text-black" /> <span className="font-bold">Survival Finnish session</span></li>
                                        <li className="flex gap-2 items-center"><ArrowRight size={20} weight="bold" className="text-black" /> <span className="font-bold">Meet your tutors</span></li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 2. Course Selection */}
                        <section id="courses" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <h2 className="text-3xl font-bold pt-1 text-black">Course Selection</h2>
                            </div>
                            <div className="space-y-6">
                                <p className="text-black">
                                    As an exchange student, you are primarily expected to take courses from the department
                                    that nominates you. However, interdisciplinary study is often possible.
                                </p>
                                <div className="p-8 bg-neutral-50 rounded-xl">
                                    <h3 className="font-bold text-lg mb-6 text-black">
                                        Learning Agreement (LA)
                                    </h3>
                                    <ul className="space-y-4 text-black text-sm">
                                        <li className="flex gap-3 items-center">
                                            <ArrowRight size={20} weight="bold" className="text-black" />
                                            <span><strong className="font-bold">Initial LA:</strong> Should be signed by your home university and Kestora before arrival.</span>
                                        </li>
                                        <li className="flex gap-3 items-center">
                                            <ArrowRight size={20} weight="bold" className="text-black" />
                                            <span><strong className="font-bold">Changes to LA:</strong> If courses are full or cancelled, you can update your LA during the first 2 weeks of the semester.</span>
                                        </li>
                                        <li className="flex gap-3 items-center">
                                            <ArrowRight size={20} weight="bold" className="text-black" />
                                            <span><strong className="font-bold">Credits:</strong> Most courses are 5 ECTS. A full-time workload is 30 ECTS per semester.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 3. Registration */}
                        <section id="registration" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <h2 className="text-3xl font-bold pt-1 text-black">Registration & Enrollment</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-neutral-50 p-6 rounded-xl">
                                    <h4 className="font-bold mb-2 text-black">Academic Enrollment</h4>
                                    <p className="text-sm text-black">
                                        Once your IT account is active, you must enroll for the semester as "Attending".
                                        This enables your study right and access to the course catalog.
                                    </p>
                                </div>
                                <div className="bg-neutral-50 p-6 rounded-xl">
                                    <h4 className="font-bold mb-2 text-black">Individual Course Registration</h4>
                                    <p className="text-sm text-black">
                                        Registering for the semester is NOT the same as registering for courses.
                                        You must sign up for each course separately in the student portal.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Housing */}
                        <section id="housing" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <h2 className="text-3xl font-bold pt-1 text-black">Housing & Arrival</h2>
                            </div>
                            <div className="bg-white p-8 mb-6">
                                <h3 className="font-bold text-lg mb-2 text-black">Student Housing</h3>
                                <p className="text-black mb-4">
                                    Accommodation in Finland is highly sought after. Apply for housing through local student housing foundations (HOAS/KUNI)
                                    as soon as you receive your acceptance letter.
                                </p>
                                <div className="bg-neutral-50 p-4 rounded-lg flex gap-3 text-sm text-black">
                                    <p>Kestora University does provide on-campus housing directly, we assist with the application process.</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold mb-2 text-black">Travel to Campus</h4>
                                    <p className="text-sm text-black">
                                        The closest airport is Helsinki-Vantaa (HEL). From there, you can take a commuter train or shuttle to the campus area.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2 text-black">When to Arrive?</h4>
                                    <p className="text-sm text-black">
                                        We recommend arriving 2-3 days before Orientation Week to move into your apartment and settle in.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 5. Student Life */}
                        <section id="living" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <h2 className="text-3xl font-bold pt-1 text-black">Student Life & Benefits</h2>
                            </div>
                            <p className="text-black mb-6">
                                Finland offers an incredible student experience. As an exchange student, you are eligible for many
                                of the same benefits as degree students.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="p-5 bg-neutral-50 rounded-xl">
                                    <h4 className="font-bold text-sm mb-2 text-black">Student Card</h4>
                                    <p className="text-xs text-black">Access massive discounts on trains, buses, and campus meals (€2.95 per lunch!).</p>
                                </div>
                                <div className="p-5 bg-neutral-50 rounded-xl">
                                    <h4 className="font-bold text-sm mb-2 text-black">Student Union</h4>
                                    <p className="text-xs text-black">Join clubs, attend the grand annual balls, and participate in "sitsit" (traditional dinner parties).</p>
                                </div>
                                <div className="p-5 bg-neutral-50 rounded-xl">
                                    <h4 className="font-bold text-sm mb-2 text-black">Sauna Culture</h4>
                                    <p className="text-xs text-black">Most student housing buildings have shared saunas. It's the best way to relax and socialize!</p>
                                </div>
                            </div>
                        </section>

                        {/* Checklist */}
                        <section id="checklist" className="scroll-mt-32 bg-neutral-50 p-10 rounded-3xl">
                            <h2 className="text-2xl font-bold mb-6 text-black">Departure Checklist</h2>
                            <p className="text-black mb-8 font-bold">Before you leave your home country, make sure you have:</p>
                            <ul className="space-y-4">
                                {[
                                    'Valid Passport / ID card',
                                    'Acceptance Letter from Kestora University',
                                    'Signed Learning Agreement',
                                    'Health Insurance (EHIC for EU, private for non-EU)',
                                    'Housing contract and first month\'s rent receipt',
                                    'Warm clothing (if arriving for Autumn/Winter!)',
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-center text-black font-bold">
                                        <ArrowRight size={20} weight="bold" className="text-black" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-8 border-t border-black/10">
                                <div className="flex items-center gap-4 text-sm text-black">
                                    <p>Questions? Contact <span className="underline cursor-pointer font-bold">exchange@kestora.online</span></p>
                                </div>
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </div>
        </GuideSidebarLayout>
    );
}
