import { Metadata } from 'next';
import { createStaticClient } from '@/lib/supabase/static';
import { notFound } from 'next/navigation';
import BlogDetailClient from '@/components/blog/BlogDetailClient';

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




export async function generateStaticParams() {
    const supabase = createStaticClient();
    const { data: blogs } = await supabase
        .from("blogs")
        .select("slug");
    return blogs?.map(({ slug }) => ({ slug })) || [];
}

export const dynamicParams = false;

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const supabase = createStaticClient();

    const { data: blog, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("DB Error:", error);
        throw new Error("Failed to fetch blog");
    }

    if (!blog) {
        notFound();
    }

    const post = blog as BlogPost;

    return <BlogDetailClient initialBlog={post} />;
}