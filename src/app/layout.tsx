import type { Metadata } from "next";
import { Inter, Open_Sans, Playfair_Display, Rubik, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

const rubik = Rubik({
    subsets: ["latin"],
    variable: "--font-rubik",
});

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "SYKLI College — Study in Finland in English | Bachelor's & Master's Programmes",
    description: "SYKLI College in Helsinki, Finland. Bachelor's and Master's programmes taught in English in sustainability, technology, business, and arts. Apply now for Autumn 2026.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "EducationalOrganization",
                            "name": "SYKLI College",
                            "url": "https://www.sykli.fi",
                            "logo": "https://www.sykli.fi/logo.png",
                            "sameAs": [
                                "https://www.facebook.com/syklicollege",
                                "https://www.instagram.com/syklicollege",
                                "https://www.linkedin.com/school/syklicollege"
                            ],
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Malmin kauppatie 8",
                                "addressLocality": "Helsinki",
                                "postalCode": "00700",
                                "addressCountry": "FI"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+358-20-4721-739",
                                "contactType": "admissions",
                                "email": "admissions@sykli.fi"
                            }
                        })
                    }}
                />
            </head>
            <body
                className={`${inter.variable} ${inter.className} ${openSans.variable} ${playfair.variable} ${rubik.variable} ${roboto.variable} font-sans antialiased`}
            >
                <Header />
                {children}
                <Footer />
                <CookieConsent />
            </body>
        </html>
    );
}