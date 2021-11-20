<template>
  <div class="expenses">
    <v-container class="px-0">
      <v-row>
        <v-col cols="12">
          <div class="px-3">
            <h1>Gastos</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <AddExpenseDialog
            v-model="isExpenseDialogOpen"
            :expense="currentExpense"
            @submitted="onExpenseSubmit"
            :isEdit="!!currentExpense"
          >
            <template v-slot:date-activator="{ on, attrs, form }">
              <v-text-field
                v-model="form.date"
                label="Fecha"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                class="mt-5"
              ></v-text-field>
            </template>
          </AddExpenseDialog>
          <ExpensesTable
            :fetched="fetched"
            :error-message="errorMessage"
            :expenses="expenses"
            @edit="openExpenseDialog"
            @delete="deleteExpense"
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
    ...mapActions(['getExpenses', 'editExpense', 'removeExpense']),

    async updateExpense(expense) {
      try {
        await this.editExpense(expense)
      } catch (error) {
        console.error(error)
      }
    },

    async deleteExpense(expense) {
      try {
        await this.removeExpense(expense)
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
