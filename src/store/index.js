import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "http://127.0.0.1:8000",
    loginData : {},
  },
  mutations: {

    LOGOUT_USER() {
      localStorage.removeItem('loginData');
    },
    
  },
  actions: {
    logout({commit}) {
      commit('LOGOUT_USER');
    },

  },
  modules: {
  },
  getters: {
    getBaseUrl: state => {
      return state.baseUrl
    },
  }
})
