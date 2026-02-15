interface Dictionary {
    [key: string]: string;
}

const dictionaries: { [key: string]: () => Promise<Dictionary> } = {
    en: () => Promise.resolve({
        welcome: 'Welcome to the Internationalization Demo',
        description: 'This page demonstrates how we can support multiple languages (English and Finnish) using Next.js App Router.',
        switchLanguage: 'Switch Language',
        currentLanguage: 'Current Language',
        backHome: 'Back to Home'
    }),
    fi: () => Promise.resolve({
        welcome: 'Tervetuloa kansainvälistymis-demoon',
        description: 'Tämä sivu demonstroi, kuinka voimme tukea useita kieliä (englantia ja suomea) käyttämällä Next.js App Routeria.',
        switchLanguage: 'Vaihda kieltä',
        currentLanguage: 'Nykyinen kieli',
        backHome: 'Takaisin etusivulle'
    }),
};

export const getDictionary = async (locale: string) => {
    // Fallback to 'en' if locale is not found
    const fn = dictionaries[locale] || dictionaries['en'];
    return fn();
};
