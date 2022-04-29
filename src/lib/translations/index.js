import i18n from 'sveltekit-i18n';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
    translations: {
        en: { lang },
        cs: { lang },
        et: { lang },
    },
    loaders: [
        {
            locale: 'en',
            key: '',
            loader: async () => (await import('./en.json')).default,
        },

        {
            locale: 'cs',
            key: '',
            loader: async () => (await import('./cs.json')).default,
        },
        {
            locale: 'et',
            key: '',
            loader: async () => (await import('./et.json')).default,
        },
    ],
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);
