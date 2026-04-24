'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from '@phosphor-icons/react';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SchemaLD } from '@/components/seo/SchemaLD';

const positions = [
    {
        title: 'University Lecturer, Engineering & Sustainability',
        type: 'Full-time',
        location: 'Helsinki Campus',
        description: 'Leading research and teaching in a multi-disciplinary environment spanning engineering, science, and technology.'
    },
    {
        title: 'Admissions Coordinator',
        type: 'Part-time',
        location: 'Remote / Helsinki',
        description: 'Supporting international students through their application journey at Kestora University.'
    },
    {
        title: 'IT Support Specialist',
        type: 'Full-time',
        location: 'Helsinki Campus',
        description: 'Managing campus infrastructure and supporting our digital learning environment.'
    }
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'Careers', item: '/careers' }
            ]} />

            <SchemaLD data={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Careers at Kestora University",
                "description": "Explore job opportunities at Kestora University in Helsinki.",
                "url": "https://kestora.online/careers"
            }} />

            {positions.map((pos, index) => (
                <SchemaLD key={`schema-${index}`} data={{
                    "@context": "https://schema.org",
                    "@type": "JobPosting",
                    "title": pos.title,
                    "description": pos.description,
                    "datePosted": "2026-02-22",
                    "validThrough": "2026-12-31",
                    "employmentType": pos.type === "Full-time" ? "FULL_TIME" : "PART_TIME",
                    "hiringOrganization": {
                        "@type": "UniversityOrUniversity",
                        "name": "Kestora University",
                        "sameAs": "https://kestora.online",
                        "logo": "https://kestora.online/logo-kestora.png"
                    },
                    "jobLocation": {
                        "@type": "Place",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Pohjoisesplanadi 51",
                            "addressLocality": "Helsinki",
                            "postalCode": "00150",
                            "addressCountry": "FI"
                        }
                    }
                }} />
            ))}

            {/* Hero Section (Sky Blue Split - Matching Admissions Style) */}
            <section className="text-black overflow-hidden" style={{ backgroundColor: '#0EA5E9' }}>
                <div className="container mx-auto flex flex-col lg:flex-row items-center gap-2 lg:gap-16 pt-0 md:pt-12 pb-12 lg:pb-0 h-auto lg:h-[600px] lg:py-0 relative mb-0">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center h-full pt-2 lg:pt-0 px-4 md:px-0">
                        <h1 className="font-bold leading-[1.1] tracking-tight pt-2 text-black" style={{ fontSize: '40px' }}>
                            Work at <br className="hidden md:block" /> Kestora University
                        </h1>
                        <p className="text-[21px] text-black max-w-xl leading-relaxed">
                            Shape the future of higher education in Finland. We're looking for innovators, educators, and leaders to join our world-class faculty and staff.
                        </p>
                        <div className="flex flex-wrap gap-6 pt-4">
                            <Link href="mailto:careers@kestora.online" className="text-lg font-bold underline underline-offset-8 decoration-black hover:opacity-70 transition-colors text-black inline-flex items-center gap-2">
                                Send your CV
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full w-full">
                            <div className="relative w-full aspect-square md:aspect-auto lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="https://i.pinimg.com/736x/5d/cc/b7/5dccb711d4b73c6b11c943856693fe52.jpg"
                                    alt="Work at Kestora University"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="100vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-24 container mx-auto px-4">
                <div className="max-w-3xl">
                    <h2 className="text-4xl font-bold mb-8 tracking-tight">Institutional Culture</h2>
                    <p className="text-lg text-neutral-600 leading-relaxed mb-12">
                        Kestora University is an independent higher education institution in Helsinki, Finland, offering English-taught Bachelor’s and Master’s degree programmes focused on engineering, technology, business, science, and the arts.
                    </p>
                    <div className="space-y-8">
                        <div className="flex gap-4 items-start">
                            <div>
                                <h3 className="font-bold text-lg">Multi-Disciplinary Excellence</h3>
                                <p className="text-neutral-500">A higher education institution focused on arts, science, business, and engineering.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div>
                                <h3 className="font-bold text-lg">International Focus</h3>
                                <p className="text-neutral-500">A diverse community of students and faculty from over 40 countries.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Banner */}
            <section className="py-24 text-black overflow-hidden" style={{ backgroundColor: '#0EA5E9' }}>
                <div className="container mx-auto px-4 text-center">
                    <blockquote className="text-2xl md:text-4xl font-normal leading-tight mb-8 max-w-4xl mx-auto">
                        "Working here means being part of a team that doesn't just teach the future; we build it."
                    </blockquote>
                    <cite className="text-black not-italic font-normal uppercase tracking-widest text-sm">— Dr. Anna Virtanen, Rector</cite>
                </div>
            </section>

            {/* Job Postings */}
            <section className="py-24 bg-neutral-50 border-y border-neutral-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight">Open Positions</h2>
                            <p className="text-neutral-500 mt-2">Find your next role at Kestora University.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {positions.map((pos, index) => (
                            <div key={index} className="bg-white p-8 transition-colors group flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-xs font-bold uppercase tracking-widest bg-neutral-100 px-3 py-1 rounded">
                                        {pos.type}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-4 group-hover:underline">
                                    {pos.title}
                                </h3>
                                <p className="text-neutral-500 text-sm mb-6 flex-grow">
                                    {pos.description}
                                </p>
                                <div className="flex items-center text-sm font-bold gap-2">
                                    <span className="text-neutral-400">{pos.location}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-black text-white overflow-hidden relative">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready to apply?</h2>
                    <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
                        If you don't see a position that fits your profile but believe you'd be a great addition to the team, send us an open application.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        <a
                            href="mailto:careers@kestora.online"
                            className="px-10 py-5 bg-white text-black font-bold text-lg hover:bg-neutral-200 transition-colors flex items-center gap-3"
                        >
                            Send your CV
                        </a>
                        <p className="text-neutral-500 font-mono text-sm">
                            careers@kestora.online
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
