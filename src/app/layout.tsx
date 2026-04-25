import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { AuthProvider } from "@/components/auth/AuthProvider";

// next/font/google is disabled because build-time font fetching fails in this environment.
// We use a standard Google Fonts link in the <head> instead.
const inter = { variable: "font-inter-var" };
const playfair = { variable: "font-playfair-var" };




export const metadata: Metadata = {
    metadataBase: new URL('https://kestora.online'),
    title: {
        default: "Kestora University Helsinki | English-Taught Degrees in Finland",
        template: "%s | Kestora University"
    },
    description: "Kestora University Helsinki is an independent higher education institution in Finland offering English-taught degree programs for international students.",
    applicationName: "Kestora University",
    appleWebApp: {
        title: "Kestora University",
        statusBarStyle: "default",
        capable: true,
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' }
        ],
        apple: [
            { url: '/favicon.ico', sizes: '180x180', type: 'image/x-icon' }
        ]
    },

    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://kestora.online',
        siteName: 'Kestora University',
        title: 'Kestora University Helsinki | English-Taught Degrees in Finland',
        description: 'Kestora University Helsinki is an independent higher education institution in Finland offering English-taught degree programs for international students.',
        images: [
            {
                url: '/logo-kestora.png',
                width: 800,
                height: 600,
                alt: 'Kestora University Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kestora University Helsinki | English-Taught Degrees in Finland',
        description: 'Kestora University Helsinki is an independent higher education institution in Finland offering English-taught degree programs for international students.',
        images: ['/logo-kestora.png'],
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400..900&family=Rubik:wght@300..900&display=swap" rel="stylesheet" />
                <style dangerouslySetInnerHTML={{ __html: `
                    :root {
                        --font-inter: 'Inter', sans-serif;
                        --font-playfair: 'Playfair Display', serif;
                    }
                ` }} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "UniversityOrUniversity",
                            "name": "Kestora University",
                            "description": "Kestora University is an independent higher education institution in Helsinki, Finland offering English-taught degree programs for international students.",
                            "alternateName": "Kestora University Helsinki",
                            "url": "https://www.kestora.online",
                            "logo": "https://www.kestora.online/logo-kestora.png",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Kestora University – Helsinki Campus, Pohjoisesplanadi 51",
                                "addressLocality": "Helsinki",
                                "postalCode": "00150",
                                "addressRegion": "Uusimaa",
                                "addressCountry": "FI"
                            },
                            "location": {
                                "@type": "Place",
                                "name": "Helsinki, Finland"
                            },
                            "sameAs": [
                                "https://www.linkedin.com/company/kestora-university"
                            ],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+358-20-4721-739",
                                "contactType": "admissions",
                                "email": "admissions@kestora.online"
                            }
                        })
                    }}
                />
            </head>

            <body className="font-sans antialiased">
                <AuthProvider>
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Footer />
                    <CookieConsent />
                </AuthProvider>
            </body>
        </html>
    );
}
