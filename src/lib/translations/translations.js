import i18n from 'sveltekit-i18n';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
    loaders: [
        {
            locale: 'et',
            key: '',
            loader: async () => (await import('./et.json')).default,
        },
    ],
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);