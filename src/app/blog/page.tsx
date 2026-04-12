import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import BlogList from '@/components/blog/BlogList';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-yellow-200 text-black">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-32 pb-4 h-auto min-h-[600px] md:pt-48 lg:h-[600px] lg:py-0 relative mb-12">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-2 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight pt-8 lg:pt-24">
                            Kestora Student Ambassadors Blog
                        </h1>
                        <p className="text-[21px] text-black max-w-xl leading-relaxed my-4">
                            Stories and insights from Kestora University student ambassadors sharing their experiences studying and living in Finland.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative mt-4 lg:mt-0 lg:translate-y-16 z-20 flex justify-center lg:block">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800 shadow-2xl overflow-hidden">
                                <Image
                                    src="/images/1775817359452-019d76f5-cb93-7e9a-8515-61a71c69fa56.png"
                                    alt="Kestora Student Ambassadors Blog"
                                    fill
                                    priority
                                    className="object-cover opacity-90"
                                    sizes="(max-width: 1024px) 368px, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
                    <Link
                        href="/"
                        className="text-neutral-500 hover:text-black transition-colors font-medium"
                    >
                        Home
                    </Link>
                    <span className="text-neutral-400">/</span>
                    <span className="text-neutral-900 font-medium">Blog</span>
                </nav>

                {/* Alternative: Compact back navigation */}
                <div className="mt-4">
                    <Link href="/" className="text-neutral-600 hover:text-black font-semibold inline-flex items-center gap-2 transition-colors group">
                        <CaretLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                        <span className="text-neutral-400">•</span>
                        <span className="text-neutral-500 text-xs uppercase tracking-wide">University</span>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
                <Suspense fallback={<div>Loading blogs...</div>}>
                    <BlogList />
                </Suspense>

                {/* Related Links */}
                <div className="mt-16 pt-10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">Related Links</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { title: "How to Apply", href: "/admissions/application-process", desc: "Step-by-step application guide." },
                            { title: "Explore Programmes", href: "/studies", desc: "Browse all degree programmes." },
                            { title: "International Students", href: "/student-guide/international", desc: "Visa, housing, and arrival info." },
                        ].map(link => (
                            <Link key={link.href} href={link.href} className="bg-neutral-50 p-5 rounded-xl hover:bg-neutral-100 transition-colors group">
                                <h4 className="font-bold text-neutral-900 mb-1 group-hover:underline text-sm">{link.title}</h4>
                                <p className="text-xs text-neutral-500">{link.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}