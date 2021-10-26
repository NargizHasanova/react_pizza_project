import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationAZ from './locales/az/translationAZ.json';
import translationRU from './locales/ru/translationRU.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            az: {
                translation: translationAZ
            },
            ru: {
                translation: translationRU
            }
        },
        lng: 'en', //burda ne yazsaq o dilde cixir
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;