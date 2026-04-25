import Image from 'next/image';
import { Link } from "@aalto-dx/react-components";
import { Hero } from '@/components/layout/Hero';
import { ArrowRight, Globe, Users, GraduationCap, Heart, Briefcase } from "@phosphor-icons/react/dist/ssr";
import { Card } from '@/components/ui/Card';
import { ContentBox } from '@/components/ui/ContentBox';

export const metadata = {
    title: 'Alumni Network — Kestora University | Career, Community & Events',
    description: 'Join the Kestora University alumni network. Stay connected through events, mentoring, career development, and networking opportunities for graduates worldwide.',
    alternates: {
        canonical: 'https://kestora.online/alumni/',
    },
};

export default function AlumniPage() {
    const benefits = [
        "Invitations to alumni events, seminars, and professional forums",
        "Career development resources and networking opportunities",
        "Continued access to academic research and institutional initiatives",
        "Opportunities to mentor students and recent graduates",
        "Updates on Kestora University programs, partnerships, and developments"
    ];

    return (
        <div className="min-h-screen bg-white font-sans leading-relaxed pb-20">
            {/* Hero Section */}
            <Hero
                title="Kestora Alumni Network"
                body="Empowering a global network of professionals committed to sustainable impact, leadership, and innovation. Graduates become lifelong members of the Kestora community."
                backgroundColor="#5dd089"
                tinted
                lightText={false}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Alumni' }
                ]}
                image={{
                    src: "https://i.pinimg.com/1200x/40/7b/43/407b43fe5af80de6a8f6bdc4da7d1104.jpg",
                    alt: "Kestora Alumni"
                }}
            />

            <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
                <div className="space-y-20">
                    {/* Intro Content */}
                    <section id="intro">
                        <div className="max-w-none">
                            <p className="text-aalto-5 font-bold text-black leading-tight mb-8">
                                The Master’s Alumni of Kestora University represent a growing global community of professionals who have completed advanced postgraduate studies at the institution.
                            </p>
                            <p className="text-aalto-3 text-black font-medium leading-relaxed max-w-4xl">
                                Our alumni are equipped with strong academic foundations, practical expertise, and a commitment to sustainable impact leadership and innovation. Graduates become lifelong members of the Kestora alumni community and continue to contribute to positive change across industries and societies.
                            </p>
                        </div>
                    </section>

                    {/* Key Pillars */}
                    <section id="pillars">
                        <div className="grid md:grid-cols-2 gap-8">
                            <ContentBox
                                icon="globe"
                                title="A Global Professional Network"
                                body="Kestora University Master’s Alumni are active across sustainability, business, technology, education, design, and public policy. This international network strengthens professional collaboration and knowledge exchange."
                            />
                            <ContentBox
                                icon="users"
                                title="Continued Connection"
                                body="At Kestora University, graduation marks the beginning of an ongoing relationship. Master’s Alumni remain connected through academic engagement, professional initiatives, and collaborative projects."
                            />
                        </div>
                    </section>

                    {/* Benefits List */}
                    <section id="benefits">
                        <ContentBox
                            size="large"
                            icon="briefcase"
                            title="Alumni Benefits & Opportunities"
                            body={
                                <div className="text-left space-y-8">
                                    <p className="text-aalto-2 text-black/70 font-bold leading-relaxed">
                                        Master’s Alumni of Kestora University have access to continued engagement opportunities that support lifelong growth and connection.
                                    </p>
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-none border border-neutral-100 shadow-sm">
                                                <div className="w-2 h-2 bg-black mt-1.5 shrink-0" />
                                                <span className="text-sm font-medium text-black leading-tight">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        />
                    </section>

                    {/* Impact and CTA */}
                    <section id="impact">
                        <div className="space-y-12">
                            <div className="max-w-4xl">
                                <h2 className="text-aalto-5 font-bold mb-8 text-black tracking-tight">Alumni Impact and Contribution</h2>
                                <p className="text-aalto-2 text-black leading-relaxed font-bold mb-8">
                                    Kestora University Master’s Alumni play an important role in advancing the institution’s mission and global impact. Through leadership, professional practice, research collaboration, and community engagement, alumni help shape sustainable solutions.
                                </p>
                            </div>

                            <ContentBox
                                backgroundColor="#255236"
                                title={<span className="text-white">Stay Connected with Kestora Alumni</span>}
                                body={
                                    <div className="space-y-8">
                                        <p className="text-neutral-400 font-bold max-w-2xl">
                                            Master’s graduates are encouraged to remain active members of our alumni community. By staying connected, you strengthen professional networks and support future students.
                                        </p>
                                        <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-none font-medium hover:bg-neutral-200 transition-colors group">
                                            Join the Network <ArrowRight size={20} weight="bold" />
                                        </Link>
                                    </div>
                                }
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
