'use client';

import { useEffect, useState, useMemo, type ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import FAQ, { type FAQItem } from '@/components/FAQ';

interface DbFAQProps {
    pageSlug: string;
    fallbackFaqs?: FAQItem[];
    refreshKey?: string | number;
}

export default function DbFAQ({ pageSlug, fallbackFaqs, refreshKey }: DbFAQProps) {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const supabase = useMemo(() => typeof window !== 'undefined' ? createClient() : null, []);

    useEffect(() => {
        if (!supabase) return;
        let mounted = true;

        async function loadFaqs() {
            setLoading(true);
            setError(null);

            try {
                const { data: pageData, error: pageError } = await supabase!
                    .from('faq_pages')
                    .select('id')
                    .eq('slug', pageSlug)
                    .single();

                console.log('DbFAQ: Looking up page for slug', pageSlug, 'result:', pageData, 'error:', pageError);

                if (pageError || !pageData) {
                    console.warn('FAQ page not found for slug:', pageSlug, pageError);
                    if (mounted) {
                        setFaqs([]);
                    }
                    return;
                }

                const { data: faqData, error: faqError } = await supabase
                    .from('faq')
                    .select('id, question, answer, order_index')
                    .eq('page_id', pageData.id)
                    .eq('is_published', true)
                    .order('order_index');

                console.log('DbFAQ: Fetched FAQs for page', pageSlug, 'page_id:', pageData.id, 'faqs:', faqData);

                if (faqError) {
                    if (mounted) {
                        setError('Unable to load FAQ entries.');
                        setFaqs([]);
                    }
                    return;
                }

                if (mounted) {
                    setFaqs(faqData || []);
                }
            } catch (loadError) {
                console.error('Failed to load FAQs:', loadError);
                if (mounted) {
                    setError('Unable to load FAQs.');
                    setFaqs([]);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadFaqs();

        return () => {
            mounted = false;
        };
    }, [pageSlug, refreshKey]);

    const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs || [];

    if (loading) {
        return (
            <div className="bg-white p-8 text-center text-gray-500">
                Loading FAQs...
            </div>
        );
    }

    if (error && displayFaqs.length === 0) {
        return (
            <div className="bg-white p-8 text-center text-red-600">
                {error}
            </div>
        );
    }

    return <FAQ faqs={displayFaqs} />;
}
