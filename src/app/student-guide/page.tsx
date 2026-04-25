import {
    BookOpen, GraduationCap, Heart,
    ArrowRight, CaretRight
} from "@phosphor-icons/react/dist/ssr";
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';
import { Hero } from '@/components/layout/Hero';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';
import { Breadcrumbs } from '@aalto-dx/react-modules';
import { Card } from '@/components/ui/Card';
import { TagGroup } from '@/components/ui/TagGroup';
import { ContentBox } from '@/components/ui/ContentBox';

export const metadata = {
    title: 'Student Guide | Kestora University',
    description: 'Find all the information you need to navigate your studies and life at Kestora University.',
    alternates: {
        canonical: 'https://kestora.online/student-guide/',
    },
};

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
                { title: "Chat with Students", href: "/student-guide/chat-with-kestora-students" },
                { title: "International Students", href: "/student-guide/international" },
                { title: "Exchange Students", href: "/student-guide/exchange" },
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
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <Hero
                title="Student Guide"
                body="Find all the information you need to navigate your studies and life at Kestora University. From academic regulations to campus services, we support your journey every step of the way."
                backgroundColor="#472247"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Student Guide' }
                ]}
                image={{
                    src: "/images/bachelors-group-v2.png",
                    alt: "Students collaborating at Kestora University"
                }}
            >
                <Link href="#programmes" className="text-aalto-3 font-bold underline underline-offset-8 decoration-white hover:opacity-70 transition-colors flex items-center gap-2 text-white">
                    View Programmes <ArrowRight size={20} weight="bold" />
                </Link>
            </Hero>

            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Main Content */}
                    <main className="lg:w-full space-y-12 md:space-y-20">

                        {/* Intro */}
                        <div className="max-w-none text-xl text-black">
                            <p className="font-bold border-l-4 border-black pl-8 py-2 leading-relaxed">
                                Whether you are a new student, continuing your degree, or joining from abroad, this guide explains how studies are organised and how support is provided throughout your academic journey.
                            </p>
                        </div>

                        {/* Degree Programmes */}
                        <section id="programmes" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">
                                Degree Programmes at Kestora University
                            </h2>
                            <p className="text-aalto-3 text-black mb-8">
                                Kestora University offers Bachelor’s and Master’s degree programmes taught in English across business, economics, management, finance, information systems, entrepreneurship, and interdisciplinary fields.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <Card
                                    title="Bachelor’s Degree"
                                    image={{ src: "/images/bachelors-group-v2.png", alt: "Bachelor's Degree" }}
                                    body="Structured curriculum focused on core knowledge and skills."
                                    cta={{ label: "Learn more", linkComponentProps: { href: "/admissions/bachelor" } }}
                                />
                                <Card
                                    title="Master’s Degree"
                                    image={{ src: "/images/student-guide-hero.png", alt: "Master's Degree" }}
                                    body="Advanced studies focusing on specialized expertise and research-oriented development."
                                    cta={{ label: "Learn more", linkComponentProps: { href: "/admissions/master" } }}
                                />
                            </div>

                            <div className="bg-neutral-100 p-8 rounded-2xl">
                                <h3 className="font-bold text-lg mb-4">Curriculum Structure</h3>
                                <ul className="grid sm:grid-cols-2 gap-4 text-black">
                                    {[
                                        "Core compulsory courses", "Elective courses",
                                        "Minor studies", "Language and communication studies",
                                        "Final thesis or capstone project"
                                    ].map(item => (
                                        <li key={item} className="flex items-center gap-3 font-bold">
                                            <ArrowRight size={20} weight="bold" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Minors */}
                        <section id="minors" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Minors and Study Combinations</h2>
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
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Courses and Course Registration</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="rounded-none p-6">
                                    <h3 className="font-bold text-xl mb-3">Course Structure</h3>
                                    <p className="text-black mb-4 font-medium">Courses are assigned ECTS credits based on workload. Format includes:</p>
                                    <TagGroup tags={['Lectures', 'Seminars', 'Projects', 'Case Studies', 'Exams'].map(tag => ({ label: tag }))} />
                                </div>
                                <div className="bg-gray-100 rounded-none p-6">
                                    <h3 className="font-bold text-xl mb-3 text-black">Registration</h3>
                                    <p className="text-black mb-4 font-medium">Register via the digital study system during published periods.</p>
                                    <ul className="text-sm space-y-3 text-black font-bold">
                                        <li className="flex items-center gap-2"><ArrowRight size={20} weight="bold" /> Check participant limits</li>
                                        <li className="flex items-center gap-2"><ArrowRight size={20} weight="bold" /> Verify prerequisites</li>
                                        <li className="flex items-center gap-2"><ArrowRight size={20} weight="bold" /> Review selection criteria</li>
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
                            <ContentBox
                                size="large"
                                icon="calendar"
                                title="Academic Calendar"
                                body={
                                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-left">
                                        <div className="md:w-1/3 md:border-r border-gray-300 md:pr-8">
                                            <h4 className="font-bold text-black mb-4 uppercase tracking-widest text-xs">The Academic Year</h4>
                                            <div className="space-y-6">
                                                <div>
                                                    <h5 className="font-bold text-black mb-1">Autumn Term</h5>
                                                    <p className="text-sm text-black">September — December</p>
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-black mb-1">Spring Term</h5>
                                                    <p className="text-sm text-black">January — May</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-2/3">
                                            <h4 className="font-bold text-lg mb-4 text-black">Teaching Periods & Dates</h4>
                                            <p className="text-sm text-black mb-6">Each term consists of multiple teaching periods. Courses may run intensively or throughout the semester.</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { t: "Teaching Periods", d: "Scheduled sessions" },
                                                    { t: "Exam Periods", d: "Assessment weeks" },
                                                    { t: "Registration", d: "Sign-up deadlines" },
                                                    { t: "Breaks", d: "Winter & Summer" }
                                                ].map(item => (
                                                    <div key={item.t} className="bg-card p-4 rounded-xl border border-gray-200">
                                                        <span className="block font-bold mb-1 text-black text-sm">{item.t}</span>
                                                        <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">{item.d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        </section>

                        {/* Support */}
                        <section id="support" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Study Support Services</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Card
                                    title="Academic Guidance"
                                    image={{ src: "https://i.pinimg.com/1200x/23/fa/68/23fa68a8b1f907ec254dbcd7709b06eb.jpg", alt: "Academic Guidance" }}
                                    body="Programme level advising and personal study plans."
                                    cta={{ label: "Contact Advisor", linkComponentProps: { href: "/contact" } }}
                                />
                                <Card
                                    title="Learning Support"
                                    image={{ src: "https://i.pinimg.com/736x/72/02/74/72027422a2b62ce0f06b599060ea5be1.jpg", alt: "Learning Support" }}
                                    body="Workshops, writing support, and study skills development."
                                    cta={{ label: "View Workshops", linkComponentProps: { href: "#support" } }}
                                />
                                <Card
                                    title="Wellbeing"
                                    image={{ src: "/images/admissions/student_life_events.png", alt: "Wellbeing" }}
                                    body="Health services, accessibility, and counseling for all students."
                                    cta={{ label: "Get Support", linkComponentProps: { href: "#support" } }}
                                />
                            </div>
                        </section>

                        {/* New Students */}
                        <section id="new-students" className="scroll-mt-32">
                            <ContentBox
                                size="large"
                                icon="identificationBadge"
                                title="Information for New Students"
                                body={
                                    <div className="grid md:grid-cols-2 gap-12 text-left">
                                        <div>
                                            <h4 className="font-bold text-xl mb-4 text-black">Orientation Programme</h4>
                                            <p className="text-sm text-neutral-700 mb-6 leading-relaxed">
                                                New students receive structured onboarding before studies begin, ensuring a smooth transition into university life.
                                            </p>
                                            <ul className="space-y-3">
                                                {[
                                                    "Degree programme introductions",
                                                    "Digital systems training",
                                                    "Course registration guidance",
                                                    "Campus services overview"
                                                ].map(item => (
                                                    <li key={item} className="flex items-center gap-3 font-bold text-sm">
                                                        <ArrowRight size={14} weight="bold" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-card p-8 rounded-2xl border border-neutral-200">
                                            <h4 className="font-bold text-lg mb-6 text-black">Getting Started Checklist</h4>
                                            <ul className="space-y-4 text-sm font-bold">
                                                <li className="flex gap-3 items-center"><ArrowRight size={14} /> Confirm study rights</li>
                                                <li className="flex gap-3 items-center"><ArrowRight size={14} /> Activate student email</li>
                                                <li className="flex gap-3 items-center"><ArrowRight size={14} /> Access learning platforms</li>
                                                <li className="flex gap-3 items-center"><ArrowRight size={14} /> Get student ID card</li>
                                            </ul>
                                        </div>
                                    </div>
                                }
                            />
                        </section>

                        {/* Student Categories / Breakdown */}
                        <section id="student-types" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Student Categories</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Card
                                    title="Chat with Students"
                                    image={{ src: "/images/chat-with-students-hero.png", alt: "Chat with Students" }}
                                    body="Connect with current students and ambassadors to learn about life at Kestora."
                                    cta={{ label: "Chat now", linkComponentProps: { href: "/student-guide/chat-with-kestora-students" } }}
                                />
                                <Card
                                    title="International Students"
                                    image={{ src: "/images/international-students-hero.png", alt: "International Students" }}
                                    body="Support Services, residence permits, and integration into Finnish society."
                                    cta={{ label: "View guide", linkComponentProps: { href: "/student-guide/international" } }}
                                />
                                <Card
                                    title="Exchange Students"
                                    image={{ src: "/images/international-students.png", alt: "Exchange Students" }}
                                    body="Orientation, course selection, and cultural adaptation for short-term studies."
                                    cta={{ label: "Learn more", linkComponentProps: { href: "/student-guide/exchange" } }}
                                />
                            </div>
                        </section>

                        {/* Contact */}
                        <section id="contact" className="scroll-mt-32">
                            <h2 className="text-aalto-5 font-bold mb-aalto-p4 text-black tracking-tight">Contact and Guidance</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <ContentBox
                                    icon="users"
                                    title="Student Services"
                                    body="Reach out to programme coordinators, academic advisors, and the international support team."
                                />
                                <ContentBox
                                    icon="chatCircleDots"
                                    title="Peer Tutors"
                                    body="Connect with senior students for advice on student life and settling in."
                                />
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </div>
        </GuideSidebarLayout>
    );
}
