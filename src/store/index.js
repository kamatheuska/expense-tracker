import Vue from 'vue'
import Vuex from 'vuex'
import {
  createExpense,
  fetchExpenses,
  deleteExpense
} from '@/services/expenses'
import {
  expensesStub,
  addExpenseMock,
  deleteExpenseMock,
  editExpenseMock
} from '@/stubs/expenses.stub'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    expenses: [],
    currentExpense: null
  },

  getters: {
    expenses: ({ expenses }) => expenses
  },

  mutations: {
    setExpenses(state, newExpenses) {
      state.expenses = newExpenses
    },

    setCurrentExpense(state, expense) {
      state.currentExpense = expense
    }
  },

  actions: {
    async addExpense({ commit }, expense) {
      const doc = await createExpense(expense, {
        mock: addExpenseMock
      })
      commit('setCurrentExpense', doc)
    },

    async editExpense({ commit }, expense) {
      const doc = await createExpense(expense, {
        mock: editExpenseMock
      })
      commit('setCurrentExpense', doc)
    },

    async removeExpense({ commit }, expense) {
      const doc = await deleteExpense(expense, { mock: deleteExpenseMock })
      commit('setCurrentExpense', doc)
    },

    async getExpenses({ commit }) {
      const docs = await fetchExpenses({
        mock: () => Promise.resolve(expensesStub)
      })
      commit('setExpenses', docs)
    }
  }
})
