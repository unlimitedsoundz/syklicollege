
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import Image from 'next/image';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';

export const metadata = {
    title: 'Arrival Guide | Kestora University',
    description: 'Prepare for your journey to Kestora University. Enrolment, visa, housing, and settling in instructions.',
    alternates: {
        canonical: 'https://kestora.online/student-guide/arrival/',
    },
};

const sections = [
    { id: 'before-you-arrive', title: 'Before You Arrive', content: '' },
    { id: 'arriving', title: 'Arriving in the Country', content: '' },
    { id: 'starting', title: 'Starting at Kestora', content: '' },
    { id: 'living', title: 'Living & Studying', content: '' },
    { id: 'welcome', title: 'Welcome Message', content: '' },
];

export default function ArrivalGuidePage() {
    return (
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white text-black">
            <section className="text-black overflow-hidden" style={{ backgroundColor: '#FDF2F8' }}>
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-12 pb-12 lg:pb-0 h-auto lg:h-[600px] lg:py-0 relative mb-0">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <h1 className="font-bold leading-[1.1] tracking-tight pt-8 text-black" style={{ fontSize: '40px' }}>
                            Arrival Guide
                        </h1>
                        <p className="text-[21px] text-black max-w-xl leading-relaxed">
                            Starting your studies at Kestora University is an exciting step. This guide helps you prepare, settle in, and feel confident.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="/images/arrival-hero-v2.jpg"
                                    alt="Kestora Arrival"
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

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Content */}
                    <main className="lg:col-span-12 space-y-16">

                        {/* Before You Arrive */}
                        <section id="before-you-arrive" className="scroll-mt-32">
                            <div className="max-w-3xl">
                                <h2 className="text-4xl font-black mb-8">
                                    Before You Arrive
                                </h2>

                                <div className="space-y-8 md:space-y-16">
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div>
                                            <h3 className="text-[18px] font-bold text-black mb-4">Enrolment</h3>
                                            <h4 className="text-xl font-bold mb-4">Accept Your Offer</h4>
                                            <p className="text-black text-[18px] leading-relaxed font-medium">
                                                Ensure you have accepted your admission offer, paid tuition fees, and completed enrolment as an attending student. Carry printed copies of your confirmations.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-[18px] font-bold text-black mb-4">Legal</h3>
                                            <h4 className="text-xl font-bold mb-4">Visa & Permits</h4>
                                            <p className="text-black text-[18px] leading-relaxed font-medium">
                                                International students (outside EU/EEA) should apply for a residence permit early. Ensure your passport is valid and carry your admission letter when travelling.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-[18px] font-bold text-black mb-4">Housing</h3>
                                            <h4 className="text-xl font-bold mb-4">Accommodation</h4>
                                            <p className="text-black text-[18px] leading-relaxed font-medium">
                                                Secure housing before arrival. Kestora University does provide on-campus housing directly, we assist with the application process. Confirm your move-in date and transport route.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-[18px] font-bold text-black mb-4">Essentials</h3>
                                            <h4 className="text-xl font-bold mb-4">What to Bring</h4>
                                            <p className="text-black text-[18px] leading-relaxed font-medium">
                                                Bring your passport, residence permit, insurance, and enrolment documents. Pack items suitable for the local climate.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Arriving in the Country */}
                        <section id="arriving" className="scroll-mt-32">
                            <div className="max-w-3xl">
                                <h2 className="text-4xl font-black mb-8">
                                    Arriving
                                </h2>

                                <div className="space-y-8">
                                    <div className="bg-neutral-50 p-8 rounded-sm">
                                        <h3 className="text-[18px] font-bold text-black mb-4">Logistics</h3>
                                        <h4 className="text-xl font-bold mb-4">Airport & Transit</h4>
                                        <p className="text-black text-[18px] leading-relaxed font-medium">
                                            Use public transport based on instructions from your accommodation. Taxi services are available but expensive. Keep your address and directions ready.
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="pl-6">
                                            <h4 className="text-lg font-bold mb-3 text-black">First Days</h4>
                                            <p className="text-black text-[18px] leading-relaxed font-medium">
                                                Move into your home, register with local authorities, and consider opening a bank account or getting a local SIM card.
                                            </p>
                                        </div>
                                        <div className="pl-6">
                                            <h4 className="text-lg font-bold mb-3 text-black">Locale</h4>
                                            <p className="text-black text-[18px] leading-relaxed font-medium">
                                                Familiarise yourself with nearby public transport routes, grocery stores, and essential services.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </section>

                        {/* Starting at Kestora University */}
                        <section id="starting" className="scroll-mt-32">
                            <div className="bg-neutral-50 text-black p-12 rounded-sm space-y-8">
                                <h2 className="text-3xl font-black tracking-tight">Starting at Kestora</h2>

                                <div className="grid md:grid-cols-2 gap-12">
                                    <div>
                                        <h4 className="text-[18px] font-bold text-black mb-4">Engagement</h4>
                                        <h5 className="text-xl font-bold mb-4 tracking-tight">Orientation Week</h5>
                                        <p className="text-black text-[18px] leading-relaxed font-medium">
                                            Orientation sessions help you understand your programme, meet faculty and fellow students, and learn to navigate campus systems. Attendance is strongly encouraged.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-[18px] font-bold text-black mb-4">Support</h4>
                                        <h5 className="text-xl font-bold mb-4 tracking-tight">Student Services</h5>
                                        <p className="text-black text-[18px] leading-relaxed font-medium">
                                            Access academic advising, wellbeing services, career guidance, and international support. We encourage you to seek help whenever needed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Living & Studying */}
                        <section id="living" className="scroll-mt-32">
                            <div className="max-w-3xl">
                                <h2 className="text-4xl font-black mb-8">
                                    Success
                                </h2>

                                <div className="space-y-8">
                                    <div className="pb-8">
                                        <h4 className="text-[18px] font-bold mb-3">Academic Life</h4>
                                        <p className="text-black text-[18px] leading-relaxed font-medium">
                                            Attend classes regularly, use digital platforms, and manage your time between lectures, projects, and independent study.
                                        </p>
                                    </div>
                                    <div className="pb-8">
                                        <h4 className="text-[18px] font-bold mb-3">Learn the language</h4>
                                        <div className="space-y-4">
                                            <p className="text-black text-[18px] leading-relaxed font-medium">
                                                You can get by in Finland with English only - especially in the capital region - as the Finnish people are among the best non-native English speakers in the world. However, learning the local language will make your stay more rewarding and improve your career options significantly.
                                            </p>
                                            <p className="text-black text-[18px] leading-relaxed font-medium">
                                                Finland is officially a bilingual country with Finnish (95%) and Swedish (5%). Finnish is part of the Finno-Ugric family of languages, and the structure and vocabulary are very different from the Indo-European languages. But it doesn't mean that it is difficult - it is merely different!
                                            </p>

                                            <p className="text-black text-[18px] leading-relaxed font-medium">
                                                &quot;Kielibuusti&quot; is a project that develops solutions to support the Finnish and Swedish language skills of international talents. Check out their website, which provides practical, research-based models and tools for language learners, teachers, higher education institutions, and work communities. The materials are available for all, free of charge.
                                            </p>
                                            <a
                                                href="https://www.kielibuusti.fi"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-[18px] font-bold text-black underline hover:opacity-70 transition-opacity"
                                            >
                                                Kielibuusti: language learning tips and materials <ArrowRight size={14} weight="bold" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="pb-8">
                                        <h4 className="text-[18px] font-bold mb-3">Stay Connected</h4>
                                        <p className="text-black text-[18px] leading-relaxed font-medium">
                                            Check your Kestora email and student portal regularly for updates, schedules, and important announcements.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Welcome Footer Message */}
                        <section id="welcome" className="scroll-mt-32 pt-20">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl font-black mb-6">We Are Glad You Are Here</h2>
                                <p className="text-lg text-black leading-relaxed font-bold mb-8">
                                    "Arriving in a new place can feel overwhelming, but Kestora University is here to support you from arrival through graduation. With preparation and curiosity, your experience will be both rewarding and memorable."
                                </p>
                                <div className="flex gap-4">
                                        <Link
                                            href="/student-guide"
                                            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-sm text-[18px] font-bold hover:bg-neutral-800 transition-all shadow-lg"
                                        >
                                            Explore Student Guide <ArrowRight size={16} weight="bold" />
                                        </Link>
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
