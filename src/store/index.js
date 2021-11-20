import Vue from 'vue'
import Vuex from 'vuex'
import { createExpense, fetchExpenses } from '../services/expenses'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      user: null
    },
    expenses: [],
    currentExpense: null
  },

  getters: {
    user: ({ auth }) => auth.user,
    expenses: ({ expenses }) => expenses
  },

  mutations: {
    setUser(state, user) {
      state.auth.user = user
    },

    setExpenses(state, newExpenses) {
      state.expenses = newExpenses
    },

    setCurrentExpense(state, expense) {
      state.currentExpense = expense
    }
  },

  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },

    async addExpense({ commit }, expense) {
      const doc = await createExpense(expense)
      commit('setCurrentExpense', doc)
    },

    async getExpenses({ commit }) {
      const docs = await fetchExpenses()
      commit('setExpenses', docs)
    }
  }
})
