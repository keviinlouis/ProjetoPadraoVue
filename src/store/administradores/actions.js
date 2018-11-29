import axios from 'axios';

export default {

    async loadAdministradores({commit, dispatch}, params) {
        const response = await axios.get('administrador', params);

        if (response.isSuccess()) {
            await commit('setAdministradores', response.getData());
        }

        return response;
    },

    async loadAdministrador({commit, dispatch}, id) {
        const response = await axios.get('administrador/' + id);

        if (response.isSuccess()) {
            await commit('setAdministrador', response.getData());
        }

        return response;
    },

    async createAdministrador({commit, dispatch}, data) {
        const response = await axios.post('administrador', data);

        if (response.isSuccess()) {
            await commit('setAdministrador', response.getData());
        }

        return response;
    },

    async updateAdministrador({commit, dispatch}, data) {
        const response = await axios.put('administrador/'+data.id, data);

        if (response.isSuccess()) {
            await commit('setAdministrador', response.getData());
        }

        return response;
    },

    unsetAdministrador({state}) {
        state.administrador = {
            id: 0,
            titulo: '',
            descricao: '',
        };
    },

    async exportar({commit}) {
        const response = await axios({
            url: 'administrador/exportar',
            method: 'GET',
            responseType: 'blob',
        });
        if (response.statusCode > 299) {
            return;
        }
        const url = window.URL.createObjectURL(new Blob([response.response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Expanse - Administradores.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },

};
