// user.js (tu módulo Vuex)
const state = {
    usuario: null
  };
  
  const mutations = {
    SET_USUARIO(state, usuario) {
      state.usuario = usuario;
    }
  };
  
  const actions = {
    setUsuario({ commit }, usuario) {
      commit('SET_USUARIO', usuario);
    }
  };
  
  export default {
    state,
    mutations,
    actions
  };
  