'use client';

import { createElement, useEffect, useState, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';

interface DbPageContentProps {
    pageSlug: string;
    sectionKey: string;
    fallbackContent: string;
    className?: string;
    tagName?: keyof JSX.IntrinsicElements;
    style?: React.CSSProperties;
}

export default function DbPageContent({
    pageSlug,
    sectionKey,
    fallbackContent,
    className,
    tagName = 'div',
    style,
}: DbPageContentProps) {
    const [content, setContent] = useState(fallbackContent);

    const supabase = useMemo(() => typeof window !== 'undefined' ? createClient() : null, []);

    useEffect(() => {
        if (!supabase) return;
        let mounted = true;

        async function loadPageContent() {
            try {
                const { data, error } = await supabase!
                    .from('page_content')
                    .select('content')
                    .eq('page_slug', pageSlug)
                    .eq('section_key', sectionKey)
                    .single();

                if (!error && data?.content && mounted) {
                    setContent(data.content);
                }
            } catch (err) {
                console.error('Failed to load page content:', err);
            }
        }

        loadPageContent();

        return () => {
            mounted = false;
        };
    }, [pageSlug, sectionKey, supabase]);

    return createElement(tagName, {
        className: `${className || ''} ck-content`,
        style,
        dangerouslySetInnerHTML: { __html: content },
    });
}
