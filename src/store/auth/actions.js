import axios from 'axios';

export default {
  setToken(state, token) {
    localStorage.setItem(process.env.VUE_APP_TOKEN_JWT, token);
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(process.env.VUE_APP_TOKEN_JWT)}`;
  },

  setTokens(state, { jwt, deviceUuid }) {
    localStorage.setItem(process.env.VUE_APP_TOKEN_JWT, jwt);

    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(process.env.VUE_APP_TOKEN_JWT)}`;
  },

  async me({ commit }) {
    const response = await axios.get('me');
    if (response.isSuccess()) {
      commit('setUser', response.getData());
    }

    return response;
  },

  async updatePerfil({ commit, state }, user) {
    const response = await axios.put('/me', user);
    if (response.isSuccess()) {
      commit('setUser', response.getData());
    }

    return response;
  },

  async login({ commit, dispatch }, data) {
    const response = await axios.post('login', data);

    if (response.isSuccess()) {
      await dispatch('setToken', response.getToken());

      await commit('setUser', response.getData());
    }

    return response;
  },

  logout({ commit }) {
    commit('unsetUser');

    localStorage.removeItem(process.env.VUE_APP_TOKEN_JWT);
  },

  async emailRedefinirSenha(store, data) {
    return await axios.post('redefinir-senha', data);
  },

  async redefinirSenha(store, data) {
    return await axios.post(`redefinir-senha/${data.token}`, data);
  },
};
