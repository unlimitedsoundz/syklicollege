
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Globe, Users, BookOpen, Briefcase, GraduationCap, Calendar, MapPin } from '@phosphor-icons/react/dist/ssr';
import BachelorFAQ from '@/components/admissions/BachelorFAQ';
import DbPageContent from '@/components/DbPageContent';
import { getPageContentSection } from '@/lib/pageContentConfig';

import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SchemaLD } from '@/components/seo/SchemaLD';

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
            {/* 1. HERO SECTION (Split Layout) */}
            <section className="bg-[#FFE600] text-black overflow-hidden">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-12 pb-12 lg:pb-0 h-auto lg:h-[600px] lg:py-0 relative mb-0">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <DbPageContent
                            tagName="h1"
                            className="font-bold leading-[1.1] tracking-tight pt-8 text-black"
                            style={{ fontSize: '40px' }}
                            pageSlug={pageSlug}
                            sectionKey="hero_title"
                            fallbackContent={getSectionDefault('hero_title')}
                        />
                        <DbPageContent
                            tagName="p"
                            className="text-[21px] text-black max-w-xl leading-relaxed my-0 lg:my-2 [&_p]:mb-0 [&_p]:mt-0"
                            pageSlug={pageSlug}
                            sectionKey="hero_subtitle"
                            fallbackContent={getSectionDefault('hero_subtitle')}
                        />
                        <div className="pt-2 lg:pt-6">
                            <Link href="/admissions/application-process" className="text-lg font-bold underline underline-offset-8 decoration-black hover:opacity-70 transition-colors text-black inline-flex items-center gap-2">
                                Start application <ArrowRight size={20} weight="bold" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="/images/admissions/hero.jpg"
                                    alt="Bachelor's Students"
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
            <div className="w-full bg-neutral-100 text-black py-16 my-12">
                <div className="container mx-auto px-4 text-center max-w-4xl">
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
