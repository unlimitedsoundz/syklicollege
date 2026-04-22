
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Globe, Users, BookOpen, Briefcase, GraduationCap, Calendar, MapPin } from '@phosphor-icons/react/dist/ssr';
import GuideSidebarLayout from '@/components/layout/StudentGuideLayout';

export const metadata = {
    title: 'Kandidaattiohjelmat (Suomi ja Ruotsi) | Kestora University',
    description: 'Hae Kestora Universityn suomen- ja ruotsinkielisiin kandidaattiohjelmiin. Tietoa hyödyistä, opintopoluista, apurahoista ja valinnoista.',
    alternates: {
        canonical: 'https://kestora.online/admissions/bachelor-fi/',
        languages: {
            'en': 'https://kestora.online/admissions/bachelor/',
            'fi': 'https://kestora.online/admissions/bachelor-fi/',
        },
    },
};

const sections = [
    { id: 'benefits', title: 'Miksi Valita Meidät', content: '' },
    { id: 'progression', title: 'Kandista Maisteriksi', content: '' },
    { id: 'scholarships', title: 'Apurahat & Maksut', content: '' },
    { id: 'admissions', title: 'Hakutiedot', content: '' },
    { id: 'events', title: 'Tapahtumat', content: '' },
    { id: 'more', title: 'Lue Lisää', content: '' },
];

export default function BachelorAdmissionsFiPage() {
    return (
        <GuideSidebarLayout sections={sections}>
            <div className="min-h-screen bg-white">
            {/* HERO SECTION (Split Layout) */}
            <section className="bg-[#FFE600] text-black overflow-hidden">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 pt-12 pb-12 lg:pb-0 h-auto lg:h-[600px] lg:py-0 relative mb-0">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 flex flex-col justify-center h-full pt-0 lg:pt-0">
                        <h1 className="font-bold leading-[1.1] tracking-tight pt-8 text-black" style={{ fontSize: '40px' }}>
                            Hae suomen- ja ruotsinkielisiin ohjelmiin
                        </h1>
                        <p className="text-[21px] text-black max-w-xl leading-relaxed">
                            Aloita matkasi Kestora Universityssa ja hanki taidot, kansainvälinen näkökulma ja verkostot menestyäksesi maailmanlaajuisesti.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/admissions/application-process" className="text-lg font-bold underline underline-offset-8 decoration-black hover:opacity-70 transition-colors text-black inline-flex items-center gap-2">
                                Aloita haku <ArrowRight size={20} weight="bold" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 h-full w-full relative lg:translate-y-16 z-20 flex justify-center lg:block order-first lg:order-none">
                        <div className="h-full">
                            <div className="relative w-[368px] h-[368px] lg:w-full lg:h-full bg-neutral-800">
                                <Image
                                    src="/images/admissions/hero.jpg"
                                    alt="Bachelor's Students"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 368px, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-12 space-y-8 md:space-y-24">

                        {/* How You Benefit */}
                        <section id="benefits" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black">
                                Miten hyödyt ohjelmistamme
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-6 text-lg text-black">
                                    <ul className="space-y-4">
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span><strong>Korkealaatuinen Koulutus:</strong> Teoriaa ja käytäntöä laskentatoimessa, rahoituksessa, taloustieteessä, johtamisessa, markkinoinnissa ja tietojärjestelmätieteessä.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span><strong>Kansainvälinen Näkökulma:</strong> Kurssit valmistavat globaaleille urille.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span><strong>Käytännön Kokemus:</strong> Todellisia tapaustutkimuksia, simulaatioita ja harjoitteluita.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span><strong>Henkilökohtainen Tuki:</strong> Pienet ryhmäkoot ja tiivis vuorovaikutus tiedekunnan kanssa.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-neutral-100 h-80 overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-black">
                                        <Image src="/images/admissions/benefits.jpg" alt="Hyödyt Kestora Universityssa opiskelusta" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* From Bachelor's to Master's */}
                        <section id="progression" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black">
                                Kandidaatista Maisteriksi
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                                <div className="bg-neutral-100 h-80 overflow-hidden relative order-last md:order-first">
                                    <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-black">
                                        <Image src="/images/admissions/progression.jpg" alt="Polku Maisteriksi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                </div>
                                <div className="space-y-6 text-lg text-black">
                                    <p>Kandidaatin tutkinnon suorittaminen Kestora Universityssa avaa saumattoman tien jatko-opintoihin:</p>
                                    <ul className="space-y-3">
                                        <li className="flex gap-4 items-start"><ArrowRight size={20} weight="bold" className="mt-1 text-black shrink-0" /> <span><strong>Sisäinen Jatkoväylä:</strong> Suora polku Kestoran maisteriohjelmiin.</span></li>
                                        <li className="flex gap-4 items-start"><ArrowRight size={20} weight="bold" className="mt-1 text-black shrink-0" /> <span><strong>Erikoistumislinjat:</strong> Keskity laskentatoimeen, taloustieteeseen tai johtamiseen.</span></li>
                                        <li className="flex gap-4 items-start"><ArrowRight size={20} weight="bold" className="mt-1 text-black shrink-0" /> <span><strong>Kansainväliset Mahdollisuudet:</strong> Hae huippuyliopistoihin ympäri maailmaa.</span></li>
                                        <li className="flex gap-4 items-start"><ArrowRight size={20} weight="bold" className="mt-1 text-black shrink-0" /> <span><strong>Tutkimusintegraatio:</strong> Kandidaatintutkielma askeleena kohti syvällisempää tutkimusta.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>

            {/* YELLOW QUOTE BANNER */}
            <div className="w-full bg-neutral-100 text-black py-16 my-12">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h3 className="text-2xl md:text-3xl leading-tight mb-6 font-bold">
                        "Annamme opiskelijoille analyyttiset taidot ja globaalin ajattelutavan, joita tarvitaan monimutkaisessa taloudellisessa päätöksenteossa."
                    </h3>
                    <p className="text-sm font-bold uppercase tracking-widest">— Opiskelijavalintojen Dekaani</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-3"></div>

                    <div className="lg:col-span-12 space-y-24">
                        {/* Scholarships */}
                        <section id="scholarships" className="scroll-mt-32 grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <h2 className="text-3xl font-bold mb-6 text-black">
                                    Apurahat ja Lukukausimaksut
                                </h2>
                                <div className="space-y-4 text-lg text-black">
                                    <div className="p-8 pl-16 bg-neutral-50 border-l-4 border-black">
                                        <strong>Lukukausimaksu:</strong> Sisältyy tutkintomaksuun päätoimisille opiskelijoille.
                                    </div>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span><strong>Ansioihin perustuva:</strong> Poikkeuksellisesta opintomenestyksestä.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span><strong>Tarveharkintainen:</strong> Taloudellinen tuki kelpoisille opiskelijoille.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span><strong>Kansainvälinen:</strong> Ansio- ja tarveharkintainen tuki globaaleille kyvyille.</span>
                                        </li>
                                    </ul>
                                    <Link href="/admissions/tuition" className="text-black font-bold hover:underline inline-block mt-2">Katso tarkemmat apurahatietoa →</Link>
                                </div>
                            </div>
                            <div className="w-full lg:h-full order-1 md:order-2 relative h-[250px] md:h-full min-h-[250px] md:min-h-[300px]">
                                <Image
                                    src="/images/admissions/scholarships.jpg"
                                    alt="Apurahat"
                                    fill
                                    className="object-cover shadow-lg"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </section>

                        {/* Admissions Info */}
                        <section id="admissions" className="scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8 text-black">
                                Tietoa Opiskelijavalinnoista
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="bg-white p-8 shadow-xl border border-neutral-100">
                                    <h3 className="text-xl font-bold mb-8 text-black pl-2">Hakukelpoisuus</h3>
                                    <ul className="space-y-4 text-black">
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span>Ylioppilastutkinto tai vastaava</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span>Englannin kielen taito (IELTS/TOEFL tai englannin kielen arvosana C tai parempi) (jos sovellettavissa)</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span>Vahva matematiikan osaaminen ja relevantti tausta</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white p-8 shadow-xl border border-neutral-100">
                                    <h3 className="text-xl font-bold mb-8 text-black pl-2">Valintaperusteet</h3>
                                    <ul className="space-y-4 text-black">
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span>Akateeminen menestys</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span>Motivaatio ja henkilökohtainen lausunto</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-black shrink-0 mt-1" />
                                            <span>Johtajuus ja harrastustoiminta</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Fairs & Events */}
                        <section id="events" className="scroll-mt-32 bg-black text-white p-12 relative overflow-hidden">
                            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-3xl font-bold mb-6 text-white">
                                        Messut ja Tapahtumat
                                    </h2>
                                    <ul className="space-y-4 text-white">
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-white shrink-0 mt-1" />
                                            <span><strong>Avoimet Ovet:</strong> Tutustu kampukseen ja tapaa tiedekuntaa.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-white shrink-0 mt-1" />
                                            <span><strong>Virtuaaliset Infotilaisuudet:</strong> Webinaareja hakuun liittyen.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <ArrowRight size={20} weight="bold" className="text-white shrink-0 mt-1" />
                                            <span><strong>Koulutusmessut:</strong> Tapaa meidät omassa kaupungissasi.</span>
                                        </li>
                                    </ul>
                                    <div className="mt-8">
                                        <Link href="/news" className="bg-white text-black px-8 py-4 font-bold hover:bg-neutral-100 transition-colors inline-block border border-black shadow-lg">Katso Tulevat Tapahtumat</Link>
                                    </div>
                                </div>
                                <div className="w-full relative h-[250px] md:h-80 mt-8 md:mt-0">
                                    <Image
                                        src="/images/admissions/events.jpg"
                                        alt="Messut ja Tapahtumat"
                                        fill
                                        className="shadow-2xl object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Learn More */}
                        <section id="more" className="scroll-mt-32 text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8">Lue Lisää Kestora Universityssa Opiskelusta</h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-left">
                                <div className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors group">
                                    <h4 className="font-bold mb-1">Moderni Kampus</h4>
                                    <p className="text-xs text-neutral-500">Huippuluokan tilat</p>
                                </div>
                                <div className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors group">
                                    <h4 className="font-bold mb-1">Tuki</h4>
                                    <p className="text-xs text-neutral-500">Ohjaus ja neuvonta</p>
                                </div>
                                <div className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors group">
                                    <h4 className="font-bold mb-1">Yhteisö</h4>
                                    <p className="text-xs text-neutral-500">Globaali verkosto</p>
                                </div>
                                <div className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors group">
                                    <h4 className="font-bold mb-1">Urat</h4>
                                    <p className="text-xs text-neutral-500">Harjoittelut ja mentorointi</p>
                                </div>
                                <div className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors group">
                                    <h4 className="font-bold mb-1">Opiskelijaelämä</h4>
                                    <p className="text-xs text-neutral-500">Kerhot ja urheilu</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
        </GuideSidebarLayout>
    );
}
