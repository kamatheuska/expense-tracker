<template>
  <div class="expenses">
    <v-container>
      <v-row>
        <v-col cols="12">
          <add-expense-dialog
            v-model="isExpenseDialogOpen"
            :expense="currentExpense"
            @submitted="onExpenseSubmit"
            :isEdit="!!currentExpense"
          />
          <expenses-table
            :fetched="fetched"
            :error-message="errorMessage"
            :expenses="expenses"
            @editExpense="openExpenseDialog"
          />
        </v-col>
        <v-col> </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AddExpenseDialog from '@/components/AddExpenseDialog'
import ExpensesTable from '@/components/ExpensesTable'

export default {
  name: 'ExpensesView',
  async mounted() {
    try {
      await this.getExpenses()
      this.fetched = true
    } catch (error) {
      console.error(error)
      this.fetched = true
      this.errorMessage = 'No hay gastos'
    }
  },

  components: {
    AddExpenseDialog,
    ExpensesTable
  },

  data() {
    return {
      fetched: false,
      search: '',
      errorMessage: '',
      isExpenseDialogOpen: false,
      currentExpense: null
    }
  },

  computed: {
    ...mapGetters(['expenses'])
  },

  methods: {
    ...mapActions(['getExpenses', 'editExpense']),

    async updateExpense(expense) {
      try {
        await this.editExpense(expense)
      } catch (error) {
        console.error(error)
      }
    },
    openExpenseDialog(expense) {
      this.currentExpense = expense
      this.isExpenseDialogOpen = true
    },
    onExpenseSubmit(show) {
      this.currentExpense = null
      this.isExpenseDialogOpen = show
    }
  }
}
</script>
