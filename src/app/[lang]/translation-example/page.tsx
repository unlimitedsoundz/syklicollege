import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';
import { Globe } from '@phosphor-icons/react/dist/ssr';

export default async function TranslationExamplePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = await getDictionary(lang);

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
            <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl border border-neutral-100 text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe size={32} weight="duotone" />
                </div>

                <h1 className="text-3xl font-bold text-neutral-900 mb-4">{t.welcome}</h1>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                    {t.description}
                </p>

                <div className="bg-neutral-50 p-4 rounded-xl mb-8 border border-neutral-100 inline-block">
                    <span className="text-xs font-black uppercase tracking-wider text-neutral-400 block mb-1">{t.currentLanguage}</span>
                    <span className="text-xl font-bold text-black uppercase">{lang}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/en/translation-example"
                        className={`px-6 py-3 rounded-full font-bold transition-all ${lang === 'en' ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'}`}
                    >
                        English
                    </Link>
                    <Link
                        href="/fi/translation-example"
                        className={`px-6 py-3 rounded-full font-bold transition-all ${lang === 'fi' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-blue-600 hover:text-blue-600'}`}
                    >
                        Suomi
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-100">
                    <Link href="/" className="text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors uppercase tracking-widest">
                        ← {t.backHome}
                    </Link>
                </div>
            </div>
        </div>
    );
}
