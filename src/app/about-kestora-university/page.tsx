import { createClient } from "@/utils/supabase/server";
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar } from "@phosphor-icons/react/dist/ssr";
import { formatToDDMMYYYY } from '@/utils/date';

export const metadata = {
    title: 'About Kestora University — Our Story, Mission & Helsinki Campus',
    description: 'Kestora University is an independent higher education institution in Helsinki, Finland, offering English-taught Bachelor’s and Master’s degree programmes focused on engineering, technology, business, science, and the arts.',
    alternates: {
        canonical: 'https://kestora.online/about-kestora-university/',
    },
};

import { Hero } from "@/components/layout/Hero";
import DynamicNewsSection from "@/components/news/DynamicNewsSection";
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SchemaLD } from '@/components/seo/SchemaLD';
import { ContentBox } from "@/components/ui/ContentBox";
import { Card } from "@/components/ui/Card";

export default async function AboutPage() {


    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'About Kestora University', item: '/about-kestora-university' }
            ]} />

            <SchemaLD data={{
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "name": "About Kestora University",
                "url": "https://kestora.online/about-kestora-university",
                "mainEntity": {
                    "@type": "EducationalOrganization",
                    "name": "Kestora University Helsinki",
                    "description": "Kestora University is an independent higher education institution in Helsinki, Finland, offering English-taught Bachelor's and Master's degree programmes.",
                    "url": "https://kestora.online"
                }
            }} />

            {/* HERO SECTION */}
            <Hero
                title="About Kestora University"
                body="Learn about Kestora University, an independent higher education institution based in Helsinki, Finland, focused on sustainability, innovation, and practical learning. Kestora University brings together academic knowledge and real-world application to prepare students for global careers."
                backgroundColor="#6c531b"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'About' }
                ]}
                image={{
                    src: "/images/campus-welcome-v2.png",
                    alt: "Kestora University – Helsinki Campus main building"
                }}
            />

            <div className="container mx-auto px-4 py-8 md:py-24">

                {/* Content Sections: Philosophy, Mission & Approach */}
                <section className="mb-32">
                    <div className="grid lg:grid-cols-2 gap-16 mb-24">
                        <ContentBox
                            icon="bookOpen"
                            title="Our Philosophy"
                            body={
                                <div className="space-y-4">
                                    <p>Kestora University is inspired by the Nordic tradition of Sivistys — a holistic approach to education that combines personal development, critical thinking, and social responsibility.</p>
                                    <p>We believe that meaningful learning happens where theory meets practice. Our educational approach emphasizes applied learning, project-based collaboration, and real-world problem solving.</p>
                                </div>
                            }
                        />
                        <ContentBox
                            icon="target"
                            title="Our Mission"
                            body={
                                <div className="space-y-4">
                                    <p>Our mission is to empower future professionals with the skills, knowledge, and ethical awareness needed to contribute responsibly to society and the global economy.</p>
                                    <ul className="space-y-2">
                                        {[
                                            "English-taught Bachelor’s and Master’s level studies",
                                            "Multidisciplinary academic pathways",
                                            "Practice-oriented learning models",
                                            "An international student community in Helsinki"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-black mt-1.5 shrink-0" />
                                                <span className="text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        />
                    </div>

                    <div className="mb-24">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p6 text-black">Our Academic Approach</h2>
                            <p className="text-aalto-3 text-black leading-aalto-3 mb-10">
                                Kestora University promotes:
                            </p>
                            <ul className="grid md:grid-cols-2 gap-6 mb-12 text-left">
                                {[
                                    "Learning through real-world projects",
                                    "Collaboration with external partners and industry networks",
                                    "Multidisciplinary study opportunities",
                                    "A balance between academic foundations and applied skills"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-800 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                                        <div className="w-2 h-2 bg-black mt-2 shrink-0" />
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-aalto-3 text-black leading-aalto-3 bg-gray-100 p-8 rounded-3xl">
                                Our campus in Helsinki offers a supportive environment where students, educators, and partners collaborate to explore contemporary challenges and future-oriented solutions.
                            </p>
                        </div>
                    </div>

                    <section id="graduation" className="scroll-mt-32 mb-16">
                        <ContentBox
                            size="large"
                            icon="graduationCap"
                            title="After Graduation"
                            body={
                                <div className="space-y-8">
                                    <p>
                                        Kestora University supports your transition to working life. We offer resources for job seeking, career guidance, and alumni networking both in Finland and internationally.
                                    </p>
                                    <Link href="/careers" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold transition-all hover:bg-neutral-800">
                                        Explore Career Services <ArrowRight size={20} weight="bold" />
                                    </Link>
                                </div>
                            }
                        />
                    </section>

                    {/* Specialized Campuses */}
                    <div className="mb-32">
                        <h2 className="text-aalto-5 font-bold mb-12 text-center text-black">Our Specialized Campuses</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card
                                title="School of Arts & Design"
                                body="Preparing students for international careers in the creative industries, from digital design to contemporary architecture."
                                cta={{
                                    label: "Explore Campus",
                                    linkComponentProps: { href: "/schools/arts" }
                                }}
                            />
                            <Card
                                title="School of Business"
                                body="Empowering future leaders with English-taught programmes in international management, finance, and entrepreneurship."
                                cta={{
                                    label: "Explore Campus",
                                    linkComponentProps: { href: "/schools/business" }
                                }}
                            />
                            <Card
                                title="School of Technology"
                                body="Specializing in the development of smart infrastructure, automation, and industrial engineering solutions."
                                cta={{
                                    label: "Explore Campus",
                                    linkComponentProps: { href: "/schools/technology" }
                                }}
                            />
                            <Card
                                title="School of Science"
                                body="Focusing on applied scientific research, data-driven innovation, and the development of transformative materials."
                                cta={{
                                    label: "Explore Campus",
                                    linkComponentProps: { href: "/schools/science" }
                                }}
                            />
                        </div>
                    </div>
                </section>
            </div>



            {/* Key Figures - Black and White */}
            <div className="py-24 bg-black text-white w-full">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center max-w-5xl mx-auto">
                        <div className="flex flex-col items-center">
                            <span className="text-7xl md:text-8xl font-light uppercase tracking-tighter leading-none mb-4">2.4k</span>
                            <span className="text-sm font-normal uppercase tracking-[0.3em] text-white/60">Students</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-7xl md:text-8xl font-light uppercase tracking-tighter leading-none mb-4">250</span>
                            <span className="text-sm font-normal uppercase tracking-[0.3em] text-white/60">Faculty</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-7xl md:text-8xl font-light uppercase tracking-tighter leading-none mb-4">60+</span>
                            <span className="text-sm font-normal uppercase tracking-[0.3em] text-white/60">Countries</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-24">

                {/* Partnerships Section */}
                <section className="mb-32">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-8 bg-gray-100 p-12 rounded-3xl shadow-sm text-black">
                            <h2 className="text-aalto-5 font-bold text-black mb-aalto-p4 tracking-tight">Industry & Research Partnerships</h2>
                            <p className="text-lg text-gray-800 leading-relaxed">
                                We don't just study the future; we build it. Kestora University maintains strategic partnerships with over 200 global companies and research institutions. Our students have direct access to internships, joint research projects, and innovation labs that bridge the gap between academic theory and market-ready solutions.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-300 mt-8">
                                <ContentBox
                                    icon="globe"
                                    title="Global Network"
                                    body="Member of the World Federation of Sustainability Universities."
                                />
                                <ContentBox
                                    icon="briefcase"
                                    title="Employment Rate"
                                    body="92% of graduates find relevant employment within 6 months."
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { src: "/images/about/yoga-class.png", alt: "Students practicing yoga in the Wellness Center", credit: "Tuuli Rantanen" },
                                { src: "/images/about/art-gallery.jpg", alt: "Student artwork displayed in the campus gallery", credit: "Oskar Heikkilä" },
                                { src: "/images/about/communal-kitchen.jpg", alt: "Students cooking together in the communal kitchen", credit: "Maija Lehtinen" },
                                { src: "/images/about/student-collab.jpg", alt: "Students working together in a collaborative study space", credit: "Juha Koivisto" },
                            ].map((img, index) => (
                                <div key={index} className="relative group rounded-3xl overflow-hidden shadow-lg h-64 md:h-auto md:aspect-square">
                                    <div className="absolute inset-0 bg-black opacity-20 mix-blend-multiply group-hover:opacity-5 transition-opacity z-10 duration-500"></div>
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="community" className="scroll-mt-32 mb-32">
                    <ContentBox
                        size="large"
                        icon="users"
                        title="Vibrant Community"
                        body={
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-black">Life Beyond the Classroom</h3>
                                <p>
                                    From music festivals to tech hackathons, your time at Kestora is about more than just studies. Our campus in Helsinki is a hub of activity where students from over 60 countries collaborate and create.
                                </p>
                            </div>
                        }
                        image={{
                            src: "/images/news/helsinki_study_hero_1771086748710.png",
                            alt: "Kestora Community"
                        }}
                    />
                </section>

                {/* News & Events Section (Dynamic) */}
                <section className="mb-32">
                    <div className="flex justify-between items-end mb-aalto-p6">
                        <h2 className="text-aalto-5 font-bold tracking-tight">Latest from Kestora</h2>
                        <Link href="/news" className="text-sm font-bold border-b border-black pb-1 hover:text-neutral-600 transition-colors">
                            View All News
                        </Link>
                    </div>

                    <DynamicNewsSection limit={3} />
                </section>
            </div>
        </div >
    );
}

