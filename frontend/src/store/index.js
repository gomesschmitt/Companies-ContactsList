import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: null,
    userRole: null,
  },
  mutations: {
    setAuthToken(state, { token, role }) {
      state.authToken = token;
      state.userRole = role;
    },
    clearAuthToken(state) {
      state.authToken = null;
      state.userRole = null;
    },
  },
  actions: {
    setAuthToken({ commit }, { token, role }) {
      commit('setAuthToken', { token, role });
    },
    clearAuthToken({ commit }) {
      commit('clearAuthToken');
    },
  },
  getters: {
    authToken: (state) => state.authToken,
    userRole: (state) => state.userRole,
  },
});
