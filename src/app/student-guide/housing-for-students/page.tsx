import { ArrowRight, House, Users, ListChecks, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@aalto-dx/react-components";
import { Hero } from '@/components/layout/Hero';
import Image from 'next/image';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import { Card } from '@/components/ui/Card';
import { ContentBox } from '@/components/ui/ContentBox';
import { Highlight } from '@/components/ui/Highlight';

export const metadata = {
    title: 'Housing for Students | Kestora University',
    description: 'Find information about student housing, apartments, and shared flats for students at Kestora University.',
    alternates: {
        canonical: 'https://kestora.online/student-guide/housing-for-students/',
    },
};

const sections = [
    { id: 'overview', title: 'Housing Overview', content: '' },
    { id: 'providers', title: 'Housing Providers', content: '' },
    { id: 'applying', title: 'How to Apply', content: '' },
    { id: 'private-market', title: 'Private Market', content: '' },
    { id: 'settling-in', title: 'Settling In', content: '' },
];

export default function HousingGuidePage() {
    return (
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white text-black font-sans pb-20">
                {/* Hero Section */}
                <Hero
                    title="Housing for Students"
                    body="Finding a comfortable place to live is essential for your academic success. This guide provides information on student housing options and how to secure your new home."
                    backgroundColor="#ffc341"
                    tinted
                    lightText={false}
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Student Guide', href: '/student-guide' },
                        { label: 'Housing' }
                    ]}
                    image={{
                        src: "/images/housing-hero-pin.jpg",
                        alt: "Student Housing"
                    }}
                />

                <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
                    <div className="space-y-20">
                        {/* Overview */}
                        <section id="overview" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-10 text-black tracking-tight">Your New Home</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <Card
                                    title="Shared Apartments"
                                    body="A cost-effective option where you have your own private bedroom but share the kitchen and bathroom with 1-3 other students."
                                />
                                <Card
                                    title="Studio Apartments"
                                    body="A private apartment with your own kitchen and bathroom. Highly popular with longer waiting lists."
                                />
                            </div>
                        </section>

                        <Highlight 
                            body="Moving to Helsinki was a big step, but finding a student flat through HOAS made it much easier. Living with other students helped me make friends instantly."
                            source="Sarah Johnson, MSc Student"
                            alignment="left"
                        />

                        {/* Providers */}
                        <section id="providers" className="scroll-mt-32">
                            <ContentBox
                                icon="house"
                                title="Housing Providers"
                                body={
                                    <div className="grid md:grid-cols-2 gap-8 text-left">
                                        <div>
                                            <h4 className="font-bold text-black mb-2">HOAS</h4>
                                            <p className="text-sm text-neutral-600 font-bold">The Foundation for Student Housing in the Helsinki Region (HOAS) is the primary provider for Kestora University students.</p>
                                            <Link href="https://hoas.fi/en/" target="_blank" className="font-bold underline text-xs mt-4 block">Visit HOAS.fi</Link>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-black mb-2">Other Foundations</h4>
                                            <p className="text-sm text-neutral-600 font-bold">Various student nations and organizations also offer housing with specific eligibility criteria.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </section>

                        {/* How to Apply */}
                        <section id="applying" className="scroll-mt-32">
                            <ContentBox
                                size="large"
                                icon="listChecks"
                                title="How to Apply"
                                body={
                                    <div className="space-y-8 text-left">
                                        <div className="flex gap-6 items-start">
                                            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold shrink-0 rounded-full">1</div>
                                            <div>
                                                <h4 className="font-bold text-black mb-1">Accept Your Study Offer</h4>
                                                <p className="text-sm text-neutral-600 font-bold">Application for student housing typically begins after you've accepted your admission.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 items-start">
                                            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold shrink-0 rounded-full">2</div>
                                            <div>
                                                <h4 className="font-bold text-black mb-1">Submit Application</h4>
                                                <p className="text-sm text-neutral-600 font-bold">Fill out forms on provider websites. Be realistic with area choices to improve chances.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 items-start">
                                            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold shrink-0 rounded-full">3</div>
                                            <div>
                                                <h4 className="font-bold text-black mb-1">Confirm Your Offer</h4>
                                                <p className="text-sm text-neutral-600 font-bold">Confirm and pay the deposit by the deadline to secure your new home.</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        </section>

                        {/* Private Market */}
                        <section id="private-market" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-10 text-black tracking-tight">Private Market</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <Card
                                    title="Lumo & VVO"
                                    body="Commercial providers offering high-quality apartments across the city."
                                    cta={{ label: "Visit Lumo", linkComponentProps: { href: "https://lumo.fi/en/", target: "_blank" } }}
                                />
                                <Card
                                    title="Vuokraovi.com"
                                    body="The largest search engine for rental apartments in Finland."
                                    cta={{ label: "Visit Vuokraovi", linkComponentProps: { href: "https://www.vuokraovi.com/?locale=en", target: "_blank" } }}
                                />
                                <Card
                                    title="Oikotie.fi"
                                    body="Popular platform for both public and private rental listings."
                                    cta={{ label: "Visit Oikotie", linkComponentProps: { href: "https://asunnot.oikotie.fi/vuokra-asunnot", target: "_blank" } }}
                                />
                            </div>
                        </section>

                        {/* Settling In */}
                        <section id="settling-in" className="scroll-mt-32">
                            <ContentBox
                                backgroundColor="#472247"
                                title={<span className="text-white">Settling In</span>}
                                body={
                                    <div className="space-y-8">
                                        <p className="text-neutral-400 font-bold leading-relaxed">
                                            Living in Finland involves unique aspects like quiet hours at night and ubiquitous saunas. Most buildings offer shared laundry and bookable sauna sessions.
                                        </p>
                                        <Link
                                            href="/student-guide/arrival"
                                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-neutral-200 transition-all"
                                        >
                                            Read the Arrival Guide <ArrowRight size={16} weight="bold" />
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
