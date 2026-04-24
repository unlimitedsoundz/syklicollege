
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Envelope as Mail, Phone, MapPin, Clock, Building, Globe, FileText, CreditCard } from "@phosphor-icons/react/dist/ssr";
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SchemaLD } from '@/components/seo/SchemaLD';

export const metadata: Metadata = {
    title: 'Contact Information | Kestora University',
    description: 'Contact details for Kestora University including Registry, Admissions, Student Services, and general inquiries.',
    alternates: {
        canonical: 'https://kestora.online/contact/',
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white pb-20">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'Contact', item: '/contact' }
            ]} />

            <SchemaLD data={{
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact Kestora University",
                "url": "https://kestora.online/contact",
                "mainEntity": {
                    "@type": "EducationalOrganization",
                    "name": "Kestora University",
                    "email": "Kestora@kestora.online",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Pohjoisesplanadi 51",
                        "addressLocality": "Helsinki",
                        "postalCode": "00150",
                        "addressCountry": "FI"
                    }
                }
            }} />
            {/* Hero Section (Light Orange Split - Matching Admissions Style) */}
            <section className="text-black overflow-hidden" style={{ backgroundColor: '#FE8B33' }}>
                <div className="container mx-auto flex flex-col lg:flex-row items-center gap-2 lg:gap-16 pt-0 md:pt-12 pb-12 lg:pb-0 h-auto lg:h-[600px] lg:py-0 relative mb-0">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center h-full pt-2 lg:pt-0 px-4 md:px-0">
                        <h1 className="font-bold leading-[1.1] tracking-tight pt-2 text-black" style={{ fontSize: '40px' }}>
                            Contact Information
                        </h1>
                        <p className="text-[21px] text-black max-w-xl leading-relaxed">
                            Kestora University provides contact information for administrative services including Registry, Admissions, Student Services and general inquiries to support students, applicants, staff and partners.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full w-full">
                            <div className="relative w-full aspect-square md:aspect-auto lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="https://i.pinimg.com/736x/fa/28/ed/fa28ed6017e508a4291beda999617f25.jpg"
                                    alt="Contact Kestora University"
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

            <div className="container mx-auto px-4 mt-20 max-w-4xl">
                <div className="space-y-24 pb-20">
                    {/* Main Switchboard */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-black tracking-tight">Main Switchboard</h2>
                        <div className="space-y-4">
                            <p className="text-2xl font-medium text-black">+358 09 42721884</p>
                            <p className="text-neutral-500 text-lg">(General enquiries and guidance to appropriate services)</p>
                        </div>
                        <div className="mt-12">
                            <h3 className="font-bold text-xl mb-4 text-black uppercase tracking-wider text-xs">Postal Address</h3>
                            <address className="not-italic text-neutral-600 text-lg leading-relaxed">
                                Kestora University – Helsinki Campus<br />
                                Pohjoisesplanadi 51,<br />
                                00150 Helsinki, Uusimaa,<br />
                                Finland
                            </address>
                        </div>
                    </section>

                    <hr className="border-neutral-200" />

                    {/* Key Services */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                        {/* Registry Office */}
                        <section>
                            <h3 className="text-2xl font-bold mb-4 text-black">Registry Office</h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed">
                                Responsible for receiving official correspondence and documentation.
                            </p>
                            <div className="space-y-3">
                                <a href="mailto:registry@kestora.online" className="block text-black hover:underline font-medium text-lg">registry@kestora.online</a>
                                <p className="text-sm text-neutral-500">Kestora University – Helsinki Campus, Pohjoisesplanadi 51</p>
                            </div>
                        </section>

                        {/* Admissions Services */}
                        <section>
                            <h3 className="text-2xl font-bold mb-4 text-black">Admissions Services</h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed">
                                Information on programmes, applications, scholarships, and deadlines.
                            </p>
                            <div className="space-y-3">
                                <a href="mailto:admissions@kestora.online" className="block text-black hover:underline font-medium text-lg">admissions@kestora.online</a>
                                <p className="text-lg font-medium text-black">+358 09 42721884</p>
                                <p className="text-sm text-neutral-500">Check website for hours</p>
                            </div>
                        </section>

                        {/* Student Services */}
                        <section>
                            <h3 className="text-2xl font-bold mb-4 text-black">Student Services</h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed">
                                Support for enrolled students including study planning and wellbeing.
                            </p>
                            <div className="space-y-3">
                                <a href="mailto:studentservices@kestora.online" className="block text-black hover:underline font-medium text-lg">studentservices@kestora.online</a>
                                <p className="text-lg font-medium text-black">+358 09 42721884</p>
                                <p className="text-sm text-neutral-500">Operates appointment & walk-in hours.</p>
                            </div>
                        </section>

                        {/* Archives */}
                        <section>
                            <h3 className="text-2xl font-bold mb-4 text-black">Archives</h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed">
                                Storage of permanent records and official documentation.
                            </p>
                            <div className="space-y-3">
                                <a href="mailto:archives@kestora.online" className="block text-black hover:underline font-medium text-lg">archives@kestora.online</a>
                                <p className="text-lg font-medium text-black">+358 09 42721884</p>
                            </div>
                        </section>
                    </div>

                    <hr className="border-neutral-200" />

                    {/* Academic Schools */}
                    <section>
                        <h2 className="text-2xl font-bold mb-10 text-black tracking-tight uppercase tracking-widest text-xs">Schools and Departments</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {[
                                { name: "School of Arts, Design and Architecture", href: "/schools/arts" },
                                { name: "School of Science", href: "/schools/science" },
                                { name: "School of Technology", href: "/schools/technology" },
                                { name: "School of Business", href: "/schools/business" }
                            ].map((school) => (
                                <Link key={school.name} href={school.href} className="group flex justify-between items-center py-4 border-b border-neutral-100 hover:border-black transition-colors">
                                    <h4 className="font-bold text-lg group-hover:underline">{school.name}</h4>
                                    <span className="text-sm text-neutral-400 group-hover:text-black">→</span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <hr className="border-neutral-200" />

                    {/* Footer Info Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {/* Business Info */}
                        <section>
                            <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-6">Business Info</h3>
                            <div className="space-y-2">
                                <span className="block text-xs text-neutral-500">Business ID</span>
                                <span className="text-lg font-medium text-black">9996326-7</span>
                            </div>
                        </section>

                        {/* Related Services */}
                        <section>
                            <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-6">Related Services</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Career Services', href: '/student-guide/international#after-graduation' },
                                    { name: 'International Office', href: '/student-guide/international' },
                                    { name: 'Research and Innovation Services', href: '/research' },
                                    { name: 'Alumni Relations', href: '/alumni' },
                                    { name: 'Media and Communications', href: '/news' },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="flex justify-between items-center text-neutral-600 hover:text-black transition-colors group">
                                            <span>{item.name}</span>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Campus Maps */}
                        <section>
                            <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-6">Campus Maps</h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed text-sm">
                                Find your way around our learning spaces, labs, and studios.
                            </p>
                            <Link href="#" className="font-bold text-black hover:underline text-sm uppercase tracking-widest">
                                View Campus Maps
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
