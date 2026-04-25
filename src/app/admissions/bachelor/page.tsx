
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';
import { ArrowRight, CheckCircle, Globe, Users, BookOpen, Briefcase, GraduationCap, Calendar, MapPin } from '@phosphor-icons/react/dist/ssr';
import { Hero } from '@/components/layout/Hero';
import BachelorFAQ from '@/components/admissions/BachelorFAQ';
import DbPageContent from '@/components/DbPageContent';
import { getPageContentSection } from '@/lib/pageContentConfig';

import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SchemaLD } from '@/components/seo/SchemaLD';
import { Breadcrumbs } from '@aalto-dx/react-modules';

export const metadata = {
    title: 'Bachelor\'s Admissions | Kestora University',
    description: 'Apply to Bachelor\'s Programmes in English at Kestora University. Information on benefits, progression, scholarships, and admissions.',
    alternates: {
        canonical: 'https://kestora.online/admissions/bachelor/',
        languages: {
            'en': 'https://kestora.online/admissions/bachelor/',
            'fi': 'https://kestora.online/admissions/bachelor-fi/',
        },
    },
};

const sections = [
    { id: 'benefits', title: 'How You Benefit', content: '' },
    { id: 'progression', title: 'Bachelor\'s to Master\'s', content: '' },
    { id: 'scholarships', title: 'Scholarships & Tuition Fees', content: '' },
    { id: 'admissions', title: 'Admission Info', content: '' },
    { id: 'events', title: 'Fairs & Events', content: '' },
    { id: 'faq', title: 'FAQ', content: '' },
    { id: 'more', title: 'Learn More', content: '' },
];



export default function BachelorAdmissionsPage() {
    const pageSlug = 'admissions-bachelor';
    const getSectionDefault = (sectionKey: string) => getPageContentSection(pageSlug, sectionKey)?.defaultContent ?? '';

    return (
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <Hero
                title={
                    <DbPageContent
                        tagName="span"
                        pageSlug={pageSlug}
                        sectionKey="hero_title"
                        fallbackContent={getSectionDefault('hero_title')}
                    />
                }
                body={
                    <DbPageContent
                        tagName="span"
                        pageSlug={pageSlug}
                        sectionKey="hero_subtitle"
                        fallbackContent={getSectionDefault('hero_subtitle')}
                    />
                }
                backgroundColor="#ffc341"
                tinted
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Admissions', href: '/admissions' },
                    { label: 'Bachelor' }
                ]}
                image={{
                    src: "/images/admissions/hero.jpg",
                    alt: "Bachelor's Students"
                }}
            >
                <Link href="/admissions/application-process" className="text-aalto-3 font-bold underline underline-offset-8 decoration-black hover:opacity-70 transition-colors text-black inline-flex items-center gap-2">
                    Start application <ArrowRight size={20} weight="bold" />
                </Link>
            </Hero>

            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-12 space-y-8 md:space-y-24">

                        {/* How You Benefit */}
                        <section id="benefits" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black">
                                How You Benefit from Our Programmes
                            </h2>
                            <div className="prose-arrows">
                                <DbPageContent
                                    pageSlug={pageSlug}
                                    sectionKey="benefits_content"
                                    fallbackContent={getSectionDefault('benefits_content')}
                                />
                            </div>
                        </section>

                        {/* From Bachelor's to Master's */}
                        <section id="progression" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black">
                                From Bachelor's to Master's
                            </h2>
                            <div className="prose-arrows">
                                <DbPageContent
                                    pageSlug={pageSlug}
                                    sectionKey="progression_content"
                                    fallbackContent={getSectionDefault('progression_content')}
                                />
                            </div>
                        </section>

                    </div>
                </div>
            </div>

            {/* YELLOW QUOTE BANNER */}
            <div className="w-full bg-neutral-100 text-black py-6 my-6">
                <div className="container mx-auto px-4 text-left md:text-center max-w-4xl">
                    <DbPageContent
                        pageSlug={pageSlug}
                        sectionKey="quote_content"
                        fallbackContent={getSectionDefault('quote_content')}
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-3"></div> {/* Spacer to align with previous grid if needed, or just center content from here. Let's keep distinct layout. */}

                    <div className="lg:col-span-12 space-y-24">
                        {/* Scholarships */}
                        <section id="scholarships" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-6 text-black">
                                Scholarships and Tuition Fees
                            </h2>
                            <div className="prose-arrows">
                                <DbPageContent
                                    pageSlug={pageSlug}
                                    sectionKey="scholarships_content"
                                    fallbackContent={getSectionDefault('scholarships_content')}
                                />
                            </div>
                        </section>

                        {/* Admissions Info */}
                        <section id="admissions" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black">
                                Information on Student Admissions
                            </h2>
                            <div className="prose-arrows">
                                <DbPageContent
                                    pageSlug={pageSlug}
                                    sectionKey="admissions_content"
                                    fallbackContent={getSectionDefault('admissions_content')}
                                />
                            </div>
                        </section>

                         {/* Learn More */}
                         <section id="more" className="scroll-mt-32 text-left">
                             <h2 className="text-3xl font-bold mb-8">Learn More About Studying at Kestora</h2>
                             <div className="prose-arrows">
                                 <DbPageContent
                                     pageSlug={pageSlug}
                                     sectionKey="more_content"
                                     fallbackContent={getSectionDefault('more_content')}
                                 />
                             </div>
                         </section>

                         {/* Fairs & Events */}
                          <section id="events" className="scroll-mt-32">
                             <h2 className="text-3xl font-bold mb-6 text-black">
                                 Fairs and Events
                             </h2>
                             <div className="prose-arrows">
                                 <DbPageContent
                                     pageSlug={pageSlug}
                                     sectionKey="events_content"
                                     fallbackContent={getSectionDefault('events_content')}
                                 />
                             </div>
                         </section>

                         {/* FAQ */}
                         <section id="faq" className="scroll-mt-32">
                             <h2 className="text-3xl font-bold mb-8 text-black">
                                 Frequently Asked Questions
                             </h2>
                             <BachelorFAQ />
                         </section>




                    </div>
                </div>
            </div>
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'Admissions', item: '/admissions' },
                { name: 'Bachelor\'s Admissions', item: '/admissions/bachelor' }
            ]} />
            <SchemaLD data={{
                "@context": "https://schema.org",
                "@type": "EducationalOccupationalProgram",
                "name": "Bachelor's Degree Programmes",
                "description": "Information on Bachelor's degree programmes taught in English at Kestora University.",
                "provider": {
                    "@type": "UniversityOrUniversity",
                    "name": "Kestora University",
                    "url": "https://kestora.online"
                },
                "educationalLevel": "Bachelor",
                "offers": {
                    "@type": "Offer",
                    "category": "Bachelor's Programmes"
                }
            }} />
        </div>
        </GuideSidebarLayout>
    );
}
