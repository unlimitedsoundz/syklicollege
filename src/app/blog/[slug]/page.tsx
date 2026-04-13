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
    const supabase = createStaticClient();
    const { data: blog, error } = await supabase
        .from('Blog')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single();

    if (error || !blog) {
        notFound();
    }

    const post = blog as BlogPost;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Image */}
            <div className="h-[50vh] min-h-[400px] relative overflow-hidden bg-neutral-900">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                <Image
                    src={post.imageUrl || '/images/admissions/events.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-5xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight pt-8">{post.title}</h1>
                    <p className="text-neutral-300 text-lg">{new Date(post.publishDate).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 max-w-3xl">
                <Link href="/blog" className="text-neutral-500 hover:text-black font-bold uppercase tracking-wider text-sm inline-flex items-center gap-2 transition-colors">
                    <CaretLeft size={16} weight="bold" /> Back to Blog
                </Link>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl">
                <div className="prose prose-lg prose-emerald mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />

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