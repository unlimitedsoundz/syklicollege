import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CreditCard, Bank as Landmark, ArrowsClockwise as RefreshCw, Calendar, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import TableOfContents from '@/components/course/TableOfContents';
import TuitionFAQ from '@/components/admissions/TuitionFAQ';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SchemaLD } from '@/components/seo/SchemaLD';

export const metadata = {
    title: 'Paying the Tuition Fee | Kestora College',
    description: 'Structure of tuition fees, payment methods (Bank Transfer), and refund policies for international students at Kestora College.',
};

const tocSections = [
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

export default function TuitionPaymentPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Who is required to pay tuition fees at Kestora College?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tuition fees are mandatory for students who are not citizens of the European Union (EU), European Economic Area (EEA), or Switzerland, and who are enrolled in English-taught Bachelor's or Master's degree programmes. Exemptions apply for holders of permanent Finnish residence permits, EU Blue Cards, and EU Family Member's Residence Cards."
                }
            },
            {
                "@type": "Question",
                "name": "How do I pay my tuition fees?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kestora College partners with Flywire for secure international tuition payments. To pay: 1) Log in to your Kestora Applicant Portal. 2) Navigate to the 'Payment' section. 3) You will be redirected to the secure Flywire gateway. 4) Select your country and preferred payment method to complete the transfer."
                }
            },
            {
                "@type": "Question",
                "name": "What are the specific requirements for the Early Payment Discount?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer a 25% reduction on the first year's tuition fee if you accept your study offer within 14 days of receiving the admission letter AND the full payment reaches Kestora College's account within 7 days of the admission offer."
                }
            },
            {
                "@type": "Question",
                "name": "Detailed Refund Policy: When can I get my money back?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can receive a 100% refund (minus €100 admin fee) for a negative residence permit decision, failure to meet conditional admission requirements, or program cancellation. A 50% refund is available if you withdraw before the 'Add/Drop' deadline (within the first 4 weeks)."
                }
            },
            {
                "@type": "Question",
                "name": "Can I pay in instalments?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For the first academic year, the tuition fee must be paid in one full instalment to facilitate the residence permit process. For subsequent years, you may choose to pay in two instalments (per semester) with a small €50 administrative surcharge."
                }
            },
            {
                "@type": "Question",
                "name": "How do I maintain my scholarship eligibility?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To qualify for a 50% waiver on the next year's fee, you must complete at least 55 ECTS credits within the academic year and maintain a minimum weighted GPA of 3.5 / 5.0."
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'Admissions', item: '/admissions' },
                { name: 'Tuition Fees', item: '/admissions/tuition' }
            ]} />

            <SchemaLD data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Paying the Tuition Fee | Kestora College",
                "description": "Details about tuition fees, scholarships, and payment procedures at Kestora College Helsinki, Finland.",
                "url": "https://kestora.online/admissions/tuition"
            }} />
            <SchemaLD data={faqSchema} />

            {/* Hero Section - Phase 3 Standard */}
            <div className="relative bg-neutral-900 text-white min-h-[450px] lg:h-[500px] flex items-center">
                <Image
                    src="/images/admissions/tuition-hero-new.jpg"
                    alt="Paying Tuition Fees"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="container mx-auto px-4 pt-32 pb-12 md:pt-48 relative z-10">
                    <div className="max-w-4xl">
                        <h1 className="text-[36px] md:text-5xl lg:text-7xl font-bold mb-6 leading-tight pt-8">
                            Paying the Tuition Fee
                        </h1>
                        <p className="text-[21px] text-white leading-relaxed max-w-2xl">
                            Comprehensive guide to fee levels, payment channels, and financial policies for the 2026 academic year.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16">
                <Link href="/admissions" className="inline-flex items-center gap-2 text-black hover:text-black mb-8 transition-colors group">
                    <ArrowLeft size={20} weight="bold" className="group-hover:-translate-x-1 transition-transform" /> Back to Admissions
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar */}
                    <aside className="lg:col-span-3">
                        <div className="lg:sticky lg:top-24">
                            <TableOfContents sections={tocSections} />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9 space-y-8 md:space-y-16">

                        {/* Intro */}
                        <section id="fee-structure" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-6 text-black pb-10 pl-2">
                                How Much is the Tuition Fee?
                            </h2>
                            <p className="text-lg text-black leading-relaxed mb-6">
                                Tuition fees at Kestora College depend on your degree level, your field of study, and the start date of your study right.
                                The exact amount for your programme is always listed in your personal admission letter.
                            </p>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-12 pl-6 md:pl-16 rounded-xl">
                                <p className="font-medium text-blue-900">
                                    <strong>Note:</strong> Students whose right to study began on or before 1 August 2025 may have different fee levels.
                                    The tables below apply to new students starting in <strong>2026</strong>.
                                </p>
                            </div>
                        </section>

                        {/* Bachelor's Fees */}
                        <section id="bachelor-fees" className="scroll-mt-32">
                            <h3 className="text-2xl font-bold mb-6 text-black">Bachelor’s Programmes</h3>
                            <p className="text-black mb-6 font-medium">Right to study starting on or after 1 August 2026</p>

                            <div className="rounded-xl mb-8 overflow-hidden">
                                {/* Mobile View: Stacked Cards */}
                                <div className="md:hidden divide-y divide-neutral-200 bg-white">
                                    {[
                                        { field: "Business", year: "€4 000", term: "€2 000" },
                                        { field: "Arts and Architecture", year: "€4 000", term: "€2 000" },
                                        { field: "Technology & Engineering", year: "€6 000", term: "€3 000" },
                                        { field: "Science", year: "€7 500", term: "€3 750" }
                                    ].map((row, i) => (
                                        <div key={i} className="p-4 space-y-2 bg-white">
                                            <div className="flex justify-between items-start">
                                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Field of Study</span>
                                                <span className="font-bold text-black text-right">{row.field}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Tuition Fee / Year</span>
                                                <span className="text-black">{row.year}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Tuition Deposit</span>
                                                <span className="text-black">{row.term}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop View: Traditional Table */}
                                <table className="hidden md:table w-full text-left border-collapse">
                                    <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                        <tr>
                                            <th className="p-4 font-bold">Field of Study</th>
                                            <th className="p-4 font-bold">Tuition Fee / Year</th>
                                            <th className="p-4 font-bold">Tuition Deposit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 text-black">
                                        <tr className="hover:bg-neutral-50">
                                            <td className="p-4 font-medium">Business</td>
                                            <td className="p-4">€4 000</td>
                                            <td className="p-4">€2 000</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50">
                                            <td className="p-4">Arts and Architecture</td>
                                            <td className="p-4">€4 000</td>
                                            <td className="p-4">€2 000</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50">
                                            <td className="p-4 font-medium">Technology & Engineering</td>
                                            <td className="p-4">€6 000</td>
                                            <td className="p-4">€3 000</td>
                                        </tr>
                                        <tr><td colSpan={3} className="p-0 border-t border-neutral-300"></td></tr>
                                        <tr className="hover:bg-neutral-50">
                                            <td className="p-4 font-medium">Science</td>
                                            <td className="p-4">€7 500</td>
                                            <td className="p-4">€3 750</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Early Payment Discount */}
                            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 md:p-12 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-2 rounded-full mt-1 shadow-md">
                                        <CreditCard size={24} weight="regular" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold mb-3 text-orange-950">Early Payment Discount</h4>
                                        <p className="text-orange-900 mb-4">
                                            New Bachelor’s and Master’s students may receive a <strong>25% discount</strong> on their first academic year’s tuition if they:
                                        </p>
                                        <ul className="space-y-2 mb-6 text-sm text-orange-900">
                                            <li className="flex gap-3 items-start"><div className="min-w-[6px] h-[6px] rounded-full bg-orange-500 mt-1.5"></div> Accept their admission offer as instructed</li>
                                            <li className="flex gap-3 items-start"><div className="min-w-[6px] h-[6px] rounded-full bg-orange-500 mt-1.5"></div> Pay tuition by the deadline (usually within 7 days of offer)</li>
                                        </ul>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
                                                <h5 className="font-bold text-sm mb-4 uppercase tracking-wider text-orange-800">Bachelor's Discounted Fees (1st Year)</h5>
                                                <div className="space-y-2 text-sm md:text-base text-orange-950">
                                                    <div className="flex justify-between border-b border-orange-100 pb-2">
                                                        <span>Business</span>
                                                        <span className="font-bold">€3 000</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-orange-100 pb-2">
                                                        <span>Arts and Architecture</span>
                                                        <span className="font-bold">€3 000</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-orange-100 pb-2">
                                                        <span>Technology & Engineering</span>
                                                        <span className="font-bold">€4 500</span>
                                                    </div>
                                                    <div className="flex justify-between pt-1">
                                                        <span>Science</span>
                                                        <span className="font-bold">€5 625</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm">
                                                <h5 className="font-bold text-sm mb-4 uppercase tracking-wider text-orange-800">Master's Discounted Fees (1st Year)</h5>
                                                <div className="space-y-2 text-sm md:text-base text-orange-950">
                                                    <div className="flex justify-between border-b border-orange-100 pb-2">
                                                        <span>Business</span>
                                                        <span className="font-bold">€4 500</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-orange-100 pb-2">
                                                        <span>Arts and Architecture</span>
                                                        <span className="font-bold">€4 500</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-orange-100 pb-2">
                                                        <span>Technology & Engineering</span>
                                                        <span className="font-bold">€4 500</span>
                                                    </div>
                                                    <div className="flex justify-between pt-1">
                                                        <span>Science</span>
                                                        <span className="font-bold">€7 125</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Master's Fees */}
                        <section id="master-fees" className="scroll-mt-32">
                            <h3 className="text-2xl font-bold mb-6 text-black">Master’s Programmes</h3>
                            <p className="text-black mb-6 font-medium">Right to study starting on or after 1 August 2026</p>

                            <div className="rounded-xl overflow-hidden">
                                {/* Mobile View: Stacked Cards */}
                                <div className="md:hidden divide-y divide-neutral-200 bg-white">
                                    {[
                                        { field: "Business", year: "€6 000", term: "€3 000" },
                                        { field: "Arts and Architecture", year: "€6 000", term: "€3 000" },
                                        { field: "Technology & Engineering", year: "€6 000", term: "€3 000" },
                                        { field: "Science", year: "€9 500", term: "€4 750" }
                                    ].map((row, i) => (
                                        <div key={i} className="p-4 space-y-2 bg-white">
                                            <div className="flex justify-between items-start">
                                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Field of Study</span>
                                                <span className="font-bold text-black text-right">{row.field}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Tuition Fee / Year</span>
                                                <span className="text-black">{row.year}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Tuition Deposit</span>
                                                <span className="text-black">{row.term}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop View: Traditional Table */}
                                <table className="hidden md:table w-full text-left border-collapse">
                                    <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                        <tr>
                                            <th className="p-4 font-bold">Field of Study</th>
                                            <th className="p-4 font-bold">Tuition Fee / Year</th>
                                            <th className="p-4 font-bold">Tuition Deposit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 text-black">
                                        <tr className="hover:bg-neutral-50">
                                            <td className="p-4 font-medium">Business</td>
                                            <td className="p-4">€6 000</td>
                                            <td className="p-4">€3 000</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50">
                                            <td className="p-4">Arts and Architecture</td>
                                            <td className="p-4">€6 000</td>
                                            <td className="p-4">€3 000</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50">
                                            <td className="p-4 font-medium">Technology & Engineering</td>
                                            <td className="p-4">€6 000</td>
                                            <td className="p-4">€3 000</td>
                                        </tr>
                                        <tr><td colSpan={3} className="p-0 border-t border-neutral-300"></td></tr>
                                        <tr className="hover:bg-neutral-50">
                                            <td className="p-4 font-medium">Science</td>
                                            <td className="p-4">€9 500</td>
                                            <td className="p-4">€4 750</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Early Payment Discount */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-12 shadow-sm mt-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-2 rounded-full mt-1 shadow-md">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-3 text-purple-950">Early Payment Discount</h4>
                                        <p className="text-purple-900 mb-4">
                                            New Master’s students may receive a <strong>25% discount</strong> on their first academic year’s tuition if they:
                                        </p>
                                        <ul className="space-y-2 mb-6 text-sm text-purple-900">
                                            <li className="flex gap-3 items-start"><div className="min-w-[6px] h-[6px] rounded-full bg-purple-500 mt-1.5"></div> Accept their admission offer as instructed</li>
                                            <li className="flex gap-3 items-start"><div className="min-w-[6px] h-[6px] rounded-full bg-purple-500 mt-1.5"></div> Pay tuition by the deadline (usually within 7 days of offer)</li>
                                        </ul>

                                        <div className="bg-white/60 backdrop-blur-sm p-6 md:p-12 pl-6 md:pl-16 rounded-xl shadow-sm">
                                            <h5 className="font-bold text-sm mb-4 uppercase tracking-wider text-purple-800">Discounted Fees (1st Year Only)</h5>
                                            <div className="space-y-2 text-purple-950">
                                                <div className="flex justify-between border-b border-purple-100 pb-2">
                                                    <span>Business</span>
                                                    <span className="font-bold">€4 500</span>
                                                </div>
                                                <div className="flex justify-between border-b border-purple-100 pb-2">
                                                    <span>Arts and Architecture</span>
                                                    <span className="font-bold">€4 500</span>
                                                </div>
                                                <div className="flex justify-between border-b border-purple-100 pb-2">
                                                    <span>Technology & Engineering</span>
                                                    <span className="font-bold">€4 500</span>
                                                </div>
                                                <div className="flex justify-between pt-1">
                                                    <span>Science</span>
                                                    <span className="font-bold">€7 125</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Merit Scholarship - Relocated */}
                            <div id="merit-scholarship" className="scroll-mt-32 mt-12">
                                <h4 className="text-xl font-bold mb-6 text-black">Merit Scholarship</h4>
                                <div className="bg-gradient-to-br from-[#fd6402] to-orange-600 rounded-2xl p-5 md:p-12 shadow-xl mb-8 relative overflow-hidden text-white border-none">
                                    <div className="absolute top-8 -right-12 w-[180px] bg-white text-orange-600 py-1.5 font-black uppercase tracking-tighter text-xs transform rotate-45 text-center shadow-sm z-10">
                                        50% Waiver
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                                        <div className="bg-white text-orange-600 p-3 rounded-full mt-1 shrink-0 shadow-md">
                                            <GraduationCap size={28} weight="fill" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-white drop-shadow-sm">Continuing Merit Scholarship</h3>
                                            <p className="text-lg text-white mb-6 leading-relaxed bg-black/10 p-4 rounded-xl">
                                                Kestora College rewards academic excellence. After the first year of study, international students can apply for a merit scholarship that covers <strong className="text-yellow-200">50% of the tuition fee</strong> for the next academic year.
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <h4 className="font-bold text-sm uppercase tracking-widest text-orange-200">Academic Criteria</h4>
                                                    <ul className="space-y-3">
                                                        <li className="flex gap-3 items-start">
                                                            <div className="min-w-[6px] h-[6px] rounded-full bg-white mt-2"></div>
                                                            <span className="text-white">Complete at least <strong>55 ECTS credits</strong> per academic year</span>
                                                        </li>
                                                        <li className="flex gap-3 items-start">
                                                            <div className="min-w-[6px] h-[6px] rounded-full bg-white mt-2"></div>
                                                            <span className="text-white">Maintain a minimum weighted GPA of <strong>3.5 / 5.0</strong></span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="space-y-4 bg-orange-700/50 p-5 rounded-xl">
                                                    <h4 className="font-bold text-sm uppercase tracking-widest text-orange-200">Application & Review</h4>
                                                    <p className="text-sm text-white leading-relaxed">
                                                        Scholarship eligibility is automatically reviewed every August. Students who meet the criteria will be notified before the Autumn semester tuition deadline.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="payment-methods" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">
                                How Do I Pay?
                            </h2>
                            <div className="space-y-8">
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 md:p-12 rounded-2xl">
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                                        <div className="max-w-xl">
                                            <p className="text-lg text-black leading-relaxed mb-4">
                                                Kestora College partners with <strong><a href="https://www.flywire.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-700 transition-colors">Flywire</a></strong> to provide students with a secure, convenient, and transparent way to pay tuition and related academic fees using local and international payment options.
                                            </p>
                                            <p className="text-black leading-relaxed">
                                                All tuition payments are processed through Flywire to ensure accurate tracking, faster confirmation, and proper allocation to the student’s account.
                                            </p>
                                        </div>
                                        <div className="relative w-48 h-12 md:w-64 md:h-16 shrink-0 bg-white p-4 rounded-xl shadow-sm">
                                            <Image
                                                src="https://cdn.brandfetch.io/id1L6oKjVX/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667924686641"
                                                alt="Flywire"
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                    </div>

                                    {/* Step by Step */}
                                    <div className="bg-white/80 backdrop-blur-sm p-6 md:p-12 shadow-sm rounded-xl">
                                        <h3 className="text-xl font-bold mb-8 uppercase tracking-tight text-emerald-950">Step-by-Step Payment Process</h3>

                                        <div className="space-y-8">
                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
                                                <div>
                                                    <h4 className="font-bold text-black mb-1">Accept Your Offer</h4>
                                                    <p className="text-sm text-neutral-600">Once you accept your offer of admission through the Kestora College portal, you will be automatically redirected to the Flywire payment page.</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-md">2</div>
                                                <div>
                                                    <h4 className="font-bold text-black mb-1">Choose Where You’re Paying From</h4>
                                                    <p className="text-sm text-neutral-600">Select the country from which you will be making your payment. Flywire will display the available local payment options and instructions specific to your selected country.</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-md">3</div>
                                                <div>
                                                    <h4 className="font-bold text-black mb-1">Review Payment Details</h4>
                                                    <p className="text-sm text-neutral-600 mb-4">Confirm the following details before proceeding:</p>
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Your full name</li>
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Student ID</li>
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Programme of study</li>
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Amount payable</li>
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Payment reference</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-md">4</div>
                                                <div>
                                                    <h4 className="font-bold text-black mb-1">Select Your Payment Method</h4>
                                                    <p className="text-sm text-neutral-600">Choose one of the available payment methods provided by Flywire, such as local bank transfer or other supported channels, depending on your country of residence.</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-md">5</div>
                                                <div>
                                                    <h4 className="font-bold text-black mb-1">Complete the Payment</h4>
                                                    <p className="text-sm text-neutral-600">Follow the on-screen instructions to complete your payment securely.</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-md">6</div>
                                                <div>
                                                    <h4 className="font-bold text-black mb-1">Payment Confirmation</h4>
                                                    <p className="text-sm text-neutral-600 mb-4">Once payment is successfully received and confirmed:</p>
                                                    <ul className="space-y-3">
                                                        <li className="flex items-center gap-3 text-xs font-bold text-black uppercase tracking-tight">
                                                            <div className="w-1 h-1 bg-black rounded-full"></div>
                                                            Your payment status will be updated automatically
                                                        </li>
                                                        <li className="flex items-center gap-3 text-xs font-bold text-black uppercase tracking-tight">
                                                            <div className="w-1 h-1 bg-black rounded-full"></div>
                                                            An official receipt will be issued
                                                        </li>
                                                        <li className="flex items-center gap-3 text-xs font-bold text-black uppercase tracking-tight">
                                                            <div className="w-1 h-1 bg-black rounded-full"></div>
                                                            Your Admission Letter will be automatically generated and made available in your student portal
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:p-12 rounded-2xl shadow-sm">
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-tight text-blue-900">
                                            <RefreshCw size={24} /> Processing Time
                                        </h3>
                                        <p className="text-blue-950 leading-relaxed">
                                            Most payments are confirmed within <strong>24–72 hours</strong>, depending on the selected payment method.
                                        </p>
                                        <p className="text-[10px] text-blue-700 mt-6 italic font-bold uppercase tracking-widest">
                                            Students should retain their payment reference and proof of payment until confirmation is completed.
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 md:p-12 rounded-2xl shadow-md">
                                        <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">
                                            Need Help With Payment?
                                        </h3>
                                        <p className="text-white/90 leading-relaxed mb-8 text-sm">
                                            If you experience any difficulty during the payment process or have questions regarding your tuition payment, please contact the Admissions Office through your student portal or via email.
                                        </p>
                                        <a href="mailto:admissions@kestora.online" className="inline-block bg-white text-indigo-700 px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-neutral-100 shadow-sm transition-colors">
                                            Email Admissions
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-rose-50 to-orange-50 p-6 md:p-12 rounded-2xl shadow-sm">
                                    <h3 className="text-xl font-bold mb-4 text-black uppercase tracking-tight">Important: Residence Permits & Deadlines</h3>
                                    <div className="space-y-4 text-black">
                                        <p className="text-sm leading-relaxed">
                                            If you are applying for a residence permit, please make sure you have sufficient funds to cover the tuition fee and living expenses in Finland according to the Finnish Migration Services instructions:{' '}
                                            <a
                                                href="https://migri.fi/en/residence-permit-application-for-studies"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-bold underline hover:text-neutral-700"
                                            >
                                                Finnish Migration Services (Migri)
                                            </a>.
                                        </p>
                                        <p className="text-sm font-bold uppercase tracking-tight">
                                            Please remember to start the process for obtaining a residence permit as soon as possible.
                                        </p>
                                        <p className="text-sm">
                                            The due date for the second academic year’s tuition fee payment is <strong>15th of September</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Timing */}
                        <section id="timing" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-6 text-black pb-10 pl-2">Tuition Fee Payment Schedule</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 md:p-12 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Calendar size={24} weight="regular" className="text-blue-900" />
                                        <h3 className="text-xl font-bold text-blue-950">First Academic Year</h3>
                                    </div>
                                    <p className="text-blue-900 mb-4">
                                        After accepting the admission offer as binding, students may proceed with tuition fee payment.
                                        The tuition fee for the first academic year <strong className="text-blue-950">must be paid in a single instalment</strong>, covering the full academic year.
                                        Payment in multiple instalments is not permitted for first-year enrolment.
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 md:p-12 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Calendar size={24} className="text-blue-900" />
                                        <h3 className="text-xl font-bold text-blue-950">After the First Year</h3>
                                    </div>
                                    <p className="text-blue-900 mb-4">
                                        Students are strongly encouraged to pay the full tuition fee in one instalment during the annual enrolment period.
                                        Alternatively, tuition fees may be paid in two instalments (autumn term and spring term).
                                        <em> Note: choosing this option requires enrolling as non-attending for the unpaid term.</em>
                                    </p>
                                    <div className="mt-4 p-4 bg-yellow-100/50 rounded-lg text-sm text-yellow-900">
                                        <strong className="text-yellow-950">Important:</strong> Non-attending status may affect matters such as visa or residence permit conditions.
                                    </div>
                                </div>
                            </div>
                            <p className="mt-8 text-black italic text-center">
                                For further details on enrolment and payment procedures, students are advised to consult the official <strong>Kestora College enrolment guidelines</strong>.
                            </p>
                        </section>

                        {/* Additional Fees & Student Benefits */}
                        <section id="additional-fees" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">
                                Additional Fees & Student Benefits
                            </h2>
                            <div className="bg-white rounded-3xl p-8 md:p-16 space-y-16">
                                {/* Financial & Living Costs */}
                                <div className="max-w-4xl">
                                    <h3 className="text-2xl font-bold mb-6">Financial Requirements & Living Costs</h3>
                                    <p className="text-neutral-600 leading-relaxed mb-8 text-lg">
                                        Besides tuition fees, make sure that you have sufficient financial means for your living costs such as rent, personal expenses, transportation costs, meals, insurance, etc. Please also remember that an income requirement by the Finnish Immigration Service may apply to you.
                                    </p>
                                    <div className="p-8 bg-amber-50 rounded-2xl shadow-sm">
                                        <p className="font-bold text-amber-950 italic">
                                            Kestora College has a housing quota especially for tuition fee-liable international degree students moving to Finland.
                                        </p>
                                    </div>
                                </div>

                                {/* Included in Tuition */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-sm">
                                        <h3 className="text-xl font-bold mb-4 text-blue-950">What's Included?</h3>
                                        <p className="text-blue-900 mb-6">
                                            The tuition fee includes teaching and access to the newest learning facilities. The services provided to students by the College are free.
                                        </p>
                                        <ul className="grid grid-cols-1 gap-3 text-blue-950">
                                            {[
                                                "Library access",
                                                "Student Services",
                                                "Career Services",
                                                "Exchange Services",
                                                "Study support"
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-2 items-center text-sm font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-8 bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-3xl shadow-md">
                                        <h3 className="text-xl font-bold mb-4">HYY Student Union</h3>
                                        <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                                            The tuition fee includes the compulsory Student Union (HYY) membership. HYY provides substantial benefits, advocacy work and events throughout the year.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-xs font-bold uppercase tracking-widest text-white">
                                                Significant meal discounts (Unicafe)
                                            </div>
                                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-xs font-bold uppercase tracking-widest text-white">
                                                Public transport reductions
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Healthcare & Insurance */}
                                <div className="pt-16">
                                    <h3 className="text-2xl font-bold mb-6">Healthcare & Insurance</h3>
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <p className="text-neutral-600 leading-relaxed">
                                                Please note that you need to pay Finnish Student Health Service fee directly to <strong><a href="https://www.kela.fi/in-english" target="_blank" rel="noopener noreferrer" className="underline hover:text-black transition-colors">Kela</a></strong> according to their instructions.
                                            </p>
                                            <div className="p-8 pl-14 md:pl-20 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-2xl shadow-md">
                                                <p className="text-sm text-white/90 leading-relaxed">
                                                    <strong>Important:</strong> Remember to check that you have valid health insurance. The FSHS only provides basic healthcare and does not cover extensive medical operations or emergency services.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-8">
                                            <div>
                                                <h4 className="font-bold text-lg mb-2">Is orientation mandatory?</h4>
                                                <p className="text-sm text-neutral-600 leading-relaxed">
                                                    Yes, it provides essential info for starting your studies. All students are expected to attend the sessions during the first week.
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-2">Can I bring my family?</h4>
                                                <p className="text-sm text-neutral-600 leading-relaxed">
                                                    Yes, family members can apply for residence permits based on family ties. However, the student permit applicant must demonstrate sufficient financial resources for the entire family's stay.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SwissCare Health Insurance */}
                                <div id="health-insurance" className="scroll-mt-32 pt-16">
                                    <h3 className="text-2xl font-bold mb-6">Health Insurance for International Students</h3>
                                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 md:p-12 shadow-sm">
                                        <div className="flex flex-col md:flex-row items-start gap-6">
                                            <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 bg-white rounded-xl overflow-hidden shadow-sm">
                                                <Image
                                                    src="/images/swisscare-logo.png"
                                                    alt="SwissCare"
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold mb-3 text-teal-950">SwissCare — Recommended Insurance Partner</h4>
                                                <p className="text-teal-900 leading-relaxed mb-4">
                                                    Non-EU/EEA students are required to have valid private health insurance to obtain a Finnish residence permit.
                                                    Kestora College recommends <strong>SwissCare</strong> as a trusted health insurance provider for international students.
                                                    SwissCare offers comprehensive plans specifically designed for students studying abroad, covering:
                                                </p>
                                                <ul className="space-y-2 mb-6 text-sm text-teal-900">
                                                    <li className="flex gap-3 items-start"><div className="min-w-[6px] h-[6px] rounded-full bg-teal-500 mt-1.5"></div> Medical consultations and hospitalization</li>
                                                    <li className="flex gap-3 items-start"><div className="min-w-[6px] h-[6px] rounded-full bg-teal-500 mt-1.5"></div> Emergency repatriation and evacuation</li>
                                                    <li className="flex gap-3 items-start"><div className="min-w-[6px] h-[6px] rounded-full bg-teal-500 mt-1.5"></div> Dental emergencies and mental health support</li>
                                                    <li className="flex gap-3 items-start"><div className="min-w-[6px] h-[6px] rounded-full bg-teal-500 mt-1.5"></div> Coverage accepted for residence permit applications</li>
                                                </ul>
                                                <a
                                                    href="https://www.swisscare.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block bg-teal-600 text-white px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-teal-700 shadow-md transition-colors"
                                                >
                                                    Visit SwissCare →
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Refunds */}
                        <section id="refunds" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black pb-10 pl-2">
                                Refund Policy
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                        <RefreshCw size={20} weight="bold" /> Full Refund Cases
                                    </h3>
                                    <ul className="grid md:grid-cols-2 gap-4">
                                        {[
                                            "Conditional offer cancelled (conditions not met)",
                                            "Renounce study right during enrolment",
                                            "Residence permit denied",
                                            "Residence status becomes exempt (e.g. permanent)",
                                            "Programme cancellation by College"
                                        ].map((item, i) => (
                                            <li key={i} className="bg-rose-50 p-4 rounded-lg text-sm flex gap-3 items-start text-rose-950">
                                                <div className="min-w-[6px] h-[6px] rounded-full bg-rose-500 mt-1.5"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 md:p-10 rounded-xl">
                                    <h3 className="font-bold text-lg mb-2 text-orange-950">Refund Application</h3>
                                    <p className="text-orange-900 mb-4">
                                        To request a refund, contact the College’s tuition fee team. You must submit the request by the relevant deadline.
                                    </p>
                                    <div className="text-sm text-orange-900">
                                        <strong>Note:</strong> Refunds normally exclude service and bank charges. For full details, please visit our <Link href="/refund-withdrawal-policy/" className="underline font-bold hover:text-orange-950">Refund & Withdrawal Policy</Link>.
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section id="faq" className="scroll-mt-32 pt-16">
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-16 shadow-sm">
                                <h2 className="text-3xl font-bold mb-10 text-center text-indigo-950">
                                    Frequently Asked Questions
                                </h2>
                                <div className="max-w-3xl mx-auto">
                                    <TuitionFAQ />
                                </div>
                            </div>
                        </section>

                        {/* Contact */}
                        <section id="contact" className="scroll-mt-32 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 md:p-16 rounded-3xl shadow-lg mt-16 text-center">
                            <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
                            <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                                If you have questions about payment processes, deadlines, or refunds, please contact the Tuition Fee Office.
                            </p>
                            <a href="mailto:tuition@kestora.online" className="inline-flex items-center gap-2 bg-white text-indigo-900 px-8 py-4 rounded-full font-bold hover:bg-neutral-100 hover:scale-105 transition-all shadow-md">
                                Contact Tuition Office
                            </a>
                        </section>

                    </main>
                </div>
            </div>
        </div>
    );
}
