// import '@babel/polyfill';

import Vue from 'vue';

import '@/plugins/axios';
import '@/plugins/vuetify';
import '@/plugins/vee-validator';
import '@/plugins/mixins';
import i18n from '@/plugins/i18n';

import App from '@/App.vue';

import router from '@/router';
import store from '@/store';

import '@/registerServiceWorker';
import '@/main.styl';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

