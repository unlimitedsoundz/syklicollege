import { Metadata } from 'next';
import { createStaticClient } from '@/lib/supabase/static';
import Link from 'next/link';
import Image from 'next/image';
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
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
}

export async function generateStaticParams() {
    const supabase = createStaticClient();
    const { data: blogs } = await supabase.from('Blog').select('slug');
    return blogs?.map(({ slug }) => ({ slug })) || [];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const supabase = createStaticClient();
    const { data: blog } = await supabase
        .from('Blog')
        .select('title, excerpt')
        .eq('slug', params.slug)
        .eq('published', true)
        .single();

    if (!blog) {
        return {
            title: 'Blog Post Not Found',
        };
    }

    return {
        title: blog.title,
        description: blog.excerpt || 'Read this blog post from Kestora University',
        openGraph: {
            title: blog.title,
            description: blog.excerpt || 'Read this blog post from Kestora University',
            type: 'article',
        },
    };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
    // Temporary test: return simple content
    return (
        <div className="min-h-screen bg-white p-8">
            <h1>Blog Post: {params.slug}</h1>
            <p>This is a test page for the blog post.</p>
            <Link href="/blog" className="text-blue-600 underline">Back to Blog</Link>
        </div>
    );
}