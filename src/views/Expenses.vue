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
            :initialForm="initialForm"
            :isEdit="!!currentExpense"
            :rules="rules"
            @add="createExpense"
            @open="openExpenseDialog"
          >
            <template v-slot:date-activator="{ on, attrs, form }">
              <v-text-field
                v-model="form.date"
                v-bind="attrs"
                v-on="on"
                class="mt-5"
                label="Fecha"
                prepend-icon="mdi-calendar"
                readonly
              ></v-text-field>
            </template>
          </AddExpenseDialog>
          <ExpensesTable
            :error-message="errorMessage"
            :expenses="expenses"
            :fetched="fetched"
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

const rules = {
  description: [(v) => !!v || 'Una descripcion es necesaria'],
  cost: [(v) => v > 0 || 'Tiene que ser mayor que cero (0)']
}

const initialForm = {
  id: '',
  description: '',
  cost: 1000,
  date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10)
}

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
      currentExpense: null,
      rules,
      initialForm
    }
  },

  computed: {
    ...mapGetters('expenses', ['expenses'])
  },

  methods: {
    ...mapActions('expenses', [
      'addExpense',
      'editExpense',
      'getExpenses',
      'removeExpense'
    ]),

    async createExpense(form) {
      this.currentExpense = null
      this.isExpenseDialogOpen = false

      try {
        await this.addExpense(form)
      } catch (error) {
        console.error(error)
      }
    },

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

    openExpenseDialog({ show = true, expense = null }) {
      this.currentExpense = expense
      this.isExpenseDialogOpen = show
    }
  }
}
</script>
