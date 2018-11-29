import axios from 'axios';

export default {

  async loadUsuarios({ commit, dispatch }, params) {
    const response = await axios.get('usuario', params);

    if (response.isSuccess()) {
      await commit('setUsuarios', response.getData());
    }

    return response;
  },

  async loadUsuario({ commit, dispatch }, id) {
    const response = await axios.get('usuario/'+id);

    if (response.isSuccess()) {
      await commit('setUsuario', response.getData());
    }

    return response;
  },

  async updateUsuario({ commit, dispatch }, {id, data}) {
    const response = await axios.put('usuario/'+id, data);

    if (response.isSuccess()) {
      await commit('setUsuario', response.getData());
    }

    return response;
  },

  async exportar({ commit }) {
    const response = await axios({
      url: 'usuario/exportar',
      method: 'GET',
      responseType: 'blob',
    });
    if(response.statusCode > 299){
      return;
    }
    const url = window.URL.createObjectURL(new Blob([response.response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Expanse - Usuarios.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

};
