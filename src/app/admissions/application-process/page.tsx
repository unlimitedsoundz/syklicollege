
import { CheckCircle, ArrowRight, Calendar, GraduationCap, Globe, Clock } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import Image from 'next/image';
import ApplicationFAQ from '@/components/admissions/ApplicationFAQ';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import DbPageContent from '@/components/DbPageContent';
import { getPageContentSection } from '@/lib/pageContentConfig';

const sections = [
    { id: 'steps', title: 'Application Steps', content: '' },
    { id: 'documents', title: 'Required Documents', content: '' },
    { id: 'requirements', title: 'Specific Requirements', content: '' },
    { id: 'evaluation', title: 'Evaluation & Decisions', content: '' },
    { id: 'faq', title: 'FAQ', content: '' },
];

export const metadata = {
    title: 'How to Apply | Kestora University',
    description: 'Step-by-step guide to applying to Kestora University. Deadlines, requirements, and admission procedures.',
    alternates: {
        canonical: 'https://kestora.online/admissions/application-process/',
    },
};

export default function ApplicationProcessPage() {
    const pageSlug = 'admissions-application-process';
    const getSectionDefault = (sectionKey: string) => getPageContentSection(pageSlug, sectionKey)?.defaultContent ?? '';

    return (
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white text-black">
            {/* Hero Section */}
            <section className="text-black overflow-hidden" style={{ backgroundColor: '#DCFCE7' }}>
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-12 pb-12 lg:pb-0 h-auto lg:h-[600px] lg:py-0 relative mb-0">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <DbPageContent
                            tagName="h1"
                            className="font-bold leading-[1.1] tracking-tight pt-8 text-black"
                            style={{ fontSize: '40px' }}
                            pageSlug={pageSlug}
                            sectionKey="hero_title"
                            fallbackContent={getSectionDefault('hero_title') || 'How to Apply'}
                        />
                        <DbPageContent
                            tagName="p"
                            className="text-[21px] text-black max-w-xl leading-relaxed"
                            pageSlug={pageSlug}
                            sectionKey="hero_subtitle"
                            fallbackContent={getSectionDefault('hero_subtitle') || 'Follow our step-by-step guide to ensure a smooth application process for your studies at Kestora University.'}
                        />
                        <div className="flex flex-col gap-4 pt-4">
                            <Link href="#steps" className="text-lg font-bold underline underline-offset-8 decoration-black hover:opacity-70 transition-colors text-black inline-flex items-center gap-2">
                                Application steps <ArrowRight size={20} weight="bold" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="/images/admissions/how_to_apply_hero.png"
                                    alt="Application Process"
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
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto space-y-20">

                    <section id="steps" className="scroll-mt-32">
                        <h2 className="text-3xl font-bold mb-12 text-black pb-10 pl-2">Application Steps</h2>
                        <DbPageContent
                            pageSlug={pageSlug}
                            sectionKey="steps_content"
                            fallbackContent={getSectionDefault('steps_content')}
                        />



                     </section>

                    {/* Section: Required Documents Explained */}
                    <section id="documents">
                        <h2 className="text-3xl font-bold mb-8 text-black">Required Documents Explained</h2>
                        <DbPageContent
                            pageSlug={pageSlug}
                            sectionKey="documents_content"
                            fallbackContent={getSectionDefault('documents_content')}
                        />
                    </section>

                    {/* Section: Specific Requirements Checklist */}
                    <section id="requirements">
                        <DbPageContent
                            pageSlug={pageSlug}
                            sectionKey="requirements_content"
                            fallbackContent={getSectionDefault('requirements_content')}
                        />
                    </section>

                    {/* Section: Evaluation & Decisions, Waiting List, After */}
                    <section id="evaluation" className="scroll-mt-32">
                        <DbPageContent
                            pageSlug={pageSlug}
                            sectionKey="evaluation_content"
                            fallbackContent={getSectionDefault('evaluation_content')}
                        />
                    </section>

                      {/* NEW SECTION: Ready to Apply */}
                      <section className="bg-gray-100 text-black p-8 md:p-16 mt-16 text-center space-y-6 md:space-y-8">
                          <div>
                              <h2 className="text-3xl md:text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                             <p className="text-sm md:text-base text-black max-w-xl mx-auto leading-relaxed">
                                 Join the next generation of global leaders at Kestora University. Create your portal account to begin your official application.
                             </p>
                         </div>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <Link
                                 href="/portal/account/register"
                                 className="bg-black text-white px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-gray-600 transition-all inline-flex items-center gap-2 justify-center"
                             >
                                 Create Portal Account
                             </Link>
                             <Link
                                 href="/portal/account/login"
                                 className="bg-black text-white px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-gray-600 transition-all inline-block"
                             >
                                 Existing Student? Log In
                             </Link>
                         </div>
                         <p className="text-black text-xs">
                             Already have an account? Your progress will be saved automatically as you complete each step.
                         </p>
                      </section>

                      {/* Section: Frequently Asked Questions */}
                      <section id="faq" className="scroll-mt-32">
                          <div className="mb-8 pl-2">
                              <h2 className="text-3xl font-bold text-black mb-4">Frequently Asked Questions</h2>
                              <p className="text-lg text-black leading-relaxed max-w-3xl">
                                  Find quick answers to common questions regarding the application process.
                              </p>
                          </div>
                          <ApplicationFAQ />
                       </section>

                </div>
            </div>
        </div>
        </GuideSidebarLayout>
    );
}
