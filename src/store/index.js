import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import usuarios from './usuarios';
import notificacoes from './notificacoes';
import administradores from './administradores';
import axios from 'axios';

Vue.use(Vuex);

function removeCommonHeaders() {
  delete axios.defaults.headers.common.Authorization;
}

function addCommonHeaders() {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(process.env.VUE_APP_TOKEN_JWT)}`;
}

export default new Vuex.Store({
  modules: {
    auth,
    usuarios,
    notificacoes,
    administradores,
  },
  state: {
    page: {
      title: ''
    },
    toast: {
      text: '',
      show: false,
      timeout: 3000,
      bottom: true,
      top: false,
      right: true,
      left: false,
    },
  },
  mutations: {},
  getters: {
    getTitlePage(state) { return state.page.title },
    getToast(state) { return state.toast; },
  },
  actions: {
    setTitlePage(store, title){
      this.state.page.title = title;
    },
    setToast({ commit }, toast) {
      this.state.toast.text = toast.text;
      this.state.toast.show = true;
    },
    closeToast({ commit }) {
      this.state.toast.show = false;
    },
  },
});
