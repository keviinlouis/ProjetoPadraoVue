import Vue from 'vue';
import store from '@/store';
import i18n from '@/plugins/i18n';
import VeeValidate, { Validator } from 'vee-validate';
import navigatorLanguage from '@/plugins/navigatorLanguage';

function findLanguage(locales, language) {
  let locale = null;

  locales.keys()
    .forEach((key) => {
      const clearedKey = key.replace('./', '').replace('.js', '').toLowerCase();
      const clearedLanguage = language.replace('-', ' ').toLowerCase();

      const match = clearedLanguage.match(clearedKey.replace('_', ' '));

      if (match !== null) {
        locale = clearedKey;
      }
    });

  if (!locale) {
    return 'pt_BR';
  }

  return locale;
}

function getLocaleAttributes(navigatorLanguage) {
  const locale = require(`@/locales/${navigatorLanguage}.json`);

  return locale.label;
}

const locales = require.context('vee-validate/dist/locale', true, /[A-Za-z0-9-_,\s]+\.js/i);

const localeName = findLanguage(locales, navigatorLanguage);

const localeFile = `./${localeName}.js`;

console.log(`Vee-Validator Lang: ${localeName}`);

const locale = locales(localeFile);

locale.attributes = getLocaleAttributes(navigatorLanguage);

Validator.localize(localeName, locale);

const validCep = value => new Promise((resolve) => {
  store.dispatch('getCep', value).then((response) => {
    if (response.erro) {
      return resolve({
        valid: false,
        data: {
          message: i18n.tc('validations.cep_nao_encontrado'),
        },
      });
    }

    return resolve({
      valid: true,
    });
  });
});

Validator.extend('validCep', {
  validate: validCep,
  getMessage: (field, params, data) => data.message,
});

Vue.use(VeeValidate, { locale: localeName });
