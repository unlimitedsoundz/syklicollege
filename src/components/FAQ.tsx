'use client';

import { useState, type ReactNode } from 'react';
import { Plus, Minus } from "@phosphor-icons/react/dist/ssr";

export interface FAQItem {
    id: string;
    question: string;
    answer: string | ReactNode;
    order_index: number;
}

interface FAQProps {
    faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqList = faqs || [];

    if (!faqList || faqList.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">No FAQs available yet</p>
            </div>
        );
    }

    // Sort FAQs by order_index
    const sortedFaqs = [...faqList].sort((a, b) => a.order_index - b.order_index);

    return (
        <div className="space-y-0">
            {sortedFaqs.map((faq, index) => (
                <div key={faq.id} className="bg-white mb-2">
                     <button
                         onClick={() => toggle(index)}
                         className="w-full flex items-center justify-between py-5 px-0 text-left hover:opacity-70 transition-opacity focus:outline-none group"
                     >
                         <span className="text-lg font-bold text-black pr-4">{faq.question}</span>
                         <div className="flex-shrink-0">
                             {openIndex === index ? (
                                 <Minus size={20} weight="bold" />
                             ) : (
                                 <Plus size={20} weight="bold" />
                             )}
                         </div>
                     </button>
                     <div
                         className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'opacity-100 py-4' : 'max-h-0 opacity-0'
                             } overflow-hidden`}
                     >
                         <div className="faq-content text-black leading-relaxed px-0 text-left">
                             {typeof faq.answer === 'string' ? (
                                 <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                             ) : (
                                 faq.answer
                             )}
                         </div>
                     </div>
                </div>
            ))}
        </div>
    );
}