'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { formatToDDMMYYYY } from '@/utils/date';
import { CaretLeft, ArrowRight } from "@phosphor-icons/react";
import { notFound } from 'next/navigation';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    imageUrl?: string;
    publishDate: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    tags?: string[];
}

interface BlogDetailClientProps {
    initialBlog: BlogPost;
}

export default function BlogDetailClient({ initialBlog }: BlogDetailClientProps) {
    const [currentBlog, setBlog] = useState<BlogPost>(initialBlog);
    const [otherBlogs, setOtherBlogs] = useState<BlogPost[]>([]);
    const [prevBlog, setPrevBlog] = useState<BlogPost | null>(null);
    const [nextBlog, setNextBlog] = useState<BlogPost | null>(null);

    useEffect(() => {
        async function fetchLatest() {
            const supabase = createClient();
            
            // Fetch latest blog data
            const { data: blogData, error: blogError } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', initialBlog.id)
                .single();

            if (blogData && !blogError) {
                if (blogData.content !== initialBlog.content || blogData.title !== initialBlog.title) {
                    setBlog(blogData as BlogPost);
                }
            }

            // Fetch other blogs for "Keep Reading"
            const { data: otherBlogsData } = await supabase
                .from('blogs')
                .select('*')
                .neq('slug', initialBlog.slug)
                .eq('published', true)
                .order('publishDate', { ascending: false })
                .limit(2);

            setOtherBlogs(otherBlogsData || []);

            // Fetch all published blogs to find prev/next
            const { data: allBlogsData } = await supabase
                .from('blogs')
                .select('*')
                .eq('published', true)
                .order('publishDate', { ascending: false });

            if (allBlogsData) {
                const currentIndex = allBlogsData.findIndex(blog => blog.slug === initialBlog.slug);
                if (currentIndex > 0) {
                    setPrevBlog(allBlogsData[currentIndex - 1]);
                }
                if (currentIndex < allBlogsData.length - 1) {
                    setNextBlog(allBlogsData[currentIndex + 1]);
                }
            }
        }
        fetchLatest();
    }, [initialBlog.id, initialBlog.content, initialBlog.slug]);

    // Sanitize editor output to remove problematic CSS and fix text flow
    const cleanContent = currentBlog.content
        .replace(/&nbsp;/g, " ") // ✅ THIS is the main fix - replace non-breaking spaces
        .replace(/\s+/g, " ")   // normalize spacing
        // remove dangerous word breaking
        .replace(/word-break\s*:\s*break-all;?/gi, "")
        .replace(/overflow-wrap\s*:\s*anywhere;?/gi, "")
        .replace(/white-space\s*:\s*pre-wrap;?/gi, "")
        // remove inline styles from all tags except img and figure (to preserve image resizing)
        .replace(/(<(?!img|figure)[^>]*?)style="[^"]*"/gi, '$1')
        // optional: remove empty paragraphs
        .replace(/<p><\/p>/g, "");

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-yellow-200 text-black">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-32 pb-4 h-auto min-h-[600px] md:pt-48 lg:h-[600px] lg:py-0 relative mb-12">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-2 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight pt-8 lg:pt-24">
                            {currentBlog.title}
                        </h1>
                        <p className="text-[21px] text-black max-w-xl leading-relaxed my-4">
                            {currentBlog.excerpt || 'Read this insightful blog post from Kestora University student ambassadors.'}
                        </p>
                        <p className="text-sm text-gray-700">
                            Published on {new Date(currentBlog.publishDate).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative mt-4 lg:mt-0 lg:translate-y-16 z-20 flex justify-center lg:block">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800 shadow-2xl overflow-hidden">
                                <Image
                                    src={currentBlog.imageUrl || '/images/1775817359452-019d76f5-cb93-7e9a-8515-61a71c69fa56.png'}
                                    alt={currentBlog.title}
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
            <div className="container mx-auto px-4 py-6 max-w-4xl">
                <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
                    <Link
                        href="/"
                        className="text-neutral-500 hover:text-black transition-colors font-medium"
                    >
                        Home
                    </Link>
                    <span className="text-neutral-400">/</span>
                    <Link
                        href="/blog"
                        className="text-neutral-500 hover:text-black transition-colors font-medium"
                    >
                        Blog
                    </Link>
                    <span className="text-neutral-400">/</span>
                    <span className="text-neutral-900 font-medium truncate max-w-xs">
                        {currentBlog.title}
                    </span>
                </nav>

                {/* Alternative: Compact back navigation */}
                <div className="mt-4">
                    <Link href="/blog" className="text-neutral-600 hover:text-black font-semibold inline-flex items-center gap-2 transition-colors group">
                        <CaretLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                        <span className="text-neutral-400">•</span>
                        <span className="text-neutral-500 text-xs capitalize tracking-wide">All Posts</span>
                    </Link>
                </div>


            </div>

            <div className="mx-auto px-8 py-8 md:py-16 max-w-4xl w-full">
                <div className="blog-content">
                    <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
                </div>



                {/* Tags */}
                <div className="mt-12 pt-8 ">
                    <div className="flex flex-wrap gap-2">
                        {(currentBlog.tags && currentBlog.tags.length > 0 ? currentBlog.tags : [
                            'Student Life',
                            'Finland',
                            'University',
                            'Education',
                            'International Students'
                        ]).map((tag, index) => (
                            <Link
                                key={index}
                                href={`/blog?tag=${encodeURIComponent(tag)}`}
                                className="inline-block bg-black text-white text-xs font-medium px-3 py-1 rounded-md uppercase tracking-wide hover:bg-gray-800 transition-colors"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Keep Reading */}
                {otherBlogs && otherBlogs.length > 0 && (
                    <div className="mt-16 pt-10">
                        <h3 className="text-left text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">Keep Reading</h3>
                        <div className="-mx-8 px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                            {otherBlogs.map((blog) => {
                                const displayDate = formatToDDMMYYYY(blog.publishDate);
                                const fallbackImage = "/images/admissions/events.jpg";

                                return (
                                    <Link key={blog.id} href={`/blog/${blog.slug}`} className="group flex flex-col h-full bg-neutral-100 shadow-none">
                                        <div className="aspect-video bg-neutral-200 overflow-hidden mb-4 relative">
                                            <Image
                                                src={blog.imageUrl || fallbackImage}
                                                alt={blog.title}
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
                                        <div className="flex-1 flex flex-col p-5">
                                            <h3 className="text-xl font-bold mb-2 group-hover:underline leading-tight">{blog.title}</h3>
                                            <p className="text-sm text-neutral-600 line-clamp-3 mb-4 flex-1">
                                                {blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').slice(0, 150) + "..."}
                                            </p>
                                            {blog.tags && blog.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {blog.tags.slice(0, 3).map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-block bg-black text-white text-xs px-2 py-1 rounded-full capitalize"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="mt-auto pt-3 flex items-center text-xs text-neutral-500 uppercase tracking-wider">
                                                <span>{displayDate}</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Post Navigation */}
                {(prevBlog || nextBlog) && (
                    <div className="mt-16 pt-10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">More Posts</h3>
                        <div className="flex justify-between items-center">
                            {prevBlog ? (
                                <Link
                                    href={`/blog/${prevBlog.slug}`}
                                    className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors group"
                                >
                                    <CaretLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
                                    <div className="text-left">
                                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">Previous</div>
                                        <div className="text-sm font-semibold line-clamp-1">{prevBlog.title}</div>
                                    </div>
                                </Link>
                            ) : (
                                <div></div>
                            )}
                            {nextBlog ? (
                                <Link
                                    href={`/blog/${nextBlog.slug}`}
                                    className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors group text-right"
                                >
                                    <div className="text-right">
                                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">Next</div>
                                        <div className="text-sm font-semibold line-clamp-1">{nextBlog.title}</div>
                                    </div>
                                    <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                )}

                {/* Related Links */}
                <div className="mt-16 pt-10">
                    <h3 className="text-sm font-bold capitalize tracking-widest text-neutral-900 mb-6">Related Links</h3>
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