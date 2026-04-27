'use client';

import Image from 'next/image';
import { Breadcrumbs } from '@aalto-dx/react-modules';
import { ReactNode } from 'react';

interface HeroImage {
    src?: string;
    alt?: string;
    srcSet?: Array<{
        src: string;
        width: number;
    }>;
}

interface HeroProps {
    title: ReactNode;
    body: ReactNode;
    image?: HeroImage;
    backgroundColor?: string;
    tinted?: boolean;
    lightText?: boolean;
    breadcrumbs?: Array<{ label: string; href?: string }>;
    imagePosition?: string;
    children?: ReactNode;
}

export function Hero({ 
    title, 
    body, 
    image, 
    backgroundColor = '#FFFFFF', 
    tinted = false, 
    lightText = false,
    breadcrumbs,
    imagePosition = 'object-center',
    children 
}: HeroProps) {
    const textColorClass = lightText ? 'text-white' : 'text-black';
    return (
        <>
        <section 
            className="relative overflow-hidden transition-all duration-700 ease-aalto-in-out border-b border-black/5"
            style={{ backgroundColor: backgroundColor }}
        >
            {/* Split Layout Container */}
            <div className="container mx-auto flex flex-col lg:flex-row items-stretch gap-2 lg:gap-16 pt-0 md:pt-12 pb-12 lg:pb-0 h-auto lg:min-h-[600px] relative z-10">
                
                {/* Left Content */}
                <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center pt-2 lg:pt-0 px-4 md:px-0 py-12 lg:py-0">
                    
                    <div className="space-y-4">
                        <div className={`font-bold ${textColorClass} text-4xl md:text-aalto-7 leading-tight md:leading-aalto-7 tracking-aalto-3`}>
                            {title}
                        </div>
                        <div className={`text-aalto-4 ${textColorClass} max-w-xl leading-aalto-2`}>
                            {body}
                        </div>
                    </div>

                    {children && (
                        <div className="flex flex-wrap gap-aalto-p6 pt-aalto-p4">
                            {children}
                        </div>
                    )}
                </div>

                {/* Right Image */}
                <div className="lg:w-1/2 w-full relative z-20 order-first lg:order-none h-[300px] sm:h-[400px] lg:h-auto">
                    <div className="h-full w-full relative">
                        <div className={`relative w-full h-full bg-neutral-100 overflow-hidden ${tinted ? 'after:content-[""] after:absolute after:inset-0 after:bg-black/10 after:mix-blend-multiply' : ''}`}>
                            {image && (
                                <Image
                                    src={image.src || (image.srcSet ? image.srcSet[0].src : '/images/placeholder.jpg')}
                                    alt={image.alt || "Hero Image"}
                                    fill
                                    priority
                                    className={`object-cover ${imagePosition}`}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Decorative background elements if needed for 'Aalto feel' */}
            {tinted && (
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
            )}
        </section>
        
        {/* Mobile Breadcrumbs - Outside the background container */}
        {/* Breadcrumbs Bar - Always under the colored background */}
        {breadcrumbs && (
            <div className="border-b border-neutral-100 bg-white">
                <div className="container mx-auto px-4 py-3">
                    <Breadcrumbs 
                        items={[
                            { icon: 'home', linkComponentProps: { href: '/' } },
                            ...breadcrumbs.map(b => ({
                                label: b.label,
                                linkComponentProps: b.href ? { href: b.href } : undefined
                            }))
                        ]} 
                        className=""
                    />
                </div>
            </div>
        )}
        </>
    );
}

