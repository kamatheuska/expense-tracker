import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      user: null
    }
  },

  getters: {
    user: ({ auth }) => auth.user
  },

  mutations: {
    setUser({ auth }, user) {
      auth.user = user
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    }
  }
})
