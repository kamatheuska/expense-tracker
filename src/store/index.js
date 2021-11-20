import Vue from 'vue'
import Vuex from 'vuex'
import expenses from './modules/expenses.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    expenses
  }
})
