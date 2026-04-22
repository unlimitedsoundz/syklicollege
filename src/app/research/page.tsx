import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
    title: 'Research at Kestora University — Sustainability, Innovation & Technology',
    description: 'Explore research at Kestora University. Funded projects in sustainability, clean technology, design, and social innovation. Publications, labs, and collaboration opportunities.',
    alternates: {
        canonical: 'https://kestora.online/research/',
    },
};

export default function ResearchPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-black text-white overflow-hidden">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr,600px] items-center gap-12 py-12 lg:py-0 lg:h-[650px] relative mb-0">
                    {/* Left Content */}
                    <div className="space-y-8 flex flex-col justify-center h-full">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-[0.02em] uppercase">
                            Research & Creative Exploration
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 max-w-xl leading-relaxed">
                            Where curiosity meets creation, connecting theory with hands-on practice in the heart of Helsinki.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="w-full h-[400px] lg:h-full flex justify-center lg:block order-first lg:order-none opacity-80">
                        <div className="relative w-full h-full bg-neutral-900 border-x border-white/5 overflow-hidden">
                            <Image
                                src="/images/research-hero.jpg"
                                alt="Research"
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 600px"
                            />
                        </div>
                    </div>
                </div>
             </section>

            {/* Intro Grid */}
            <div className="container mx-auto px-4 py-20 md:py-32">
                 <div className="bg-white border-4 border-black p-12 md:p-20 text-black">
                     <h2 className="text-4xl font-black mb-10 uppercase tracking-tighter">Where Curiosity Meets Creation</h2>
                     <div className="prose prose-xl text-black max-w-none font-medium leading-relaxed">
                        <p className="mb-8">
                            At <strong>Kestora University</strong>, research is not locked away in labs or journals — it lives in studios, classrooms, communities, and real-world projects. We explore questions that matter now and ideas that shape what comes next, blending <strong>technology, design, business, science, and culture</strong> into a shared space of experimentation and discovery.
                        </p>
                        <p>
                            Our research culture welcomes both analytical thinkers and creative makers. Whether through data, design, systems, or stories, we believe knowledge grows stronger when disciplines cross paths.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why We Explore */}
            <div className="bg-white py-20 md:py-40">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-12 text-black uppercase tracking-widest border-b-2 border-black pb-6">Core Exploration</h2>
                        <ul className="space-y-6 prose-arrows">
                            {[
                                "Turn curiosity into meaningful action",
                                "Connect theory with hands-on practice",
                                "Support sustainable, ethical, and inclusive futures",
                                "Empower students to challenge norms and create alternatives"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-black font-bold uppercase tracking-widest text-sm">
                                    <ArrowRight size={20} weight="bold" className="shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="bg-black text-white p-12 md:p-16 border-2 border-black relative overflow-hidden">
                         <div className="relative z-10">
                             <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Core Values</h3>
                             <p className="text-white/80 mb-0 text-xl leading-relaxed font-medium">
                                We value <strong>applied research</strong>, <strong>creative inquiry</strong>, and <strong>practice-based exploration</strong> equally because innovation rarely comes from just one way of thinking.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Themes Grid */}
            <div className="bg-white py-20 md:py-40">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mb-20">
                        <h2 className="text-5xl font-black mb-6 text-black uppercase tracking-tighter">Research Focus Areas</h2>
                        <p className="text-2xl text-black leading-tight font-medium">Exploring the radical intersection of technology, humanity, and the global environment.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-black">
                        {[
                            {
                                title: "Code & Culture",
                                desc: "Digitalisation beyond the screen examining how technology interacts with people, culture, ethics, and systems.",
                                tags: ["AI & Data", "Digital Platforms", "Ethics"]
                            },
                            {
                                title: "Smart Materials",
                                desc: "Rethinking materials and systems for sustainability, performance, and longevity.",
                                tags: ["Recyclable", "Energy", "Innovation"]
                            },
                            {
                                title: "Art & Media",
                                desc: "Artistic exploration as a way of knowing, questioning, and communicating.",
                                tags: ["Practice-based", "Visual", "Prototyping"]
                            },
                            {
                                title: "New Work Models",
                                desc: "Exploring how organisations can be more adaptive, ethical, and human-centred.",
                                tags: ["Service Design", "Sustainable", "Leadership"]
                            },
                            {
                                title: "Powering Tomorrow",
                                desc: "Connecting engineering, systems analysis, and environmental responsibility.",
                                tags: ["Renewable", "Smart Infra", "Climate"]
                            },
                            {
                                title: "Integrated Spaces",
                                desc: "How physical and digital spaces can be designed around real human needs.",
                                tags: ["Architecture", "Urban", "Inclusive"]
                            }
                        ].map((theme, i) => (
                             <div key={i} className={`bg-white p-10 border-black ${i % 3 !== 2 ? 'lg:border-r-2' : ''} ${i < 3 ? 'lg:border-b-2' : ''} ${i % 2 !== 1 ? 'md:border-r-2 lg:border-r-0' : ''} ${i < 4 ? 'md:border-b-2 lg:border-b-0' : ''} transition-all hover:bg-black hover:text-white group`}>
                                 <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 group-hover:text-white transition-colors">{theme.title}</h3>
                                 <p className="text-black group-hover:text-white/80 mb-8 leading-relaxed font-medium">{theme.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {theme.tags.map(tag => (
                                        <span key={tag} className="px-4 py-1 border-2 border-current text-[10px] font-black uppercase tracking-[0.2em]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How We Think */}
            <div className="py-16 md:py-32 bg-black text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-black mb-20 uppercase tracking-tighter text-center">Experimental Framework</h2>
                    <div className="grid md:grid-cols-4 gap-0 border-2 border-white/20">
                        {[
                            { title: "Collaborative", text: "Crossing departments and disciplines" },
                            { title: "Hands-on", text: "Grounded in making and iteration" },
                            { title: "Open-minded", text: "Welcoming radical questions" },
                            { title: "Ethical", text: "Guided by integrity" }
                        ].map((way, i) => (
                            <div key={i} className={`p-10 bg-black border-white/20 ${i < 3 ? 'md:border-r-2' : ''} flex flex-col justify-between group hover:bg-white hover:text-black transition-all cursor-default`}>
                                <h3 className="text-xl font-black uppercase tracking-tighter mb-4">{way.title}</h3>
                                <p className="text-white/60 group-hover:text-black/60 text-sm font-bold uppercase tracking-widest leading-relaxed">{way.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Outcomes & Ethics */}
            <div className="container mx-auto px-4 py-20 md:py-32">
                <div className="grid md:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-4xl font-black mb-10 uppercase tracking-tighter">Tangible Impact</h2>
                        <ul className="space-y-4 mb-12 prose-arrows">
                            {[
                                "Publications and policy insights",
                                "Prototypes and digital tools",
                                "Exhibitions and performances",
                                "Sustainable business frameworks",
                                "Global community projects"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-black font-bold uppercase tracking-widest text-sm">
                                    <ArrowRight size={18} weight="bold" className="text-black" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-white border-4 border-black p-10">
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Focus on Future</h3>
                            <p className="text-black font-medium leading-relaxed">Not just academically, but socially, culturally, and environmentally. Our work helps shape futures that are thoughtful, creative, and radically sustainable.</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl font-black mb-10 uppercase tracking-tighter">Ethics & Integrity</h2>
                        <p className="text-xl text-black mb-10 leading-relaxed font-medium">
                            All research and creative activity at Kestora University follows clear ethical guidelines and quality standards. Integrity, transparency, and accountability are central to how we work.
                        </p>
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Support Infrastructure</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-2 border-black">
                             {["Interdisciplinary labs", "Industry partnerships", "Global networks", "Research platforms"].map((item, idx) => (
                                 <div key={item} className={`p-8 bg-white border-black ${idx % 2 === 0 ? 'sm:border-r-2' : ''} ${idx < 2 ? 'border-b-2' : ''} text-sm font-black uppercase tracking-widest flex items-center gap-4`}>
                                     <div className="w-2 h-2 bg-black"></div>
                                     {item}
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-black py-20 md:py-40 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter">Manifest Your Research</h2>
                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                        Students and staff are invited to actively engage in exploration. At Kestora University, research is not just something you study — <strong>it’s something you do</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/research/projects" className="bg-white text-black px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-all">
                            Explore Projects
                        </Link>
                        <Link href="/contact" className="border-2 border-white text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                            Connect With Team
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
