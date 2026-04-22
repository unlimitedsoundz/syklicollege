
import Link from 'next/link';
import Image from 'next/image';
import { News, Event } from '@/types/database';
import { formatToDDMMYYYY } from '@/utils/date';
import { Calendar, MapPin, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: 'News & Events | Kestora University',
    description: 'The latest news, announcements, and upcoming events from Kestora University.',
    alternates: {
        canonical: 'https://kestora.online/news/',
    },
};

import { createStaticClient } from '@/lib/supabase/static';

import NewsList from '@/components/news/NewsList';

export default async function NewsPage() {

    // Static editorial articles (not in DB)
    const staticArticles = [
        {
            id: 'static-why-study-finland',
            title: 'Why Study in Finland? 10 Reasons International Students Choose Helsinki',
            slug: 'why-study-in-finland',
            excerpt: 'Finland has become one of Europe\'s most attractive study destinations. From world-class education to a thriving tech scene, discover why students are flocking to Helsinki.',
            imageUrl: '/images/news/helsinki-study-hero.png',
            publishDate: '2026.02.14',
            type: 'news',
            sortDate: '2026.02.14',
            published: true,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <section className="text-black overflow-hidden" style={{ backgroundColor: '#FDF2F8' }}>
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-12 pb-12 lg:pb-0 h-auto lg:h-[600px] lg:py-0 relative mb-0">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <h1 className="font-bold leading-[1.1] tracking-tight pt-8 text-black" style={{ fontSize: '40px' }}>
                            News & Events
                        </h1>
                        <p className="text-[21px] text-black max-w-xl leading-relaxed">
                            Stay up to date with the latest stories, research breakthroughs, and upcoming events from Kestora University.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="/images/news-hero.png"
                                    alt="Kestora University News & Events"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 368px, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <NewsList staticArticles={staticArticles} />
            </div>
        </div >
    );
}

