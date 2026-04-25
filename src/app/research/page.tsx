import { Hero } from '@/components/layout/Hero';
import { Link } from "@aalto-dx/react-components";
import Image from 'next/image';
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { TagGroup } from '@/components/ui/TagGroup';
import { LiftupCollection } from '@aalto-dx/react-modules';

export const metadata = {
    title: 'Research at Kestora University — Sustainability, Innovation & Technology',
    description: 'Explore research at Kestora University. Funded projects in sustainability, clean technology, design, and social innovation. Publications, labs, and collaboration opportunities.',
    alternates: {
        canonical: 'https://kestora.online/research/',
    },
};

export default function ResearchPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <Hero
                title="Research & Creative Exploration"
                body="Where curiosity meets creation, connecting theory with hands-on practice in the heart of Helsinki."
                backgroundColor="#3f581f"
                tinted
                lightText={true}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Research' }
                ]}
                image={{
                    src: "/images/research-hero.jpg",
                    alt: "Research & Creative Exploration"
                }}
            />

            {/* Intro Grid */}
            <div className="container mx-auto px-4 py-20 md:py-32">
                 <div className="bg-white p-12 md:p-20 text-black shadow-sm">
                     <h2 className="text-4xl font-semibold mb-10 uppercase tracking-tighter">Where Curiosity Meets Creation</h2>
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
                        <h2 className="text-4xl font-semibold mb-12 text-black uppercase tracking-tighter">Core Exploration</h2>
                        <ul className="space-y-6 prose-arrows">
                            {[
                                "Turn curiosity into meaningful action",
                                "Connect theory with hands-on practice",
                                "Support sustainable, ethical, and inclusive futures",
                                "Empower students to challenge norms and create alternatives"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-black font-bold uppercase tracking-widest text-sm">
                                    <div className="w-2 h-2 bg-black shrink-0"></div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="bg-neutral-100 text-black p-12 md:p-16 border-none relative overflow-hidden">
                         <div className="relative z-10">
                             <h3 className="text-3xl font-semibold uppercase tracking-tighter mb-6">Core Values</h3>
                             <p className="text-black/80 mb-0 text-xl leading-relaxed font-medium">
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
                        <h2 className="text-5xl font-semibold mb-6 text-black uppercase tracking-tighter">Research Focus Areas</h2>
                        <p className="text-2xl text-black leading-tight font-medium">Exploring the radical intersection of technology, humanity, and the global environment.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                             <div key={i} className={`bg-neutral-50 p-10 transition-all hover:bg-black hover:text-white group shadow-sm`}>
                                 <h3 className="text-2xl font-semibold uppercase tracking-tighter mb-6 group-hover:text-white transition-colors">{theme.title}</h3>
                                 <p className="text-black group-hover:text-white/80 mb-8 leading-relaxed font-medium">{theme.desc}</p>
                                <TagGroup tags={theme.tags.map(tag => ({ label: tag }))} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Research - Liftup Collection */}
            <div className="bg-white py-20 md:py-40 border-t border-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-semibold mb-20 text-black uppercase tracking-tighter text-center">Featured Explorations</h2>
                    <LiftupCollection
                        tilesPerRow={3}
                        tiles={[
                            {
                                image: { src: "/images/research/liftup-0.jpg", alt: "Liftup 0" },
                                title: "Integrated Systems Research",
                                body: "Exploring the boundary between physical infrastructure and digital twins. Our research into integrated systems aims to create more resilient urban environments through data-driven design and real-time monitoring.",
                                cta: {
                                    label: "View Project Details",
                                    linkComponentProps: { href: "/research/projects/integrated-systems" },
                                },
                                icon: "chevron-right",
                            },
                            {
                                image: { src: "/images/research/liftup-1.jpg", alt: "Liftup 1" },
                                title: "Future Materials Lab",
                                body: "Developing biodegradable alternatives to structural polymers. This project combines synthetic biology with architectural engineering to grow the next generation of building materials.",
                                cta: {
                                    label: "Download Whitepaper",
                                    linkComponentProps: { href: "/research/materials-whitepaper", target: "_blank" },
                                },
                                icon: "arrow-download",
                            },
                            {
                                image: { src: "/images/research/liftup-2.jpg", alt: "Liftup 2" },
                                title: "Ethical AI Frameworks",
                                body: "Defining human-centric AI governance for creative industries. We are building the tools that ensure artificial intelligence serves human creativity without compromising individual integrity.",
                                cta: {
                                    label: "Join the Discussion",
                                    linkComponentProps: { href: "/research/ai-ethics" },
                                },
                                type: "button",
                                icon: "chevron-right",
                            },
                            {
                                image: { src: "/images/research/liftup-3.jpg", alt: "Liftup 3" },
                                title: "Urban Biodiversity",
                                body: "Mapping the intersection of urban density and ecological health. This project uses satellite imagery and ground sensors to design cityscapes that actively support local flora and fauna.",
                                cta: {
                                    label: "Explore Map",
                                    linkComponentProps: { href: "/research/urban-bio" },
                                },
                                icon: "chevron-right",
                            },
                            {
                                image: { src: "/images/research/liftup-4.jpg", alt: "Liftup 4" },
                                title: "Circular Economy Models",
                                body: "Rethinking the lifecycle of consumer electronics. Our team is developing modular hardware standards that enable 100% component recovery and secondary market utility.",
                                cta: {
                                    label: "Learn More",
                                    linkComponentProps: { href: "/research/circular" },
                                },
                                icon: "chevron-right",
                            },
                            {
                                image: { src: "/images/research/liftup-5.jpg", alt: "Liftup 5" },
                                title: "Social Innovation Lab",
                                body: "Prototyping community-led housing solutions in Helsinki. We connect architectural students with local residents to design living spaces that foster collective well-being and affordability.",
                                cta: {
                                    label: "Read Case Study",
                                    linkComponentProps: { href: "/research/social-lab" },
                                },
                                icon: "chevron-right",
                            },
                        ]}
                    />
                </div>
            </div>

            {/* How We Think */}
            <div className="py-16 md:py-32 bg-black text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold mb-20 uppercase tracking-tighter text-center">Experimental Framework</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Collaborative", text: "Crossing departments and disciplines" },
                            { title: "Hands-on", text: "Grounded in making and iteration" },
                            { title: "Open-minded", text: "Welcoming radical questions" },
                            { title: "Ethical", text: "Guided by integrity" }
                        ].map((way, i) => (
                            <div key={i} className={`p-10 bg-white/5 flex flex-col justify-between group hover:bg-white hover:text-black transition-all cursor-default shadow-sm`}>
                                <h3 className="text-xl font-semibold uppercase tracking-tighter mb-4">{way.title}</h3>
                                <p className="text-white/60 group-hover:text-black/60 text-sm font-medium uppercase tracking-widest leading-relaxed">{way.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Outcomes & Ethics */}
            <div className="container mx-auto px-4 py-20 md:py-32">
                <div className="grid md:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-4xl font-semibold mb-10 uppercase tracking-tighter">Tangible Impact</h2>
                        <ul className="space-y-4 mb-12 prose-arrows">
                            {[
                                "Publications and policy insights",
                                "Prototypes and digital tools",
                                "Exhibitions and performances",
                                "Sustainable business frameworks",
                                "Global community projects"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-black font-bold uppercase tracking-widest text-sm">
                                    <div className="w-2 h-2 bg-black shrink-0"></div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-neutral-50 p-10 shadow-sm">
                            <h3 className="text-2xl font-semibold uppercase tracking-tighter mb-4">Focus on Future</h3>
                            <p className="text-black font-medium leading-relaxed">Not just academically, but socially, culturally, and environmentally. Our work helps shape futures that are thoughtful, creative, and radically sustainable.</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl font-semibold mb-10 uppercase tracking-tighter">Ethics & Integrity</h2>
                        <p className="text-xl text-black mb-10 leading-relaxed font-medium">
                            All research and creative activity at Kestora University follows clear ethical guidelines and quality standards. Integrity, transparency, and accountability are central to how we work.
                        </p>
                        <h3 className="text-2xl font-semibold uppercase tracking-tighter mb-6">Support Infrastructure</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             {["Interdisciplinary labs", "Industry partnerships", "Global networks", "Research platforms"].map((item, idx) => (
                                 <div key={item} className={`p-8 bg-neutral-50 text-sm font-medium uppercase tracking-widest flex items-center gap-4`}>
                                     <div className="w-2 h-2 bg-black"></div>
                                     {item}
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-neutral-100 py-20 md:py-40 text-center text-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl md:text-7xl font-semibold mb-10 uppercase tracking-tighter">Manifest Your Research</h2>
                    <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                        Students and staff are invited to actively engage in exploration. At Kestora University, research is not just something you study — <strong>it’s something you do</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/research/projects" className="bg-black text-white px-12 py-5 font-medium uppercase tracking-widest text-sm hover:bg-neutral-800 transition-all">
                            Explore Projects
                        </Link>
                        <Link href="/contact" className="bg-white text-black px-12 py-5 font-medium uppercase tracking-widest text-sm hover:opacity-70 transition-all">
                            Connect With Team
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
