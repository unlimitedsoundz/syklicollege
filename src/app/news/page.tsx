
import { Link } from "@aalto-dx/react-components";
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

import { Hero } from '@/components/layout/Hero';
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
        <div className="min-h-screen bg-white text-black font-sans">
            {/* HERO SECTION */}
            <Hero
                title="News & Events"
                body="Stay up to date with the latest stories, research breakthroughs, and upcoming events from Kestora University."
                backgroundColor="#dc6ade"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'News & Events' }
                ]}
                image={{
                    src: "/images/news/helsinki-study-hero.png",
                    alt: "Kestora University News & Events"
                }}
            />

            <div className="container mx-auto px-4 py-16">
                <NewsList staticArticles={staticArticles} />
            </div>
        </div >
    );
}

