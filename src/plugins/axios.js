import axios from 'axios';

import i18n from '@/plugins/i18n';

import Response from '@/classes';

import { loadProgressBar } from 'axios-progress-bar';

import 'axios-progress-bar/dist/nprogress.css';

import store from '@/store';

import navigatorLanguage from '@/plugins/navigatorLanguage';

loadProgressBar();

function makeResponse(data) {
  if (data.response) {
    data = data.response;
  }

  if (data.message === 'Network Error') {
    store.dispatch('setToast', { text: i18n.tc('toast.erro_conexao') });
  }
  return new Response(data);
}

axios.defaults.baseURL = process.env.VUE_APP_URL_BASE + process.env.VUE_APP_URL_RESOURCE;

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(process.env.VUE_APP_TOKEN_JWT)}`;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Accept-Language'] = navigatorLanguage;
axios.defaults.headers.common['app-version'] = process.env.VUE_APP_VERSION;
axios.defaults.headers.common['device-uuid'] = localStorage.getItem(process.env.VUE_APP_TOKEN_UUID);

axios.interceptors.request.use((request) => {
  if (!navigator.onLine) {
    store.dispatch('setToast', { text: i18n.tc('toast.erro_conexao') });
    return false;
  }
  return request;
});

axios.interceptors.response.use(data => Promise.resolve(makeResponse(data)), makeResponse);
