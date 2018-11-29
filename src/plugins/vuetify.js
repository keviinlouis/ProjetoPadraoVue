import Vue from 'vue';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import navigatorLanguage from '@/plugins/navigatorLanguage';

function findLanguage(locales, language) {
  let locale = null;

  locales.keys()
    .forEach((key) => {
      const clearedKey = key.replace('./', '').replace('.ts', '').toLowerCase();
      const clearedLanguage = language.replace('-', ' ').toLowerCase();

      const match = clearedLanguage.match(clearedKey.replace('_', ' '));
      if (match !== null) {
        locale = clearedKey;
      }
    });

  if (!locale) {
    return 'pt';
  }

  return locale;
}

const locales = require.context('vuetify/src/locale', true, /[A-Za-z0-9-_,\s]+\.ts/i);

const localeName = findLanguage(locales, navigatorLanguage);

const localeFile = `./${localeName}.ts`;

const locale = locales(localeFile).default;

console.log(`Vuetify Lang: ${localeName}`);

Vue.use(Vuetify, {
  lang: {
    current: localeName,
    locales: { [localeName]: locale },
  },
  theme: {
    default: '#d4d4d4',
    primary: '#e5b122',
    dark: '#1d2d3c',
    secondary: '#255ea9',
    accent: '#7ed321',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});
