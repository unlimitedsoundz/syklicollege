import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CreditCard, Bank as Landmark, ArrowClockwise as RefreshCw, Calendar, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import TuitionFAQ from '@/components/admissions/TuitionFAQ';
import DbPageContent from '@/components/DbPageContent';
import { getPageContentSection } from '@/lib/pageContentConfig';
import { registerFaqPage } from '@/lib/registerFaqPage';
import { createClient } from '@supabase/supabase-js';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SchemaLD } from '@/components/seo/SchemaLD';

export const metadata = {
    title: 'Paying the Tuition Fee | Kestora University',
    description: 'Structure of tuition fees, payment methods (Bank Transfer), and refund policies for international students at Kestora University.',
    alternates: {
        canonical: 'https://kestora.online/admissions/tuition/',
    },
};

const sections = [
    { id: 'fee-structure', title: 'Fee Structure', content: '' },
    { id: 'bachelor-fees', title: 'Bachelor’s Fees', content: '' },
    { id: 'master-fees', title: 'Master’s Fees', content: '' },
    { id: 'merit-scholarship', title: 'Merit Scholarship', content: '' },
    { id: 'payment-methods', title: 'Payment Methods', content: '' },
    { id: 'timing', title: 'Payment Schedule', content: '' },
    { id: 'additional-fees', title: 'Additional Fees & Benefits', content: '' },
    { id: 'health-insurance', title: 'Health Insurance', content: '' },
    { id: 'refunds', title: 'Refund Policy', content: '' },
    { id: 'faq', title: 'General FAQ', content: '' },
    { id: 'contact', title: 'Contact Support', content: '' },
];

export default async function TuitionPaymentPage() {
    // For static build, we use empty FAQs - they will be loaded client-side
    const faqs: any[] = [];
    const pageSlug = 'admissions/tuition';
    const getSectionDefault = (sectionKey: string) => getPageContentSection(pageSlug, sectionKey)?.defaultContent ?? '';

    // Register this page
    try {
        registerFaqPage("Tuition", "admissions/tuition");
    } catch (error) {
        // Ignore errors
    }

    return (
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white text-black font-sans">
            {/* Hero Section */}
            <section className="text-black overflow-hidden" style={{ backgroundColor: '#F3E8FF' }}>
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-12 pb-12 lg:pb-0 h-auto lg:h-[600px] lg:py-0 relative mb-0">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <DbPageContent
                            tagName="h1"
                            className="font-bold leading-[1.1] tracking-tight pt-8 text-black"
                            style={{ fontSize: '40px' }}
                            pageSlug={pageSlug}
                            sectionKey="hero_title"
                            fallbackContent={getSectionDefault('hero_title') || 'Paying the Tuition Fee'}
                        />
                        <DbPageContent
                            tagName="p"
                            className="text-[21px] text-black max-w-xl leading-relaxed"
                            pageSlug={pageSlug}
                            sectionKey="hero_subtitle"
                            fallbackContent={getSectionDefault('hero_subtitle') || 'Information on tuition fee structure, payment methods, and scholarship opportunities for international students.'}
                        />
                        <div className="flex flex-col gap-4 pt-4">
                            <Link href="#payment-methods" className="text-lg font-bold underline underline-offset-8 decoration-black hover:opacity-70 transition-colors text-black inline-flex items-center gap-2">
                                View payment methods <ArrowRight size={20} weight="bold" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="/images/admissions/tuition-hero.jpg"
                                    alt="Tuition Hero"
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
            <div className="container mx-auto px-4 py-8">
                <Link href="/admissions" className="inline-flex items-center gap-2 text-black hover:text-black mb-8 transition-colors group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Admissions
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <main className="lg:col-span-9 space-y-8 md:space-y-16">
                        <section id="fee-structure" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-6 text-black pb-10 pl-2">How Much is the Tuition Fee?</h2>
                            <DbPageContent pageSlug={pageSlug} sectionKey="fee_structure_content" fallbackContent={getSectionDefault('fee_structure_content')} />
                        </section>

                        <section id="bachelor-fees" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">Bachelor's Programmes</h2>
                            <DbPageContent pageSlug={pageSlug} sectionKey="bachelor_fees_content" fallbackContent={getSectionDefault('bachelor_fees_content')} />
                        </section>

                        <section id="master-fees" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">Master's Fees</h2>
                            <DbPageContent pageSlug={pageSlug} sectionKey="master_fees_content" fallbackContent={getSectionDefault('master_fees_content')} />
                        </section>

                        <section id="merit-scholarship" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">Merit Scholarship</h2>
                            <DbPageContent pageSlug={pageSlug} sectionKey="merit_scholarship_content" fallbackContent={getSectionDefault('merit_scholarship_content')} />
                        </section>

                        <section id="payment-methods" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">How Do I Pay?</h2>
                            <DbPageContent pageSlug={pageSlug} sectionKey="payment_methods_content" fallbackContent={getSectionDefault('payment_methods_content')} />
                        </section>

                        <section id="timing" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-6 text-black pb-10 pl-2">Tuition Fee Payment Schedule</h2>
                            <DbPageContent pageSlug={pageSlug} sectionKey="timing_content" fallbackContent={getSectionDefault('timing_content')} />
                        </section>

                        <section id="additional-fees" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">Additional Fees & Student Benefits</h2>
                            <DbPageContent pageSlug={pageSlug} sectionKey="additional_fees_content" fallbackContent={getSectionDefault('additional_fees_content')} />
                        </section>

                        <section id="health-insurance" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">Health Insurance</h2>
                            <DbPageContent pageSlug={pageSlug} sectionKey="health_insurance_content" fallbackContent={getSectionDefault('health_insurance_content')} />
                        </section>

                        <section id="refunds" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">Refund Policy</h2>
                            <DbPageContent pageSlug={pageSlug} sectionKey="refunds_content" fallbackContent={getSectionDefault('refunds_content')} />
                        </section>

                        <section id="faq" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">General FAQ</h2>
                            <TuitionFAQ />
                        </section>

                        <section id="contact" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-6 text-black">Need Help?</h2>
                            <DbPageContent pageSlug={pageSlug} sectionKey="contact_content" fallbackContent={getSectionDefault('contact_content')} />
                        </section>
                    </main>
                </div>
            </div>
        </div>
        </GuideSidebarLayout>
    );
}
