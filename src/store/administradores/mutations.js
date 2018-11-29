export default {
  setAdministradores(state, administradores) {
    state.administradores = administradores;
  },
  setAdministrador(state, administrador) {
    state.administrador = administrador;
  },
  setAdministradorOnList(state, administrador){
    const index = state.administradores.indexOf((item) => administrador.id === item.id);

    state.administradores.splice(index-1, 1, administrador);
  }
}
