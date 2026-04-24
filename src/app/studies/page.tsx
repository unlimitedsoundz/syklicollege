
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: 'Study at Kestora University — Bachelor, Master & Lifelong Learning',
    description: 'Find your study path at Kestora University. Explore our Bachelor\'s and Master\'s degree programmes, professional continuing education, and open studies.',
    alternates: {
        canonical: 'https://kestora.online/studies/',
    },
};

import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

export default function StudiesPage() {
    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={[
                { name: 'Home', item: '/' },
                { name: 'Studies', item: '/studies' }
            ]} />
            {/* Hero */}
            <section className="bg-black text-white pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden relative border-b border-white/10">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
                        Study at Kestora University
                    </h1>
                    <p className="text-xl md:text-2xl text-white max-w-2xl leading-relaxed mb-12">
                        From undergraduate degrees to executive education, we offer diverse paths for learners at every stage of their journey.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/admissions" className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                            Apply Now
                        </Link>
                        <Link href="#programmes" className="bg-white/10 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/20 transition-colors border border-white/20">
                            Explore Programmes
                        </Link>
                    </div>
                </div>
                {/* Abstract bg element */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-800 to-transparent opacity-20 -skew-x-12 translate-x-1/4" />
            </section>

            <div id="programmes" className="container mx-auto px-0 md:px-4 py-12 md:py-32">
                <div className="grid md:grid-cols-2 gap-4 md:gap-12">
                    {/* Bachelor's */}
                    <div className="group relative bg-black overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[500px]">
                        <div className="absolute inset-0">
                            <Image
                                src="/images/bachelors-group-v2.png"
                                alt="Bachelor's"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Bachelor's Degrees</h2>
                            <p className="text-white/80 mb-8 text-lg max-w-md leading-relaxed">
                                Build a strong foundation in sustainability, business, design, or technology. Our undergraduate programmes combine theory with real-world practice.
                            </p>
                             <Link href="/admissions/bachelor" className="inline-flex items-center gap-3 font-bold uppercase tracking-[0.2em] hover:gap-5 transition-all text-sm">
                                 View Bachelor's Programmes <ArrowRight size={20} weight="bold" className="align-middle" />
                             </Link>
                        </div>
                    </div>

                    {/* Master's */}
                    <div className="group relative bg-black overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[500px]">
                        <div className="absolute inset-0">
                            <Image
                                src="/images/admissions/master_hero_refined.jpg"
                                alt="Master's"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Master's Degrees</h2>
                            <p className="text-white/80 mb-8 text-lg max-w-md leading-relaxed">
                                Deepen your expertise and lead the change. Our graduate programmes are designed for professionals and ambitious researchers.
                            </p>
                             <Link href="/admissions/master" className="inline-flex items-center gap-3 font-bold uppercase tracking-[0.2em] hover:gap-5 transition-all text-sm">
                                 View Master's Programmes <ArrowRight size={20} weight="bold" className="align-middle" />
                             </Link>
                        </div>
                    </div>
                </div>

                {/* Additional Study Options */}
                <div className="mt-32">
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center uppercase tracking-widest">More Ways to Learn</h2>
                    <div className="grid md:grid-cols-3 gap-0 border border-neutral-100">
                        {[
                            { title: "Lifelong Learning", desc: "Short courses and professional development modules.", link: "/admissions#lifelong" },
                            { title: "Open University", desc: "Flexible studies open to everyone, regardless of background.", link: "/admissions#online-opportunities" },
                            { title: "Summer School", desc: "Intensive summer courses in Helsinki.", link: "/admissions#summer" }
                        ].map((item, i) => (
                            <Link href={item.link} key={i} className={`bg-white p-10 hover:bg-black hover:text-white transition-all group ${i !== 2 ? 'border-b md:border-b-0 md:border-r border-neutral-100' : ''}`}>
                                <h3 className="text-xl font-bold mb-6 uppercase tracking-wider">{item.title}</h3>
                                <p className="text-black group-hover:text-white/80 mb-8 leading-relaxed">{item.desc}</p>
                                 <span className="font-bold text-sm uppercase tracking-widest flex items-center gap-3">
                                     Learn more <ArrowRight size={18} weight="bold" className="align-middle" />
                                 </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
