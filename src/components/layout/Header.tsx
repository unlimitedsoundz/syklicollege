
"use client"

import * as React from "react"
import { Link } from "@aalto-dx/react-components"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/Logo"
import { LanguageSelector } from "@/components/ui/LanguageSelector"
import { CaretDown, List, X, Plus, Minus, MagnifyingGlass as SearchIcon } from "@phosphor-icons/react"
import { Search } from "./Search"

type NavItem = {
    name: string
    href: string
    children?: { name: string; href: string }[]
    sections?: {
        title: string
        items: { name: string; href: string }[]
    }[]
}

const navigation: NavItem[] = [
    {
        name: "Kestora",
        href: "#",
        children: [
            { name: "Student Guide", href: "/student-guide" },
            { name: "International Students", href: "/student-guide/international" },
            { name: "Chat with Students", href: "/student-guide/chat-with-kestora-students" },
            { name: "Housing for students", href: "/student-guide/housing-for-students" },
            { name: "Arrival Guide", href: "/student-guide/arrival" },
            { name: "Exchange Guide", href: "/student-guide/exchange" },
            { name: "Kestora Student Ambassadors", href: "https://ourblogs.kestora.online/" },
            { name: "News and Events", href: "/news" },
            { name: "Academic Calendar", href: "/student-guide#calendar" },
            { name: "Support Services", href: "/student-guide#support" },
            { name: "Careers", href: "/careers" },
            { name: "Alumni", href: "/alumni" },
            { name: "Contact", href: "/contact" },
        ]
    },
    {
        name: "Schools",
        href: "/schools",
        sections: [
            {
                title: "Schools",
                items: [
                    { name: "School of Arts", href: "/schools/arts" },
                    { name: "School of Business", href: "/schools/business" },
                    { name: "School of Science", href: "/schools/science" },
                    { name: "School of Technology", href: "/schools/technology" },
                ]
            },
            {
                title: "Departments",
                items: [
                    { name: "Accounting & Business Law", href: "/schools/business/accounting-business-law" },
                    { name: "Applied Physics & Mathematics", href: "/schools/science/physics-math" },
                    { name: "Architecture", href: "/schools/arts/architecture" },
                    { name: "Art and Media", href: "/schools/arts/art-media" },
                    { name: "Chemical & Metallurgical Engineering", href: "/schools/science/chemical-materials" },
                    { name: "Civil & Environmental Engineering", href: "/schools/technology/civil-environmental" },
                    { name: "Computer Science", href: "/schools/science/computer-science-digital" },
                    { name: "Design", href: "/schools/arts/design" },
                    { name: "Economics", href: "/schools/business/economics" },
                    { name: "Electrical Engineering & Automation", href: "/schools/technology/automation-control" },
                    { name: "Energy & Mechanical Engineering", href: "/schools/technology/energy-mechanical" },
                    { name: "Film, Television and Scenography", href: "/schools/arts/film-tv" },
                    { name: "Finance", href: "/schools/business/finance" },
                    { name: "Industrial Engineering & Management", href: "/schools/business/entrepreneurship-digital" },
                    { name: "Information & Service Management", href: "/schools/business/info-service" },
                    { name: "Management Studies", href: "/schools/business/management" },
                    { name: "Marketing", href: "/schools/business/marketing" },
                    { name: "Physics and Math", href: "/schools/science/physics-math" },
                ]
            }
        ]
    },
    {
        name: "Admissions",
        href: "/admissions",
        children: [
            { name: "Bachelor's Admission (EN)", href: "/admissions/bachelor" },
            { name: "Bachelor's Admission (FI & SV)", href: "/admissions/bachelor-fi" },
            { name: "Master's Admissions", href: "/admissions/master" },
            { name: "How to Apply", href: "/admissions/application-process" },

            { name: "Scholarships & Tuition Fees", href: "/admissions/tuition" },
            { name: "Admission Services Contact Information", href: "/admissions/contact-information" },
        ]
    },
    {
        name: "Research",
        href: "/research",
        children: [
            { name: "Research Hub", href: "/research" },
            { name: "Projects", href: "/research/projects" },
            { name: "Publications", href: "/research/publications" },
        ]
    },
    { name: "Student Life", href: "/student-life" },
    { name: "About", href: "/about-kestora-university" },
]

export function Header() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [expandedMobileSections, setExpandedMobileSections] = React.useState<Record<string, boolean>>({})
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)


    const isAdmissionsPage = false // Removed orange header logic
    const isPortalOrAdmin = pathname.startsWith('/portal') || pathname.startsWith('/admin')

    if (isPortalOrAdmin) return null;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isAdmissionsPage ? 'bg-[#fd6402]' : 'bg-white shadow-sm'}`}
        >
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Logo
                    className={`h-14 md:h-16 ${isAdmissionsPage ? 'text-white' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-4">
                    {navigation.map((item) => (
                        <div
                            key={item.name}
                            className="relative group h-20 flex items-center"
                            onMouseEnter={() => setOpenDropdown(item.name)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className={`text-sm font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${isAdmissionsPage ? 'hover:text-white' : 'hover:opacity-70'} ${pathname.startsWith(item.href) ? "text-primary" : "text-[#2d2d2d]"
                                    }`}
                            >
                                {item.name}
                                {(item.children || item.sections) && <CaretDown size={14} weight="regular" />}
                            </Link>

                            {/* Standard Dropdown */}
                            {item.children && (
                                <div className={`absolute top-20 left-0 w-64 shadow-xl hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-200 ${isAdmissionsPage ? 'bg-[#fd6402]' : 'bg-white'}`}>
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.name}
                                            href={child.href}
                                            className="block px-6 py-4 text-base font-medium text-[#2d2d2d] hover:bg-black/5"
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Mega Dropdown for Sections */}
                            {item.sections && (
                                <div className={`absolute top-20 left-0 w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl hidden group-hover:block p-0 animate-in fade-in slide-in-from-top-1 duration-200 ${isAdmissionsPage ? 'bg-[#fd6402]' : 'bg-white'}`}>
                                    <div className="flex flex-col">
                                        {item.sections.map((section, idx) => (
                                            <div key={section.title}>
                                                <div className="bg-neutral-50 px-6 py-3 font-bold uppercase text-base tracking-wider text-black sticky top-0">
                                                    {section.title}
                                                </div>
                                                <div className={`p-2 grid ${section.title === 'Departments' ? 'grid-cols-2' : 'grid-cols-1'} gap-x-4`}>
                                                    {section.items.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="block px-4 py-2 text-base text-[#2d2d2d] hover:underline hover:bg-neutral-50 rounded-sm"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    <Search />
                    <div className="flex items-center gap-4 pl-6">
                        <LanguageSelector />
                        <Link href="/admissions/application-process" className="bg-black text-white w-[150px] h-[60px] flex items-center justify-center rounded-full text-xs font-bold tracking-wider hover:bg-neutral-800 transition-colors">
                            Apply to Kestora
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle & Search */}
                <div className="lg:hidden flex items-center gap-2">
                    <Search />
                    <button
                        className="p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} weight="regular" /> : <List size={24} weight="regular" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 right-0 bg-white h-[calc(100vh-5rem)] overflow-y-auto">
                    <div className="flex flex-col pb-20">
                        {navigation.map((item) => (
                            <div key={item.name}>
                                <Link
                                    href={item.href}
                                    className="block text-xl font-bold uppercase p-4 text-[#2d2d2d] hover:bg-neutral-50"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                                {item.children && (
                                    <div className="bg-neutral-50 pl-6">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className="block py-4 pr-6 text-base font-medium text-[#2d2d2d]"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {item.sections && (
                                    <div className="bg-neutral-50">
                                        {item.sections.map((section) => {
                                            const isOpen = expandedMobileSections[section.title];
                                            return (
                                                <div key={section.title}>
                                                    <button
                                                        onClick={() => setExpandedMobileSections(prev => ({ ...prev, [section.title]: !prev[section.title] }))}
                                                        className="w-full text-left px-4 py-3 text-base font-bold uppercase text-[#2d2d2d] mt-2 flex items-center justify-between hover:bg-neutral-100"
                                                    >
                                                        {section.title}
                                                        {isOpen ? <Minus size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
                                                    </button>
                                                    {isOpen && (
                                                        <div className="animate-in slide-in-from-top-1 duration-200">
                                                            {section.items.map((subItem) => (
                                                                <Link
                                                                    key={subItem.name}
                                                                    href={subItem.href}
                                                                    className="block py-3 px-6 pl-8 text-base font-medium text-[#2d2d2d] hover:bg-neutral-100"
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Mobile Language Selector */}
                        <div>
                            <button
                                onClick={() => setExpandedMobileSections(prev => ({ ...prev, language: !prev.language }))}
                                className="w-full text-left px-4 py-4 text-xl font-bold uppercase text-[#2d2d2d] flex items-center justify-between hover:bg-neutral-50"
                            >
                                Language
                                {expandedMobileSections.language ? <Minus size={20} weight="bold" /> : <Plus size={20} weight="bold" />}
                            </button>
                            {expandedMobileSections.language && (
                                <div className="animate-in slide-in-from-top-1 duration-200">
                                    <LanguageSelector mobile />
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <Link href="/admissions/application-process" className="flex w-[150px] h-[60px] items-center justify-center bg-black text-white font-bold hover:bg-neutral-800" onClick={() => setIsMobileMenuOpen(false)}>
                                Apply to Kestora
                            </Link>
                        </div>
                    </div>
                </div>
            )
            }
        </header >
    )
}
