'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { formatToDDMMYYYY } from '@/utils/date';
import { Calendar, MapPin, ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

interface NewsListProps {
    staticArticles?: any[];
}

export default function NewsList({ staticArticles = [] }: NewsListProps) {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        async function fetchContent() {
            const supabase = createClient();

            // Fetch news
            const { data: newsData } = await supabase
                .from('News')
                .select('*')
                .eq('published', true)
                .order('publishDate', { ascending: false });

            // Fetch events
            const { data: eventsData } = await supabase
                .from('Event')
                .select('*')
                .eq('published', true)
                .order('date', { ascending: true });

            // Combine and sort
            const combined = [
                ...staticArticles,
                ...(newsData || []).map((n: any) => ({ ...n, type: 'news', sortDate: n.publishDate })),
                ...(eventsData || []).map((e: any) => ({ ...e, type: 'event', sortDate: e.date }))
            ].sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());

            setItems(combined);
            setLoading(false);
        }

        fetchContent();
    }, [staticArticles]);

    // Pagination logic
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col bg-neutral-100 h-[450px]">
                        <div className="aspect-[16/9] bg-neutral-200" />
                        <div className="p-6 space-y-4">
                            <div className="h-6 bg-neutral-200 w-3/4" />
                            <div className="h-4 bg-neutral-200 w-full" />
                            <div className="h-4 bg-neutral-200 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((item: any) => {
                    const isEvent = item.type === 'event';
                    const href = isEvent ? `/news/events/${item.slug}` : `/news/${item.slug}`;
                    const displayDate = formatToDDMMYYYY(item.sortDate);
                    const fallbackImage = "/images/admissions/events.jpg";

                    return (
                        <Link
                            href={href}
                            key={item.id}
                            className="flex flex-col bg-neutral-100 overflow-hidden group hover:bg-neutral-200 transition-colors h-full"
                        >
                            <div className="aspect-[16/9] relative overflow-hidden bg-neutral-200">
                                <Image
                                    src={item.imageUrl || fallbackImage}
                                    alt={item.title}
                                    fill
                                    unoptimized
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${isEvent ? 'bg-amber-500 text-black' : 'bg-black text-white'}`}>
                                        {isEvent ? 'Event' : 'News'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black mb-3">
                                    {isEvent ? <Calendar size={14} weight="bold" className="text-amber-600" /> : null}
                                    <span>{displayDate}</span>
                                </div>

                                <h2 className="text-xl font-bold mb-4 text-neutral-900 group-hover:underline leading-tight">
                                    {item.title}
                                </h2>

                                <p className="text-black text-[18px] line-clamp-3 mb-6 flex-1">
                                    {item.excerpt || item.content?.replace(/[#*`]/g, '').slice(0, 150)}...
                                </p>

                                {isEvent && item.location && (
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
                                        <MapPin size={12} weight="bold" />
                                        <span>{item.location}</span>
                                    </div>
                                )}

                                <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-wider text-black">
                                    Read more <ArrowRight size={14} weight="bold" className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Pagination Navigation */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 border border-black hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black cursor-pointer disabled:cursor-not-allowed"
                    >
                        <CaretLeft size={20} weight="bold" />
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => {
                            const pageNumber = i + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`w-10 h-10 flex items-center justify-center border font-bold transition-all ${currentPage === pageNumber
                                            ? 'bg-black text-white border-black'
                                            : 'border-transparent text-black hover:border-black'
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-black hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black cursor-pointer disabled:cursor-not-allowed"
                    >
                        <CaretRight size={20} weight="bold" />
                    </button>
                </div>
            )}
        </div>
    );
}
