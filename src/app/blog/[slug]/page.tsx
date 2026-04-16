import { redirect } from 'next/navigation';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    redirect(`https://ourblogs.kestora.online/${slug}`);
}