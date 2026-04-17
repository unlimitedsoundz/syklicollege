'use client';

import {
    BookOpen, GraduationCap, Heart,
    ArrowRight, CaretRight
} from "@phosphor-icons/react/dist/ssr";
import TableOfContents from '@/components/course/TableOfContents';
import Link from 'next/link';
import Image from 'next/image';

export default function StudentGuidePage() {
    const sections = [
        {
            id: 'programmes',
            title: 'Degree Programmes',
            content: '',
            items: [
                { title: "Bachelor's Degree", href: "/admissions/bachelor" },
                { title: "Master's Degree", href: "/admissions/master" },
            ]
        },
        {
            id: 'minors',
            title: 'Minors & Combinations',
            content: '',
            items: [
                { title: "What is a Minor?", href: "#minors" },
                { title: "Benefits", href: "#minors" },
            ]
        },
        {
            id: 'courses',
            title: 'Courses & Registration',
            content: '',
            items: [
                { title: "Course Structure", href: "#courses" },
                { title: "Registration", href: "#courses" },
            ]
        },
        { id: 'language', title: 'Language Studies', content: '' },
        {
            id: 'calendar',
            title: 'Academic Calendar',
            content: '',
            items: [
                { title: "Autumn Term", href: "#calendar" },
                { title: "Spring Term", href: "#calendar" },
            ]
        },
        {
            id: 'support',
            title: 'Support Services',
            content: '',
            items: [
                { title: "Academic Guidance", href: "#support" },
                { title: "Learning Support", href: "#support" },
                { title: "Wellbeing", href: "#support" },
            ]
        },
        { id: 'new-students', title: 'For New Students', content: '' },
        {
            id: 'student-types',
            title: 'Student Categories',
            content: '',
            items: [
                { title: "Bachelor's Students", href: "/student-guide/bachelor" },
                { title: "Master's Students", href: "/student-guide/master" },
                { title: "International Students", href: "/student-guide/international" },
                { title: "Exchange Students", href: "/student-guide/exchange" },
                { title: "Arrival Guide", href: "/student-guide/arrival" },
            ]
        },
        { id: 'digital', title: 'Digital Systems', content: '' },
        { id: 'community', title: 'Community & Life', content: '' },
        {
            id: 'contact',
            title: 'Contact & Guidance',
            content: '',
            items: [
                { title: "Student Services", href: "#contact" },
                { title: "Peer Tutors", href: "#contact" },
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION (Split Layout) */}
            <section className="bg-neutral-950 text-white overflow-hidden">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-20 h-[767px] lg:h-[600px] lg:py-0 relative mb-12">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-2 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-white uppercase tracking-widest opacity-60">
                            <Link href="/" className="underline hover:text-white">Home</Link>
                            <span>/</span>
                            <span className="text-white">Student Guide</span>
                        </nav>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight pt-8">
                            Student Guide
                        </h1>
                        <p className="text-[21px] text-neutral-400 max-w-xl leading-relaxed">
                            Your comprehensive resource for navigating studies, academic structure, support services, and daily life at Kestora University.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="#programmes" className="underline font-bold hover:text-neutral-300 transition-colors flex items-center gap-2">
                                <ArrowRight size={18} /> View Programmes
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="/images/student-guide-hero.png"
                                    alt="Kestora University Student Guide"
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
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 hidden lg:block h-fit sticky top-24">
                        <TableOfContents sections={sections} />
                    </aside>

                    {/* Main Content */}
                    <main className="lg:w-3/4 space-y-12 md:space-y-20">

                        {/* Intro */}
                        <div className="max-w-none text-xl text-black">
                            <p className="font-bold border-l-4 border-black pl-8 py-2 leading-relaxed">
                                Whether you are a new student, continuing your degree, or joining from abroad, this guide explains how studies are organised and how support is provided throughout your academic journey.
                            </p>
                        </div>

                        {/* Degree Programmes */}
                        <section id="programmes" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                Degree Programmes at Kestora University
                            </h2>
                            <p className="text-lg text-black mb-8 font-medium">
                                Kestora University offers Bachelor’s and Master’s degree programmes taught in English across business, economics, management, finance, information systems, entrepreneurship, and interdisciplinary fields.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {[
                                    { title: "Bachelor’s Degree", href: "/admissions/bachelor", image: "/images/bachelors-group-v2.png" },
                                    { title: "Master’s Degree", href: "/admissions/master", image: "/images/student-guide-hero.png" }
                                ].map((item) => (
                                    <Link key={item.title} href={item.href} className="group bg-neutral-100 rounded-2xl overflow-hidden block">
                                        <div className="h-48 bg-neutral-100 relative overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-black font-medium">
                                                {item.title.includes("Bachelor")
                                                    ? "Structured curriculum focused on core knowledge and skills."
                                                    : "Advanced studies focusing on specialized expertise and research-oriented development."}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="bg-neutral-100 p-8 rounded-2xl">
                                <h3 className="font-bold text-lg mb-4">Curriculum Structure</h3>
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        "Core compulsory courses", "Elective courses",
                                        "Minor studies", "Language and communication studies",
                                        "Final thesis or capstone project"
                                    ].map(item => (
                                        <li key={item} className="flex items-center gap-3">
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Minors */}
                        <section id="minors" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8">Minors and Study Combinations</h2>
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3">What is a Minor?</h3>
                                    <p className="text-black mb-6 font-medium leading-relaxed">
                                        A minor is a coherent set of courses, typically ranging from 20 to 30 ECTS credits, completed alongside a major degree. It allows students to deepen expertise in a specific area or broaden knowledge beyond their main field of study.
                                    </p>
                                    <h3 className="text-xl font-bold mb-3">Choosing a Minor</h3>
                                    <ul className="space-y-3 mb-6 text-black font-medium">
                                        <li className="flex gap-2 underline"><ArrowRight size={18} weight="bold" className="mt-1 flex-shrink-0" /> Within their own school</li>
                                        <li className="flex gap-2 underline"><ArrowRight size={18} weight="bold" className="mt-1 flex-shrink-0" /> From other schools at Kestora University</li>
                                        <li className="flex gap-2 underline"><ArrowRight size={18} weight="bold" className="mt-1 flex-shrink-0" /> From interdisciplinary or entrepreneurship offerings</li>
                                    </ul>
                                </div>
                                <div className="flex-1 bg-black text-white p-8 rounded-none border-l-4 border-neutral-700">
                                    <h3 className="font-bold text-xl mb-4 text-white">Benefits of Minors</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Strengthen employability",
                                            "Support career specialisation",
                                            "Enable interdisciplinary competence",
                                            "Prepare for advanced studies"
                                        ].map(item => (
                                            <li key={item} className="flex items-center gap-3">
                                                <ArrowRight size={14} weight="bold" className="text-white opacity-60" />
                                                <span className="font-bold">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Courses */}
                        <section id="courses" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8">Courses and Course Registration</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="rounded-none p-6">
                                    <h3 className="font-bold text-xl mb-3">Course Structure</h3>
                                    <p className="text-black mb-4 font-medium">Courses are assigned ECTS credits based on workload. Format includes:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Lectures', 'Seminars', 'Projects', 'Case Studies', 'Exams'].map(tag => (
                                            <span key={tag} className="bg-black text-white px-3 py-1 rounded-none text-xs font-bold uppercase tracking-wider">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-none p-6">
                                    <h3 className="font-bold text-xl mb-3 text-black">Registration</h3>
                                    <p className="text-black mb-4 font-medium">Register via the digital study system during published periods.</p>
                                    <ul className="text-sm space-y-2 text-black font-bold">
                                        <li>• Check participant limits</li>
                                        <li>• Verify prerequisites</li>
                                        <li>• Review selection criteria</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 bg-neutral-100 p-6 rounded-2xl">
                                <h4 className="font-bold mb-2">Other Study Options</h4>
                                <p className="text-black font-medium leading-relaxed">
                                    In addition to degree courses, students may complete Entrepreneurship and startup courses, Interdisciplinary project courses, Open university studies, or Exchange student courses.
                                </p>
                            </div>
                        </section>

                        {/* Language */}
                        <section id="language" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                Language and Communication
                            </h2>
                            <p className="text-lg text-black mb-6">
                                Language studies support academic success, professional skills, and international competence.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    "Academic communication", "Intercultural communication",
                                    "Finnish language", "Swedish language"
                                ].map(lang => (
                                    <div key={lang} className="bg-neutral-100 p-4 rounded-none text-center font-bold text-black border-l-2 border-black">
                                        {lang}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Calendar */}
                        <section id="calendar" className="scroll-mt-32">
                            <div className="bg-gray-100 text-black rounded-3xl md:rounded-[2.5rem] p-6 md:p-16">
                                <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 flex items-center gap-3 text-black">
                                    Academic Calendar
                                </h2>
                                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                    <div className="md:w-1/3 md:border-r border-gray-300 md:pr-8">
                                        <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-black uppercase tracking-widest text-sm">The Academic Year</h3>
                                        <div className="space-y-6 md:space-y-8">
                                            <div>
                                                <h4 className="font-bold text-black mb-1 md:mb-2 text-base md:text-lg">Autumn Term</h4>
                                                <p className="text-sm md:text-base text-gray-600">September — December</p>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-black mb-1 md:mb-2 text-base md:text-lg">Spring Term</h4>
                                                <p className="text-sm md:text-base text-gray-600">January — May</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-2/3">
                                        <h4 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-black">Teaching Periods & Dates</h4>
                                        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 md:text-lg">Each term consists of multiple teaching periods. Courses may run intensively or throughout the semester.</p>
                                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                                            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200">
                                                <span className="block font-bold mb-1 md:mb-2 text-black text-base md:text-lg">Teaching Periods</span>
                                                <span className="text-xs md:text-sm text-gray-500">Scheduled sessions</span>
                                            </div>
                                            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200">
                                                <span className="block font-bold mb-1 md:mb-2 text-black text-base md:text-lg">Exam Periods</span>
                                                <span className="text-xs md:text-sm text-gray-500">Assessment weeks</span>
                                            </div>
                                            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200">
                                                <span className="block font-bold mb-1 md:mb-2 text-black text-base md:text-lg">Registration</span>
                                                <span className="text-xs md:text-sm text-gray-500">Sign-up deadlines</span>
                                            </div>
                                            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200">
                                                <span className="block font-bold mb-1 md:mb-2 text-black text-base md:text-lg">Breaks</span>
                                                <span className="text-xs md:text-sm text-gray-500">Winter & Summer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Support */}
                        <section id="support" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8">Study Support Services</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    {
                                        title: 'Academic Guidance',
                                        desc: 'Programme level advising and personal study plans.',
                                        icon: GraduationCap,
                                        img: 'https://i.pinimg.com/1200x/23/fa/68/23fa68a8b1f907ec254dbcd7709b06eb.jpg'
                                    },
                                    {
                                        title: 'Learning Support',
                                        desc: 'Workshops, writing support, and study skills.',
                                        icon: BookOpen,
                                        img: 'https://i.pinimg.com/736x/72/02/74/72027422a2b62ce0f06b599060ea5be1.jpg'
                                    },
                                    {
                                        title: 'Wellbeing',
                                        desc: 'Health services, accessibility, and counseling.',
                                        icon: Heart,
                                        img: '/images/admissions/student_life_events.png'
                                    }
                                ].map((item) => (
                                    <div key={item.title} className="bg-neutral-100 rounded-2xl overflow-hidden group">
        <div className="h-48 bg-neutral-100 relative overflow-hidden">
            <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover object-top"
            />
        </div>
                                        <div className="p-6">
                                            <h3 className="font-bold text-lg mb-2 text-black">{item.title}</h3>
                                            <p className="text-black text-sm font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* New Students */}
                        <section id="new-students" className="scroll-mt-32">
                            <div className="bg-black text-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-16">
                                <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12">Information for New Students</h2>
                                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Orientation Programme</h3>
                                        <p className="text-sm md:text-base text-neutral-300 mb-6 md:mb-8 md:text-lg">
                                            New students receive structured onboarding before studies begin, ensuring a smooth transition into university life.
                                        </p>
                                        <ul className="space-y-3 md:space-y-4">
                                            {[
                                                "Degree programme introductions",
                                                "Digital systems training",
                                                "Course registration guidance",
                                                "Campus services overview"
                                            ].map(item => (
                        <li key={item} className="flex items-center gap-3 md:gap-4 bg-neutral-900 p-3 md:p-4 rounded-xl border border-neutral-800">
                            <ArrowRight size={16} weight="bold" className="text-white" />
                            <span className="font-bold text-sm md:text-base">{item}</span>
                        </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-black p-6 md:p-10 rounded-2xl md:rounded-[2rem] border border-neutral-800 shadow-2xl relative overflow-hidden">
                                        <div className="relative z-10">
                                            <h3 className="font-bold text-lg md:text-2xl mb-4 md:mb-6 text-white px-1">Getting Started Checklist</h3>
                                            <ul className="space-y-3 md:space-y-5 text-neutral-300">
                        <li className="flex gap-3 md:gap-4 items-center text-sm md:text-lg"><ArrowRight size={16} weight="bold" className="text-white" /> Confirm study rights</li>
                        <li className="flex gap-3 md:gap-4 items-center text-sm md:text-lg"><ArrowRight size={16} weight="bold" className="text-white" /> Activate student email</li>
                        <li className="flex gap-3 md:gap-4 items-center text-sm md:text-lg"><ArrowRight size={16} weight="bold" className="text-white" /> Access learning platforms</li>
                        <li className="flex gap-3 md:gap-4 items-center text-sm md:text-lg"><ArrowRight size={16} weight="bold" className="text-white" /> Get student ID card</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Student Categories / Breakdown */}
                        <section id="student-types" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8">Student Categories</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    {
                                        title: "International Students",
                                        href: "/student-guide/international",
                                        desc: "Support Services, residence permits, and integration into Finnish society.",
                                        image: "/images/international-students-hero.png"
                                    },
                                    {
                                        title: "Exchange Students",
                                        href: "/student-guide/exchange",
                                        desc: "Orientation, course selection, and cultural adaptation for short-term studies.",
                                        image: "/images/international-students.png"
                                    }
                                ].map((item) => (
                                    <Link key={item.title} href={item.href} className="block rounded-2xl overflow-hidden group">
                                        <div className="h-56 bg-neutral-100 relative overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-8 bg-neutral-100">
                                            <h3 className="text-xl font-bold mb-3 text-black">{item.title}</h3>
                                            <p className="text-sm mb-4 text-black font-medium">{item.desc}</p>
                                            <div className="flex items-center gap-2 font-bold text-sm underline text-black">
                                                Read More <CaretRight size={14} weight="bold" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Contact */}
                        <section id="contact" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8">Contact and Guidance</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-neutral-100 p-8 rounded-none">
                                    <h3 className="font-bold text-xl mb-2 text-black">Student Services</h3>
                                    <p className="text-black mb-4 font-medium">Reach out to programme coordinators, academic advisors, and the international support team.</p>
                                    <Link href="/contact" className="text-sm font-bold underline hover:opacity-70 transition-colors flex items-center gap-2">Contact Support <ArrowRight size={14} /></Link>
                                </div>
                                <div className="bg-neutral-100 p-8 rounded-none">
                                    <h3 className="font-bold text-xl mb-2 text-black">Peer Tutors</h3>
                                    <p className="text-black mb-4 font-medium">Connect with senior students for advice on student life and settling in.</p>
                                    <Link href="https://ourblogs.kestora.online/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold underline hover:opacity-70 transition-colors flex items-center gap-2">Find a Tutor <ArrowRight size={14} /></Link>
                                </div>
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </div>
    );
}
