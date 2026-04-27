import * as React from "react";
import Image from "next/image";
import { Button, Link } from "@aalto-dx/react-components";
import { ArrowRight, CaretRight as ChevronRight, CaretLeft as ChevronLeft } from "@phosphor-icons/react/dist/ssr";
import { Hero } from "@/components/layout/Hero";
import { createStaticClient } from "@/lib/supabase/static";
import { formatToDDMMYYYY } from '@/utils/date';
import { Metadata } from "next";
import DynamicNewsSection from "@/components/news/DynamicNewsSection";
import { Highlight } from "@/components/ui/Highlight";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://kestora.online/',
  },
};

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kestora University",
            "alternateName": "Kestora University Helsinki",
            "url": "https://kestora.online"
          })
        }}
      />

      {/* HERO SECTION */}
      <Hero
        title="Welcome to Kestora"
        body="Kestora University is an independent higher education institution based in Helsinki, Finland, offering internationally focused Bachelor’s and Master’s degree programmes taught in English."
        backgroundColor="#392d56"
        tinted
        lightText={true}
        image={{
          src: "/images/kestora hero.png",
          alt: "Student studying at Kestora University campus in Finland"
        }}
        imagePosition="object-center"
      >
        <div className="pt-4">
          <Button
            href="/admissions"
            type="link-white"
            label="Start your application"
            size="none"
            className="text-aalto-3"
            icon={<ArrowRight size={20} weight="bold" />}
          />
        </div>
      </Hero>

      {/* 2. SCHOOLS GRID */}
      <section className="py-24 container mx-auto px-4">
        <h2 className="text-aalto-5 font-bold mb-aalto-p6 text-black tracking-tight">Discover our campuses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "Arts & Design", href: "/schools/arts", img: "/images/school-arts.png", desc: "Creative excellence and professional practice." },
            { name: "Business", href: "/schools/business", img: "/images/school-business.png", desc: "Innovative leadership and entrepreneurship." },
            { name: "Technology", href: "/schools/technology", img: "/images/school-technology.png", desc: "Advanced engineering and smart-city solutions." },
            { name: "Science", href: "/schools/science", img: "/images/school-science.png", desc: "Applied research and transformative innovation." },
          ].map((school) => (
            <Link 
              key={school.name} 
              linkComponentProps={{ href: school.href }}
              className="group flex bg-card hover:bg-neutral-100 transition-all h-[200px] overflow-hidden border border-neutral-100"
            >
              <div className="flex-1 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold group-hover:underline leading-tight">School of {school.name}</h3>
              </div>
              <div className="w-1/3 relative">
                <Image src={school.img} alt={school.name} fill className="object-cover object-top" sizes="33vw" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. NEWS SECTION */}
      <section className="pb-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-aalto-5 font-bold mb-4 tracking-tight">Limelight</h2>
            <p className="text-aalto-3 font-medium text-neutral-600">Latest news and stories from Kestora University.</p>
          </div>
          <Button
            href="/news"
            type="link"
            label="All news"
            size="none"
            className="hidden md:flex text-xs uppercase tracking-widest"
            icon={<ArrowRight size={20} weight="bold" />}
          />
        </div>

        <DynamicNewsSection limit={3} contentType="news" />
      </section>

      {/* 3.5. HIGHLIGHT QUOTE */}
      <section className="pb-24 container mx-auto px-4">
        <Highlight
          body="My decision to move to Finland and study at Kestora has been one of the best decisions of my life. The community here is truly international and supportive."
          source="Elena, Student Ambassador"
          alignment="left"
        />
        <div className="flex justify-start">
          <Button
            href="/student-guide/chat-with-kestora-students"
            type="primary"
            label="Chat with our students"
            icon={<ArrowRight size={20} weight="bold" />}
          />
        </div>
      </section>

      {/* 3.6. EVENTS SECTION */}
      <section className="pb-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-aalto-5 font-bold mb-4 tracking-tight">Upcoming Events</h2>
            <p className="text-aalto-3 font-medium text-neutral-600">Join our webinars and campus tours.</p>
          </div>
          <Button
            href="/news"
            type="link"
            label="All events"
            size="none"
            className="hidden md:flex text-xs uppercase tracking-widest"
            icon={<ArrowRight size={20} weight="bold" />}
          />
        </div>

        <DynamicNewsSection limit={3} contentType="event" />
      </section>

      {/* 4. CAMPUS SECTION */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square overflow-hidden border border-neutral-200">
              <Image
                src="/images/campus-welcome-v2.png"
                alt="Kestora campus"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-aalto-6 font-bold tracking-tight text-black">Welcome to our campus</h2>
            <p className="text-aalto-3 text-black leading-aalto-3 font-medium">
              Are you hosting a group or organizing a visit? Our campus in Helsinki is a vibrant hub of learning and innovation.
            </p>
            <p className="text-aalto-3 text-black font-medium leading-relaxed">
              We welcome prospective students to learn more about studying in Finland through guided visits and consultations.
            </p>
            <Button
              href="/contact"
              type="primary"
              label="Book a visit"
              icon={<ArrowRight size={20} weight="bold" />}
            />
          </div>
        </div>
      </section>

      {/* 5. CTA BAR */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="max-w-2xl">
            <h2 className="text-aalto-6 font-bold tracking-tight">
              Study at Kestora University
            </h2>
            <p className="text-neutral-400 text-aalto-2 mt-4 font-medium max-w-xl">
              Join a community of innovators in the heart of Helsinki. Offering English-taught degree programmes across four specialized schools.
            </p>
          </div>

          <div className="flex flex-col gap-6 w-full md:w-auto">
            {[
              { label: "Study at Kestora", href: "/studies" },
              { label: "Open positions", href: "/careers" },
              { label: "Contact us", href: "/contact" }
            ].map((item) => (
              <Link 
                key={item.label} 
                linkComponentProps={{ href: item.href }}
                className="flex justify-between items-center gap-12 group border-b border-neutral-800 pb-4"
              >
                <span className="font-bold text-xl group-hover:underline">{item.label}</span>
                <ArrowRight size={24} weight="bold" className="transform group-hover:translate-x-2 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

