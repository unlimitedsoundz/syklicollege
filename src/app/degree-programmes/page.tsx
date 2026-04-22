import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, BookOpen, Users, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';

const sections = [
    { id: 'bachelor', title: 'Bachelor\'s Programmes', content: '' },
    { id: 'master', title: 'Master\'s Programmes', content: '' },
    { id: 'admission', title: 'Admission Requirements', content: '' },
    { id: 'fees', title: 'Tuition & Fees', content: '' },
];

export const metadata = {
    title: 'Degree Programmes | Kestora University',
    description: 'Explore our comprehensive range of bachelor\'s and master\'s degree programmes at Kestora University.',
    alternates: {
        canonical: 'https://kestora.online/degree-programmes/',
    },
};

export default function DegreeProgrammesPage() {
    return (
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 py-8 md:py-20">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <main className="lg:w-full space-y-20 md:space-y-32">

                            {/* Hero Section */}
                            <section className="bg-white border-b-2 border-black pb-16 md:pb-24">
                                <div className="max-w-4xl">
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 uppercase tracking-tight leading-tight">Degree Programmes</h1>
                                    <p className="text-xl md:text-2xl text-black leading-relaxed font-medium">
                                        Discover our diverse range of academic programmes designed to prepare you for success in your career.
                                        From undergraduate to graduate studies, we offer world-class education in Helsinki.
                                    </p>
                                </div>
                            </section>

                            {/* Bachelor's Programmes */}
                            <section id="bachelor" className="scroll-mt-32">
                                <h2 className="text-3xl md:text-4xl font-bold mb-12 uppercase tracking-widest border-l-4 border-black pl-6">Bachelor's Programmes</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-black">
                                    {[
                                        {
                                            title: "Bachelor of Business Administration",
                                            duration: "3 years",
                                            description: "Develop essential business skills and leadership capabilities in our comprehensive BBA programme.",
                                            image: "/images/programs/business.jpg"
                                        },
                                        {
                                            title: "Bachelor of Information Technology",
                                            duration: "3 years",
                                            description: "Master modern IT technologies and software development in our cutting-edge programme.",
                                            image: "/images/programs/it.jpg"
                                        },
                                        {
                                            title: "Bachelor of Arts in Design",
                                            duration: "3 years",
                                            description: "Explore creative design principles and develop your artistic skills in our innovative programme.",
                                            image: "/images/programs/design.jpg"
                                        }
                                    ].map((program, index) => (
                                        <div key={index} className={`bg-white p-8 group flex flex-col ${index !== 2 ? 'border-b lg:border-b-0 lg:border-r border-black' : ''}`}>
                                            <div className="h-48 bg-neutral-100 mb-8 relative overflow-hidden border border-black/10">
                                                <Image
                                                    src={program.image}
                                                    alt={program.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                                    {program.duration}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-4 uppercase tracking-tight leading-snug h-14 overflow-hidden">{program.title}</h3>
                                            <p className="text-black mb-8 leading-relaxed flex-grow">{program.description}</p>
                                            <Link href="/admissions/bachelor" className="text-black font-bold uppercase tracking-widest text-sm inline-flex items-center gap-3 group-hover:gap-5 transition-all">
                                                Learn more <ArrowRight size={18} weight="bold" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Master's Programmes */}
                            <section id="master" className="scroll-mt-32">
                                <h2 className="text-3xl md:text-4xl font-bold mb-12 uppercase tracking-widest border-l-4 border-black pl-6">Master's Programmes</h2>
                                <div className="grid md:grid-cols-2 gap-0 border border-black">
                                    {[
                                        {
                                            title: "Master of Business Administration (MBA)",
                                            duration: "2 years",
                                            description: "Advance your career with our comprehensive MBA programme focusing on strategic leadership and innovation.",
                                            image: "/images/programs/mba.jpg"
                                        },
                                        {
                                            title: "Master of Information Technology",
                                            duration: "2 years",
                                            description: "Specialize in advanced IT technologies, cybersecurity, and digital transformation.",
                                            image: "/images/programs/mit.jpg"
                                        }
                                    ].map((program, index) => (
                                        <div key={index} className={`bg-white p-10 group flex flex-col ${index === 0 ? 'border-b md:border-b-0 md:border-r border-black' : ''}`}>
                                            <div className="h-64 bg-neutral-100 mb-8 relative overflow-hidden border border-black/10">
                                                <Image
                                                    src={program.image}
                                                    alt={program.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="bg-black text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                                                    {program.duration}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{program.title}</h3>
                                            <p className="text-black mb-10 leading-relaxed text-lg flex-grow">{program.description}</p>
                                            <Link href="/admissions/master" className="text-black font-bold uppercase tracking-widest text-base inline-flex items-center gap-3 group-hover:gap-5 transition-all">
                                                Explore Programme <ArrowRight size={20} weight="bold" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Admission Requirements */}
                            <section id="admission" className="scroll-mt-32">
                                <h2 className="text-3xl md:text-4xl font-bold mb-12 uppercase tracking-widest">Admission Requirements</h2>
                                <div className="bg-white border border-black p-10 md:p-16">
                                    <div className="grid md:grid-cols-2 gap-16">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide border-b border-black pb-4">Bachelor's</h3>
                                            <ul className="space-y-6">
                                                {[
                                                    "High school diploma or equivalent",
                                                    "Minimum GPA requirements",
                                                    "English language proficiency",
                                                    "Entrance examination (if required)"
                                                ].map((req, index) => (
                                                    <li key={index} className="flex items-start gap-4">
                                                        <ArrowRight size={20} weight="bold" className="text-black flex-shrink-0 mt-1" />
                                                        <span className="text-black text-lg font-medium">{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide border-b border-black pb-4">Master's</h3>
                                            <ul className="space-y-6">
                                                {[
                                                    "Bachelor's degree or equivalent",
                                                    "Relevant work experience",
                                                    "Academic transcripts",
                                                    "Letters of recommendation",
                                                    "Statement of purpose"
                                                ].map((req, index) => (
                                                    <li key={index} className="flex items-start gap-4">
                                                        <ArrowRight size={20} weight="bold" className="text-black flex-shrink-0 mt-1" />
                                                        <span className="text-black text-lg font-medium">{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Tuition & Fees */}
                            <section id="fees" className="scroll-mt-32">
                                <h2 className="text-3xl md:text-4xl font-bold mb-12 uppercase tracking-widest">Tuition & Fees</h2>
                                <div className="grid md:grid-cols-2 gap-0 border border-black">
                                    <div className="bg-white p-10 border-b md:border-b-0 md:border-r border-black">
                                        <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide">EU/EEA Students</h3>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center border-b border-black/10 pb-4">
                                                <span className="text-black font-medium">Bachelor's programmes</span>
                                                <span className="font-bold text-xl uppercase">Free</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-black/10 pb-4">
                                                <span className="text-black font-medium">Master's programmes</span>
                                                <span className="font-bold text-xl uppercase">Free</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-10">
                                        <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide">Non-EU Students</h3>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center border-b border-black/10 pb-4">
                                                <span className="text-black font-medium">Bachelor's programmes</span>
                                                <span className="font-bold text-xl">€12,000/year</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-black/10 pb-4">
                                                <span className="text-black font-medium">Master's programmes</span>
                                                <span className="font-bold text-xl">€15,000/year</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12">
                                    <Link href="/admissions/tuition" className="w-full md:w-auto bg-black text-white px-10 py-5 font-bold uppercase tracking-widest text-base hover:bg-neutral-800 transition-colors inline-block text-center">
                                        View Detailed Fee Information
                                    </Link>
                                </div>
                            </section>

                        </main>
                    </div>
                </div>
            </div>
        </GuideSidebarLayout>
    );
}