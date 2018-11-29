import axios from 'axios';

export default {

  async loadNotificacoes({ commit, dispatch }, params) {
    const response = await axios.get('notificacao', params);

    if (response.isSuccess()) {
      await commit('setNotificacoes', response.getData());
    }

    return response;
  },

  async loadNotificacao({ commit, dispatch }, id) {
    const response = await axios.get('notificacao/' + id);

    if (response.isSuccess()) {
      await commit('setNotificacao', response.getData());
    }

    return response;
  },

  async createNotificacao({ commit, dispatch }, data) {
    const response = await axios.post('notificacao', data);

    if (response.isSuccess()) {
      await commit('setNotificacao', response.getData());
    }

    return response;
  },

  unsetNotificacao({ state }) {
    state.notificacao = {
      id: 0,
      titulo: '',
      descricao: '',
    };
  },

  async exportar({ commit }) {
    const response = await axios({
      url: 'notificacao/exportar',
      method: 'GET',
      responseType: 'blob',
    });
    if (response.statusCode > 299) {
      return;
    }
    const url = window.URL.createObjectURL(new Blob([response.response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Expanse - Notificacoes.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

};
