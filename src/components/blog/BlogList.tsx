'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { formatToDDMMYYYY } from '@/utils/date';
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function BlogList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;
    const searchParams = useSearchParams();
    const tag = searchParams.get('tag');

    useEffect(() => {
        async function fetchPosts() {
            const supabase = createClient();

            let query = supabase
                .from('blogs')
                .select('*')
                .eq('published', true)
                .order('publishDate', { ascending: false });

            if (tag) {
                query = query.contains('tags', tag);
            }

            const { data: blogData } = await query;

            setPosts(blogData || []);
            setLoading(false);
        }

        fetchPosts();
        setCurrentPage(1);
    }, [tag]);

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

    if (loading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {Array.from({ length: 9 }).map((_, i) => (
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
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post: any) => {
                    const href = `/blog/${post.slug}`;
                    const displayDate = formatToDDMMYYYY(post.publishDate);
                    const fallbackImage = "/images/admissions/events.jpg";

                    return (
                        <Link
                            href={href}
                            key={post.id}
                            className="flex flex-col bg-neutral-100 overflow-hidden group hover:bg-neutral-200 transition-colors h-full"
                        >
                            <div className="aspect-[16/9] relative overflow-hidden bg-neutral-200">
                                <Image
                                    src={post.imageUrl || fallbackImage}
                                    alt={post.title}
                                    fill
                                    unoptimized
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-black text-white">
                                        Blog
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-3">
                                    <span>{displayDate}</span>
                                </div>

                                <h2 className="text-xl font-bold mb-3 text-neutral-900 group-hover:underline leading-tight">
                                    {post.title}
                                </h2>

                            <p className="text-neutral-600 text-sm line-clamp-3 mb-4 flex-1">
                                {post.excerpt || post.content?.replace(/<[^>]*>/g, '').slice(0, 150)}...
                            </p>

                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {post.tags.slice(0, 3).map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-block bg-black text-white text-xs px-2 py-1 rounded-full capitalize"
                                        >
                                            {tag}
                                        </span>
                                    ))}
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

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <CaretLeft size={16} />
                        Previous
                    </button>

                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-2 border transition-colors ${
                                    currentPage === page
                                        ? 'bg-black text-white border-black'
                                        : 'border-neutral-300 hover:bg-neutral-50'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                        <CaretRight size={16} />
                    </button>
                </div>
            )}
        </>
    );
}