import axios from 'axios';

export default {

  async loadCategorias({ commit, dispatch }, params) {
    const response = await axios.get('categoria', params);

    if (response.isSuccess()) {
      await commit('setCategorias', response.getData());
    }

    return response;
  },

  async loadCategoria({ commit, dispatch }, id) {
    const response = await axios.get('categoria/' + id);

    if (response.isSuccess()) {
      await commit('setCategoria', response.getData());
    }

    return response;
  },

  async createCategoria({ commit, dispatch }, data) {
    const response = await axios.post('categoria', data);

    if (response.isSuccess()) {
      await commit('setCategoria', response.getData());
    }

    return response;
  },

  async updateCategoria({ commit, dispatch }, data) {
    const response = await axios.put('categoria/' + data.id, data);

    if (response.isSuccess()) {
      await commit('setCategoria', response.getData());
    }

    return response;
  },

  unsetCategoria({ state }) {
    state.categoria = {
      id: 0,
      titulo: '',
      descricao: '',
    };
  },

  async sendSubcategoria({ commit, dispatch }, data) {
    if(data.id === 0){
      return await axios.post('subcategoria', data);
    }
    return await axios.put('subcategoria/' + data.id, data);
  },

  async deleteSubcategoria({ commit, dispatch }, id) {
    return await axios.delete('subcategoria/' + id);
  },

  async exportar({ commit }) {
    const response = await axios({
      url: 'categoria/exportar',
      method: 'GET',
      responseType: 'blob',
    });
    if (response.statusCode > 299) {
      return;
    }
    const url = window.URL.createObjectURL(new Blob([response.response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Expanse - Categorias.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

};
