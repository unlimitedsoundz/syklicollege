import { ArrowRight, Airplane, MapPin, GraduationCap, ChatCircleDots, BookOpen, Globe } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@aalto-dx/react-components";
import { Hero } from '@/components/layout/Hero';
import Image from 'next/image';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import { Card } from '@/components/ui/Card';
import { ContentBox } from '@/components/ui/ContentBox';

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
            <div className="min-h-screen bg-white text-black font-sans">
            {/* Hero Section */}
            <Hero
                title="Arrival Guide"
                body="Starting your studies at Kestora University is an exciting step. This guide helps you prepare, settle in, and feel confident."
                backgroundColor="#dc6ade"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Student Guide', href: '/student-guide' },
                    { label: 'Arrival Guide' }
                ]}
                image={{
                    src: "/images/arrival-hero-v2.jpg",
                    alt: "Kestora Arrival"
                }}
            />

            <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
                <div className="space-y-20">
                    {/* Before You Arrive */}
                    <section id="before-you-arrive" className="scroll-mt-32">
                        <h2 className="text-aalto-5 font-bold mb-10 text-black tracking-tight">Before You Arrive</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card
                                title="Enrolment"
                                body="Ensure you have accepted your admission offer, paid tuition fees, and completed enrolment as an attending student."
                                badge={{ label: "Essential" }}
                            />
                            <Card
                                title="Visa & Permits"
                                body="International students (outside EU/EEA) should apply for a residence permit early. Ensure your passport is valid."
                                badge={{ label: "Legal" }}
                            />
                            <Card
                                title="Accommodation"
                                body="Secure housing before arrival. Kestora assists with the application process for on-campus options."
                                badge={{ label: "Housing" }}
                            />
                            <Card
                                title="What to Bring"
                                body="Bring your passport, residence permit, insurance, and enrolment documents. Pack for the local climate."
                                badge={{ label: "Checklist" }}
                            />
                        </div>
                    </section>

                    {/* Arriving */}
                    <section id="arriving" className="scroll-mt-32">
                        <ContentBox
                            size="large"
                            icon="airplane"
                            title="Arriving in the Country"
                            body={
                                <div className="space-y-8 text-left">
                                    <div className="bg-white p-8 rounded-2xl border border-neutral-200">
                                        <h4 className="font-bold text-xl mb-4 text-black">Airport & Transit</h4>
                                        <p className="text-sm text-neutral-700 leading-relaxed font-bold">
                                            Use public transport based on instructions from your accommodation. Taxi services are available but expensive.
                                        </p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">First Days</h4>
                                            <p className="text-sm text-neutral-600 font-bold">Move into your home, register with local authorities, and consider opening a bank account.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">Locale</h4>
                                            <p className="text-sm text-neutral-600 font-bold">Familiarise yourself with nearby public transport routes, grocery stores, and essential services.</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </section>

                    {/* Starting at Kestora */}
                    <section id="starting" className="scroll-mt-32">
                        <ContentBox
                            size="large"
                            icon="graduationCap"
                            title="Starting at Kestora"
                            body={
                                <div className="grid md:grid-cols-2 gap-12 text-left">
                                    <div>
                                        <h4 className="font-bold text-xl mb-4">Orientation Week</h4>
                                        <p className="text-sm text-neutral-700 leading-relaxed font-bold">
                                            Orientation sessions help you understand your programme, meet faculty and fellow students, and learn to navigate campus systems.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-4">Student Services</h4>
                                        <p className="text-sm text-neutral-700 leading-relaxed font-bold">
                                            Access academic advising, wellbeing services, career guidance, and international support.
                                        </p>
                                    </div>
                                </div>
                            }
                        />
                    </section>

                    {/* Success / Living */}
                    <section id="living" className="scroll-mt-32">
                        <h2 className="text-aalto-5 font-bold mb-10 text-black tracking-tight">Living & Studying</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card
                                title="Academic Life"
                                body="Attend classes regularly, use digital platforms, and manage your time effectively between lectures and independent study."
                            />
                            <Card
                                title="Stay Connected"
                                body="Check your Kestora email and student portal regularly for updates, schedules, and important announcements."
                            />
                        </div>
                        <div className="mt-12">
                            <ContentBox
                                icon="globe"
                                title="Learn the Language"
                                body={
                                    <div className="space-y-6 text-left">
                                        <p className="text-sm font-bold text-neutral-700 leading-relaxed">
                                            While English is widely spoken, learning Finnish or Swedish will make your stay more rewarding and improve your career options significantly.
                                        </p>
                                        <div className="bg-[#f2f2f2] p-6 rounded-xl border-l-4 border-black">
                                            <p className="text-sm font-bold italic">
                                                "Kielibuusti" provides practical, research-based models and tools for language learners.
                                            </p>
                                        </div>
                                        <Link href="https://www.kielibuusti.fi" target="_blank" className="font-bold underline text-sm inline-flex items-center gap-2">
                                            Visit Kielibuusti <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                }
                            />
                        </div>
                    </section>

                    {/* Welcome Message */}
                    <section id="welcome" className="scroll-mt-32 pt-20">
                        <ContentBox
                            backgroundColor="#472247"
                            title={<span className="text-white">We Are Glad You Are Here</span>}
                            body={
                                <div className="space-y-8">
                                    <p className="text-neutral-400 font-bold text-lg max-w-2xl">
                                        "Arriving in a new place can feel overwhelming, but Kestora University is here to support you from arrival through graduation."
                                    </p>
                                    <Link
                                        href="/student-guide"
                                        className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-neutral-200 transition-all"
                                    >
                                        Explore Student Guide <ArrowRight size={16} weight="bold" />
                                    </Link>
                                </div>
                            }
                        />
                    </section>
                </div>
            </div>
        </div>
        </GuideSidebarLayout>
    );
}
