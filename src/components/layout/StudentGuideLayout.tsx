'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import TableOfContents from '@/components/course/TableOfContents';

interface Props {
  sections: any[];
  children: React.ReactNode;
}

export default function GuideSidebarLayout({ sections, children }: Props) {
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    // Default open on desktop
    if (window.innerWidth >= 1024) {
      setTocOpen(true);
    }
  }, []);

  return (
    <div className="relative">
      {/* Sidebar */}
      <aside className={`fixed top-[80px] left-0 w-64 bg-black text-white h-[calc(100vh-80px)] transition-transform duration-300 ease-in-out z-40 ${tocOpen ? 'translate-x-0' : '-translate-x-full'} ${tocOpen ? 'lg:block' : 'lg:hidden'}`}>
        <TableOfContents sections={sections} />
      </aside>

      {/* Toggle Button */}
      <div className={`fixed top-[80px] transition-all duration-300 ease-in-out z-50 ${tocOpen ? 'left-64' : 'left-0'}`}>
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="bg-black text-white px-4 py-3 rounded shadow-lg hover:bg-gray-800 font-bold flex items-center justify-center"
        >
          {tocOpen ? <ArrowLeft size={20} weight="bold" /> : <ArrowRight size={20} weight="bold" />}
        </button>
      </div>

      {/* Main Content */}
      <main className={`transition-all duration-300 ease-in-out ${tocOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        {children}
      </main>
    </div>
  );
}