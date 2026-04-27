import { CheckCircle, Globe, Briefcase, Heart, MapPin, GraduationCap, ArrowRight, Question as HelpCircle, Users } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';
import { Hero } from '@/components/layout/Hero';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import { Card } from '@/components/ui/Card';
import { ContentBox } from '@/components/ui/ContentBox';
import { SchemaLD } from '@/components/seo/SchemaLD';
import { Highlight } from '@/components/ui/Highlight';

const tocSections = [
    { id: 'intro', title: 'Purpose of Guide', content: '' },
    { id: 'why-finland', title: 'Why Study in Finland', content: '' },
    { id: 'admission', title: 'After Admission', content: '' },
    { id: 'arrival', title: 'After Arrival', content: '' },
    { id: 'living', title: 'Living in Finland', content: '' },
    { id: 'faq', title: 'FAQ', content: '' },
    { id: 'support', title: 'Support Services', content: '' },
];

export const metadata = {
    title: 'International Student Guide | Kestora University',
    description: 'A comprehensive guide for international students joining Kestora University in Finland.',
    alternates: {
        canonical: 'https://kestora.online/student-guide/international/',
    },
};

export default function InternationalGuidePage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is orientation mandatory?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, it provides essential info for starting your studies. All students are expected to attend the sessions during the first week."
                }
            },
            {
                "@type": "Question",
                "name": "Can I bring my family?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, family members can apply for residence permits based on family ties. However, the student permit applicant must demonstrate sufficient financial resources for the entire family's stay."
                }
            }
        ]
    };

    return (
        <GuideSidebarLayout sections={tocSections}>
            <div className="min-h-screen bg-white text-black font-sans pb-20">
            <SchemaLD data={faqSchema} />

            {/* Hero Section */}
            <Hero
                title="International Students"
                body="Practical guidance for your journey to Finland and Kestora University."
                backgroundColor="#dc6ade"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Student Guide', href: '/student-guide' },
                    { label: 'International Students' }
                ]}
                image={{
                    src: "/images/international-students-hero.png",
                    alt: "International Students"
                }}
            />

            <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
                <div className="space-y-20">

                    {/* Purpose */}
                    <section id="intro" className="scroll-mt-32">
                        <h2 className="text-aalto-5 font-bold mb-10 text-black tracking-tight">Purpose of This Guide</h2>
                        <p className="text-aalto-3 text-black leading-aalto-3 max-w-4xl font-medium">
                            This section provides international degree and exchange students with practical guidance on what to do after admission and after arrival in Finland. It covers practicalities related to living, studying, travel, and settling in Finland.
                        </p>
                    </section>

                    {/* Why Finland */}
                    <section id="why-finland" className="scroll-mt-32">
                        <ContentBox
                            size="large"
                            icon="globe"
                            title="Why Study in Finland?"
                            image={{
                                src: "/images/news/helsinki_study_hero_1771086684833.png",
                                alt: "International students exploring Helsinki, Finland"
                            }}
                            body={
                                <div className="space-y-8 text-left">
                                    <div className="space-y-6 text-sm text-neutral-600 font-bold leading-relaxed">
                                        <p>
                                            Finland is consistently ranked among the happiest countries in the world, reflecting its strong social stability, high quality of life, and commitment to equality, integrity, and openness.
                                        </p>
                                        <p>
                                            The Finnish education system is internationally recognized as one of the most advanced in the world, with a strong emphasis on student-centered learning.
                                        </p>
                                    </div>
                                    <div className="bg-neutral-100 p-8 border-l-4 border-black">
                                        <p className="font-bold text-sm text-black uppercase tracking-widest leading-relaxed">
                                            Kestora University operates across four campuses within Helsinki, along with 15 international hubs.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-8">
                                        <Link href="https://finland.fi" target="_blank" className="font-bold underline text-xs uppercase tracking-widest hover:text-neutral-500 transition-colors">thisisFINLAND →</Link>
                                        <Link href="https://www.visitfinland.com" target="_blank" className="font-bold underline text-xs uppercase tracking-widest hover:text-neutral-500 transition-colors">Visit Finland →</Link>
                                    </div>
                                </div>
                            }
                        />
                    </section>

                    <Highlight 
                        body="The mix of high-tech innovation and beautiful nature in Helsinki is something you won't find anywhere else. It's the perfect environment for a Master's student."
                        source="Marco Rossi, International Student"
                        alignment="right"
                    />

                    {/* After Admission */}
                    <section id="admission" className="scroll-mt-32">
                         <h2 className="text-aalto-5 font-bold mb-10 text-black tracking-tight">
                             Practical Things to Do After Admission
                         </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <Card
                                title="Residence Permits & Insurance"
                                body="Non-EU/EEA students should apply immediately. Check health insurance requirements as part of the permit application."
                                cta={{ label: "Visit Migri.fi", linkComponentProps: { href: "https://migri.fi/en/home", target: "_blank" } }}
                            />
                            <Card
                                title="Housing"
                                body="Arrange accommodation before arrival. Explore student housing associations or private market options early."
                                cta={{ label: "Housing Guide", linkComponentProps: { href: "/student-guide/housing-for-students" } }}
                            />
                            <Card
                                title="Financial Matters"
                                body="Plan for local costs and banking. Ensure you have access to funds upon arrival before setting up a local account."
                            />
                            <Card
                                title="Tuition & Scholarships"
                                body="Policies apply to non-EU/EEA citizens. Check scholarship opportunities for fee support."
                                cta={{ label: "Tuition Info", linkComponentProps: { href: "/admissions/tuition" } }}
                            />
                        </div>
                    </section>

                    {/* After Moving */}
                    <section id="arrival" className="scroll-mt-32">
                        <ContentBox
                            size="large"
                            icon="mapPin"
                            title="After Moving to Finland"
                            body={
                                <div className="space-y-10 text-left">
                                    <div>
                                        <h4 className="font-bold text-black mb-2 uppercase tracking-widest text-xs">Local Transportation</h4>
                                        <p className="text-sm text-neutral-600 font-bold leading-relaxed mb-4">
                                            Public transport is punctual and extensive. Students are typically entitled to discounted travel on HSL and VR systems.
                                        </p>
                                    </div>

                                    <div className="bg-neutral-50 p-8 border border-neutral-100">
                                        <h4 className="font-bold text-lg mb-4 text-black">Registering with Authorities</h4>
                                        <div className="space-y-3 text-sm font-bold">
                                            <p className="flex gap-4 items-center underline"><ArrowRight size={14} weight="bold" /> EU/EEA Citizens: Register right of residence at DVV.</p>
                                            <p className="flex gap-4 items-center underline"><ArrowRight size={14} weight="bold" /> Non-EU/EEA: Must visit DVV for municipality registration.</p>
                                        </div>
                                        <div className="mt-10">
                                            <Link href="/student-guide/arrival" className="bg-black text-white px-8 py-4 font-bold inline-flex items-center gap-2 hover:bg-neutral-800 transition-all uppercase tracking-widest text-xs">
                                                Arrival Guide <ArrowRight size={16} weight="bold" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-black mb-4 uppercase tracking-widest text-xs">Post-Arrival Checklist</h4>
                                        <ul className="space-y-4 text-sm font-bold">
                                            <li className="flex gap-4 items-center"><ArrowRight size={20} weight="bold" className="shrink-0" /> Pick up keys for housing</li>
                                            <li className="flex gap-4 items-center"><ArrowRight size={20} weight="bold" className="shrink-0" /> Register at DVV</li>
                                            <li className="flex gap-4 items-center"><ArrowRight size={20} weight="bold" className="shrink-0" /> Pay Student Union fee</li>
                                            <li className="flex gap-4 items-center"><ArrowRight size={20} weight="bold" className="shrink-0" /> Get HSL transport card</li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        />
                    </section>

                    {/* Living in Finland */}
                    <section id="living" className="scroll-mt-32">
                         <h2 className="text-aalto-5 font-bold mb-10 text-black tracking-tight">
                             Living in Finland
                         </h2>
                        <div className="mb-12">
                             <div className="relative aspect-video overflow-hidden border border-neutral-100">
                                <Image
                                    src="/images/news/helsinki_study_hero_1771086631952.png"
                                    alt="Students enjoying life in Helsinki, Finland"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 1200px"
                                />
                            </div>
                        </div>
                         <div className="grid md:grid-cols-2 gap-8">
                            <Card
                                title="Student Health Care"
                                body="Degree students must pay the healthcare fee to Kela. This grants access to the Finnish Student Health Service (FSHS)."
                            />
                            <Card
                                title="Local Culture"
                                body="Finland is safe and equal. English is widely spoken, but learning Finnish is encouraged for integration."
                            />
                            <Card
                                title="Working"
                                body="International students can work part-time (up to 30h/week). Finnish skills improve employability."
                            />
                            <Card
                                title="Studying Finnish"
                                body="Language courses are available for all levels. It enhances job prospects and local integration."
                            />
                         </div>
                     </section>

                    {/* Support Services */}
                    <section id="support" className="scroll-mt-32">
                         <h2 className="text-aalto-5 font-bold mb-10 text-black tracking-tight">Support Services</h2>
                         <div className="grid md:grid-cols-3 gap-8">
                            <ContentBox
                                icon="users"
                                title="Peer Advice"
                                body="Connect with current international students for practical tips on student life."
                            />
                            <ContentBox
                                icon="identificationBadge"
                                title="Service Desk"
                                body="General guidance on academic procedures, enrollment, and registration."
                            />
                            <ContentBox
                                icon="briefcase"
                                title="Study & Stay"
                                body="Specialised career support to help you plan your career and integrate in Finland."
                            />
                         </div>
                    </section>

                    <div className="mt-12 pt-8 border-t border-neutral-100 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                        <p>Updated: 25.4.2026 | Kestora International Student Services</p>
                    </div>
                </div>
            </div>
            </div>
        </GuideSidebarLayout>
    );
}

