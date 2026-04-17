'use client';

import { ArrowLeft, Calendar, CaretRight, CheckCircle, FileText, Info, MapPin, CreditCard } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import TableOfContents from '@/components/course/TableOfContents';

export default function BachelorsGuidePage() {
    const sections = [
        { id: 'accept', title: '1. Accept Admission', content: '' },
        { id: 'tuition', title: '2. Tuition & Scholarships', content: '' },
        { id: 'residence', title: '3. Residence Permit', content: '' },
        { id: 'enrolment', title: '4. Enrolment', content: '' },
        { id: 'it-account', title: '5. IT Account', content: '' },
        { id: 'healthcare', title: '6. Healthcare & Fees', content: '' },
        { id: 'benefits', title: '7. Student Card', content: '' },
        { id: 'orientation', title: '8. Orientation', content: '' },
        { id: 'planning', title: '9. Course Registration', content: '' },
        { id: 'housing', title: '10. Housing & Aid', content: '' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION (Split Layout) */}
            <section className="bg-neutral-950 text-white overflow-hidden">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-20 h-[767px] lg:h-[600px] lg:py-0 relative mb-12">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-2 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <div className="inline-block bg-white text-black px-4 py-1 rounded-none text-xs font-bold mb-4 uppercase tracking-widest">
                            New Students
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight pt-8">
                            Bachelor’s Students Guide
                        </h1>
                        <p className="text-[21px] text-neutral-400 max-w-xl leading-relaxed">
                            Essential information for students admitted to Bachelor’s programmes taught in English. Read carefully to ensure a smooth start to your studies.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="/images/bachelors-group-v2.png"
                                    alt="Bachelor Students"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 368px, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 md:py-16">
                <Link
                    href="/student-guide"
                    className="inline-flex items-center text-neutral-500 hover:text-black mb-8 transition-colors"
                >
                    <ArrowLeft size={20} weight="bold" className="mr-2" /> Back to Student Guide
                </Link>
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 hidden lg:block h-fit sticky top-24">
                        <TableOfContents sections={sections} />
                    </aside>

                    {/* Main Content */}
                    <main className="lg:w-3/4 space-y-8 md:space-y-16">

                        {/* Intro Box */}
                        <div className="bg-neutral-100 p-8 rounded-none border-l-4 border-black">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black">
                                Welcome to Kestora University!
                            </h2>
                            <p className="text-black mb-4 font-medium leading-relaxed">
                                This guide covers the critical steps from accepting your offer to arriving on campus.
                                Follow the deadlines closely to secure your study place.
                            </p>
                        </div>

                        {/* 1. Accept Admission */}
                        <section id="accept" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                                <h2 className="text-3xl font-bold pt-1">Accept Your Admission Offer</h2>
                            </div>

                            <div className="bg-black text-white p-8 rounded-none mb-6">
                                <h3 className="font-bold text-white flex items-center gap-2 mb-2 uppercase tracking-widest text-sm">
                                    Deadline
                                </h3>
                                <p className="text-2xl font-bold">24 July 2026 at 15:00 (UTC +3)</p>
                                <p className="text-sm text-neutral-400 mt-2">Accept by this date or lose your study place offer.</p>
                            </div>

                            <div className="prose max-w-none text-neutral-700">
                                <h3 className="font-bold text-lg mb-2">How to Accept</h3>
                                <ul className="list-disc pl-5 mb-6 space-y-2">
                                    <li>Use the personal link sent via email or log in to the national admissions portal.</li>
                                    <li>Follow instructions in your admission letter.</li>
                                </ul>

                                <div className="bg-neutral-100 p-10 rounded-none">
                                    <h4 className="font-bold mb-6 text-xl">Waitlist & Multiple Offers</h4>
                                     <ul className="space-y-4">
                                        <li className="flex gap-4 items-start">
                                            <ArrowRight size={18} weight="bold" className="mt-1 text-black" />
                                            <span className="font-medium">You can accept only <strong>one</strong> degree study place per term.</span>
                                        </li>
                                        <li className="flex gap-4 items-start">
                                            <ArrowRight size={18} weight="bold" className="mt-1 text-black" />
                                            <span className="font-medium">You may accept a lower-ranked offer conditionally while waiting for a higher preference.</span>
                                        </li>
                                        <li className="flex gap-4 items-start">
                                            <ArrowRight size={18} weight="bold" className="mt-1 text-black" />
                                            <span className="font-medium">If a higher-ranked place opens, your acceptance transfers automatically.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 2. Tuition */}
                        <section id="tuition" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                                <h2 className="text-3xl font-bold pt-1">Tuition Fees & Scholarships</h2>
                            </div>

                            <div className="bg-white border border-neutral-200 rounded-none p-10 mb-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div>
                                        <h3 className="font-bold text-xl">General Rules</h3>
                                        <p className="text-black font-medium mt-2">Non-EU/EEA students typically pay tuition. Fees are due after acceptance and before enrolment.</p>
                                    </div>
                                </div>
                                <div className="border-t border-neutral-100 pt-6 mt-6">
                                    <h4 className="font-bold text-black text-xl mb-3">Early Payment Discount (25%)</h4>
                                    <p className="text-black font-medium mb-4 leading-relaxed">
                                        New Bachelor’s students may receive a <strong>25% reduction</strong> on the first year’s fee if paid by the deadline (typically within 7 days of acceptance).
                                    </p>
                                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Check your admission email for specific dates.</p>
                                </div>
                            </div>
                        </section>

                        <div className="fixed left-0 top-20 h-screen w-80 lg:block hidden"><TableOfContents sections={tocSections} /></div>

                        {/* 3. Residence Permit */}
                        <section id="residence" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <h2 className="text-3xl font-bold pt-1">Residence Permit</h2>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-neutral-50 p-6 rounded-xl">
                                    <h4 className="font-bold mb-2">Non-EU/EEA</h4>
                                    <p className="text-sm text-neutral-600">Apply for a student residence permit immediately. The process takes time.</p>
                                </div>
                                <div className="bg-neutral-50 p-6 rounded-xl">
                                    <h4 className="font-bold mb-2">EU/EEA</h4>
                                    <p className="text-sm text-neutral-600">Register right of residence at a local authority within 3 months of arrival.</p>
                                </div>
                                <div className="bg-neutral-50 p-6 rounded-xl">
                                    <h4 className="font-bold mb-2">Nordic</h4>
                                    <p className="text-sm text-neutral-600">Register with the Population Info System upon arrival for a personal ID code.</p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Enrolment */}
                        <section id="enrolment" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                                <h2 className="text-3xl font-bold pt-1">Enrol for the Academic Year</h2>
                            </div>
                            <div className="bg-white border border-neutral-200 rounded-xl p-8">
                                <h3 className="font-bold text-lg mb-4">Deadline: 14 August 2026 (Recommended)</h3>
                                <p className="text-neutral-600 mb-6">
                                    You must enrol as attending or non-attending to keep your study right.
                                    Final deadline is 23 April 2026.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-neutral-50 p-4 rounded-lg">
                                        <h4 className="font-bold mb-1">Attending</h4>
                                        <p className="text-sm text-neutral-600">Start studies, get student number, register for courses.</p>
                                    </div>
                                    <div className="bg-neutral-50 p-4 rounded-lg">
                                        <h4 className="font-bold mb-1">Non-Attending</h4>
                                        <p className="text-sm text-neutral-600">Only for military service, parental leave, or medical reasons (requires documentation).</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 5. IT Account */}
                        <section id="it-account" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
                                <h2 className="text-3xl font-bold pt-1">Activate IT Account</h2>
                            </div>
                            <p className="text-neutral-700 mb-4">
                                After enrolling, you will receive an email to activate your Kestora University IT account.
                                This gives you access to email, learning platforms, and registration systems.
                            </p>
                        </section>

                        {/* 6. Healthcare */}
                        <section id="healthcare" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">6</div>
                                <h2 className="text-3xl font-bold pt-1">Student Healthcare (FSHS)</h2>
                            </div>
                            <p className="text-neutral-700 mb-4">
                                All attending degree students (if eligible) must pay the healthcare fee to <a href="https://www.kela.fi/in-english" target="_blank" rel="noopener noreferrer" className="underline hover:text-black transition-colors">Kela</a> for each term.
                                This covers student health services.
                            </p>
                            <p className="text-sm text-neutral-500">EU students should obtain a European Health Insurance Card (EHIC) before arrival.</p>
                        </section>

                        {/* 7. Student Card */}
                        <section id="benefits" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">7</div>
                                <h2 className="text-3xl font-bold pt-1">Student Card & Benefits</h2>
                            </div>
                            <p className="text-neutral-700 mb-4">
                                Once enrolled as attending, you can get an electronic student card for discounts on public transport (trains, buses) and student restaurants.
                            </p>
                        </section>

                        {/* 8. Orientation */}
                        <section id="orientation" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">8</div>
                                <h2 className="text-3xl font-bold pt-1">Orientation & Start</h2>
                            </div>
                            <div className="bg-neutral-100 p-10 rounded-none border-l-4 border-black">
                                <h3 className="font-bold text-xl mb-4 text-black">Orientation Week</h3>
                                <p className="text-black font-medium mb-6 leading-relaxed text-lg">Usually held in August/September. Helps you meet tutors, learn systems, and settle in.</p>
                                <ul className="space-y-4 pt-2">
                                    <li className="flex gap-4 items-center font-bold text-black underline"><ArrowRight size={18} weight="bold" /> Check platforms for Pre-Orientation Modules.</li>
                                    <li className="flex gap-4 items-center font-bold text-black underline"><ArrowRight size={18} weight="bold" /> Connect with your assigned Peer Tutor.</li>
                                    <li className="flex gap-4 items-center font-bold text-black underline"><ArrowRight size={18} weight="bold" /> Join student life events and webinars before arrival.</li>
                                </ul>
                            </div>
                        </section>

                        {/* 9. Course Registration */}
                        <section id="planning" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">9</div>
                                <h2 className="text-3xl font-bold pt-1">Course Registration</h2>
                            </div>
                            <p className="text-neutral-700 mb-4">
                                Once enrolled, use your IT account to build a study plan and register for courses.
                                Contact academic advisors if you need help structuring your degree path.
                            </p>
                        </section>

                        {/* 10. Housing & Aid */}
                        <section id="housing" className="scroll-mt-32">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold flex-shrink-0">10</div>
                                <h2 className="text-3xl font-bold pt-1">Housing & Financial Aid</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-bold mb-2">Housing</h3>
                                    <p className="text-sm text-neutral-600">Apply immediately. Kestora University does not own housing; arrange through private providers.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">Financial Aid</h3>
                                    <p className="text-sm text-neutral-600">Check eligibility for Finnish student aid early and apply through <a href="https://www.kela.fi/in-english" target="_blank" rel="noopener noreferrer" className="underline hover:text-black transition-colors">Kela</a>.</p>
                                </div>
                            </div>
                        </section>

                        <div className="mt-12 pt-8 border-t border-neutral-200 text-sm text-neutral-500">
                            <p>Content adapted from official admissions guide. Check your email regularly for updates.</p>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}
