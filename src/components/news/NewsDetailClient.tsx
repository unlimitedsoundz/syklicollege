'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { News } from '@/types/database';
import { createClient } from '@/utils/supabase/client';
import { formatToDDMMYYYY } from '@/utils/date';
import { CaretLeft } from "@phosphor-icons/react";

interface NewsDetailClientProps {
    initialNews: News;
}

export default function NewsDetailClient({ initialNews }: NewsDetailClientProps) {
    const [currentNews, setNews] = useState<News>(initialNews);

    useEffect(() => {
        async function fetchLatest() {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('News')
                .select('*')
                .eq('id', initialNews.id)
                .single();

            if (data && !error) {
                if (data.content !== initialNews.content || data.title !== initialNews.title) {
                    setNews(data as News);
                }
            }
        }
        fetchLatest();
    }, [initialNews.id, initialNews.content]);

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <section className="text-black overflow-hidden" style={{ backgroundColor: '#FDF2F8' }}>
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-12 pb-12 lg:pb-0 h-auto lg:h-[600px] lg:py-0 relative mb-0">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <div className="text-sm font-bold text-black uppercase tracking-wider mb-2">
                            {formatToDDMMYYYY(currentNews.publishDate)}
                        </div>
                        <h1 className="font-bold leading-[1.1] tracking-tight pt-0 text-black" style={{ fontSize: '40px' }}>
                            {currentNews.title}
                        </h1>
                        {currentNews.excerpt && (
                            <p className="text-[21px] text-black max-w-xl leading-relaxed">
                                {currentNews.excerpt}
                            </p>
                        )}
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                {currentNews.imageUrl && (
                                    <Image
                                        src={currentNews.imageUrl}
                                        alt={currentNews.title}
                                        fill
                                        priority
                                        unoptimized
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 368px, 50vw"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-6 max-w-3xl">
                <Link href="/news" className="text-neutral-500 hover:text-black font-bold uppercase tracking-wider text-sm inline-flex items-center gap-2 transition-colors">
                    <CaretLeft size={16} weight="bold" /> Back to News
                </Link>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl">
                <div className="prose prose-lg prose-emerald mx-auto">
                    <p className="lead text-xl text-neutral-600 font-medium mb-8">
                        {currentNews.excerpt}
                    </p>
                    <div className="whitespace-pre-wrap text-neutral-800">
                        {currentNews.content}
                    </div>
                </div>



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
