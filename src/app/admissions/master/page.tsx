import Link from 'next/link';
import Image from 'next/image';
import { CaretLeft, ArrowRight, Calendar, FileText, CheckCircle, GraduationCap, Globe, Clock, User, Trophy as Award } from '@phosphor-icons/react/dist/ssr';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import AdmissionsCTA from '@/components/admissions/AdmissionsCTA';
import MasterFAQ from '@/components/admissions/MasterFAQ';
import DbPageContent from '@/components/DbPageContent';
import { getPageContentSection } from '@/lib/pageContentConfig';


export const metadata = {
    title: 'Apply to Master’s Programmes | Kestora University',
    description: 'Application guide for Master’s programmes at Kestora University. Deadlines, eligibility, and steps for 2026 admission.',
    alternates: {
        canonical: 'https://kestora.online/admissions/master/',
    },
};

const sections = [
    { id: 'schedule', title: 'Admissions Schedule', content: '' },
    { id: 'study-options', title: 'Study Options', content: '' },
    { id: 'scholarships', title: 'Scholarships & Tuition Fees', content: '' },
    { id: 'eligibility', title: 'General Eligibility', content: '' },
    { id: 'field-reqs', title: 'Field-Specific Reqs', content: '' },
    { id: 'incomplete', title: 'Incomplete Degree', content: '' },
    { id: 'steps', title: 'Application Steps', content: '' },
    { id: 'documents', title: 'Required Documents', content: '' },
    { id: 'language', title: 'Language Requirements', content: '' },
    { id: 'gmat', title: 'GMAT/GRE', content: '' },
    { id: 'decisions', title: 'Decisions', content: '' },
    { id: 'after', title: 'After Admission', content: '' },
    { id: 'faq', title: 'FAQ', content: '' },
];



export default function MasterAdmissionsPage() {
    const pageSlug = 'admissions/master';
    const getSectionDefault = (sectionKey: string) => getPageContentSection(pageSlug, sectionKey)?.defaultContent ?? '';

    return (
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white">
            {/* 1. HERO SECTION (Split Style) */}
            <section className="text-black overflow-hidden" style={{ backgroundColor: '#FFFDD0' }}>
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
                            className="text-[21px] text-black max-w-xl leading-relaxed my-2"
                            pageSlug={pageSlug}
                            sectionKey="hero_subtitle"
                            fallbackContent={getSectionDefault('hero_subtitle')}
                        />
                        <div className="pt-2">
                            <Link
                                href="#steps"
                                className="text-lg font-bold underline underline-offset-8 decoration-black hover:opacity-70 transition-colors text-black inline-flex items-center gap-2"
                            >
                                How to apply <ArrowRight size={20} weight="bold" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="/images/admissions/master_hero_refined.jpg"
                                    alt="Master's Application"
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
                <Link href="/admissions" className="inline-flex items-center gap-3 text-black font-bold uppercase tracking-widest text-sm mb-12 hover:opacity-50 transition-all group">
                    <CaretLeft size={20} weight="bold" className="group-hover:-translate-x-2 transition-transform" /> Back to Admissions
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <main className="lg:col-span-12 space-y-12 md:space-y-20">

                        {/* 1. Admissions Schedule */}
                        <section id="schedule" className="scroll-mt-32">
                            <h2 className="text-4xl font-bold mb-0 text-black pb-0 uppercase tracking-widest leading-none">
                                Admissions Schedule
                            </h2>
                            <div className="prose-arrows">
                                <DbPageContent
                                    pageSlug={pageSlug}
                                    sectionKey="schedule_content"
                                    fallbackContent={getSectionDefault('schedule_content')}
                                />
                            </div>
                        </section>

                         {/* 2. Study Options */}
                         <section id="study-options" className="scroll-mt-32">
                               <h2 className="text-2xl font-bold mb-0 uppercase tracking-widest text-black flex items-center gap-4 leading-none">
                                   Study Options
                               </h2>
                               <div className="prose-arrows">
                                   <DbPageContent
                                       pageSlug={pageSlug}
                                       sectionKey="study_options_content"
                                       fallbackContent={getSectionDefault('study_options_content')}
                                   />
                               </div>
                         </section>

                         {/* 3. Scholarships & Tuition Fees */}
                         <section id="scholarships" className="scroll-mt-32">
                             <h2 className="text-4xl font-bold mb-0 text-black uppercase tracking-widest pb-0 leading-none">
                                  Scholarships & Fees
                             </h2>
                             <div className="prose-arrows">
                                 <DbPageContent
                                     pageSlug={pageSlug}
                                     sectionKey="scholarships_content"
                                     fallbackContent={getSectionDefault('scholarships_content')}
                                 />
                             </div>
                         </section>

                         {/* 4. General Eligibility */}
                         <section id="eligibility" className="scroll-mt-32">
                               <h2 className="text-2xl font-bold mb-0 uppercase tracking-widest text-black flex items-center gap-4 leading-none">
                                   General Eligibility
                               </h2>
                               <div className="prose-arrows">
                                   <DbPageContent
                                       pageSlug={pageSlug}
                                       sectionKey="eligibility_content"
                                       fallbackContent={getSectionDefault('eligibility_content')}
                                   />
                               </div>
                         </section>

                         {/* 5. Field-Specific Requirements */}
                         <section id="field-reqs" className="scroll-mt-32">
                               <h2 className="text-2xl font-bold mb-0 uppercase tracking-widest text-black flex items-center gap-4 leading-none">
                                   Field-Specific Requirements
                               </h2>
                               <div className="prose-arrows">
                                   <DbPageContent
                                       pageSlug={pageSlug}
                                       sectionKey="field_reqs_content"
                                       fallbackContent={getSectionDefault('field_reqs_content')}
                                   />
                               </div>
                         </section>

                         {/* 6. Incomplete Degree */}
                         <section id="incomplete" className="scroll-mt-32">
                               <h2 className="text-2xl font-bold mb-0 uppercase tracking-widest text-black flex items-center gap-4 leading-none">
                                   Incomplete Degree
                               </h2>
                               <div className="prose-arrows">
                                   <DbPageContent
                                       pageSlug={pageSlug}
                                       sectionKey="incomplete_content"
                                       fallbackContent={getSectionDefault('incomplete_content')}
                                   />
                               </div>
                         </section>

                         {/* 7. Application Steps */}
                         <section id="steps" className="scroll-mt-32">
                             <h2 className="text-4xl font-bold mb-0 text-black uppercase tracking-widest pb-0 leading-none">
                                  How to Apply
                             </h2>
                             <div className="prose-arrows">
                                 <DbPageContent
                                     pageSlug={pageSlug}
                                     sectionKey="steps_content"
                                     fallbackContent={getSectionDefault('steps_content')}
                                 />
                             </div>
                         </section>

                        {/* CTA Section */}
                        <div className="my-24">
                            <AdmissionsCTA />
                        </div>

                         {/* 8. Required Documents Detail */}
                         <section id="documents" className="scroll-mt-32">
                             <h2 className="text-2xl font-bold mb-0 uppercase tracking-widest text-black flex items-center gap-4 leading-none">
                                 Required Documents
                             </h2>
                             <div className="prose-arrows">
                                 <DbPageContent
                                     pageSlug={pageSlug}
                                     sectionKey="documents_content"
                                     fallbackContent={getSectionDefault('documents_content')}
                                 />
                             </div>
                         </section>

                         {/* Language Requirements */}
                          <section id="language" className="scroll-mt-32">
                              <h2 className="text-4xl font-bold mb-0 uppercase tracking-widest pb-0 leading-none">
                                  Language Proficiency
                              </h2>
                              <div className="prose-arrows">
                                  <DbPageContent
                                      pageSlug={pageSlug}
                                      sectionKey="language_content"
                                      fallbackContent={getSectionDefault('language_content')}
                                  />
                              </div>
                         </section>

                         {/* GMAT/GRE */}
                          <section id="gmat" className="scroll-mt-32">
                              <h2 className="text-2xl font-bold mb-0 uppercase tracking-widest text-black flex items-center gap-4 leading-none">
                                  GMAT & GRE
                              </h2>
                              <div className="prose-arrows">
                                  <DbPageContent
                                      pageSlug={pageSlug}
                                      sectionKey="gmat_content"
                                      fallbackContent={getSectionDefault('gmat_content')}
                                  />
                              </div>
                         </section>

                         {/* Evaluation & Decisions */}
                          <section id="decisions" className="scroll-mt-32">
                              <h2 className="text-4xl font-bold mb-0 uppercase tracking-widest pb-0 leading-none">
                                  Decisions
                              </h2>
                              <div className="prose-arrows">
                                  <DbPageContent
                                      pageSlug={pageSlug}
                                      sectionKey="decisions_content"
                                      fallbackContent={getSectionDefault('decisions_content')}
                                  />
                              </div>
                         </section>

                         {/* After Being Admitted */}
                          <section id="after" className="scroll-mt-32">
                              <h2 className="text-2xl font-bold mb-0 uppercase tracking-widest text-black flex items-center gap-4 leading-none">
                                  After Admission
                              </h2>
                              <div className="prose-arrows">
                                  <DbPageContent
                                      pageSlug={pageSlug}
                                      sectionKey="after_content"
                                      fallbackContent={getSectionDefault('after_content')}
                                  />
                              </div>
                         </section>

                         {/* FAQ */}
                          <section id="faq" className="scroll-mt-32 pt-16">
                              <h2 className="text-4xl font-bold mb-0 uppercase tracking-widest text-black leading-none">FAQ</h2>
                             <MasterFAQ />
                          </section>

                    </main>
                </div>
            </div>
        </div>
        </GuideSidebarLayout>
    );
}
