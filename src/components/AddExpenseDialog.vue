<template>
  <v-dialog v-model="showDialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex justify-end">
        <v-btn color="green" fab dark small v-bind="attrs" v-on="on">
          <v-icon> mdi-plus</v-icon>
        </v-btn>
      </div>
    </template>

    <v-card class="mx-auto" v-if="showDialog">
      <v-form ref="form" v-model="valid">
        <v-card-text>
          <v-card-title> Añadir un gasto </v-card-title>

          <v-text-field
            v-model="form.description"
            :counter="200"
            :rules="rules.description"
            hint="¿De qué fue el gasto?"
            label="Descripción"
            prepend-icon="mdi-card-text"
            placeholder="Transporte"
            required
          />

          <v-text-field
            class="mb-5"
            v-model="form.cost"
            label="Valor"
            required
            :rules="rules.cost"
            single-line
            prepend-icon="mdi-currency-usd"
            hint="¿De cuánto fue el gasto?"
            type="number"
            min
          />

          <v-menu
            ref="menu"
            v-model="showDatePicker"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <slot name="date-activator" v-bind="{ on, attrs, form }"></slot>
            </template>
            <v-date-picker v-model="form.date" no-title scrollable />
          </v-menu>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" color="primary" @click="onSubmit">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
const initialForm = {
  id: '',
  description: '',
  cost: 1000,
  date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10)
}

export default {
  data() {
    return {
      showDatePicker: false,
      valid: false,
      rules: {
        description: [(v) => !!v || 'Una descripcion es necesaria'],
        value: [(v) => v > 0 || 'Tiene que ser mayor que cero (0)']
      },
      form: this.isEdit ? { ...this.expense } : { ...initialForm }
    }
  },

  props: {
    value: Boolean,
    expense: {
      type: Object,
      default: () => {}
    },
    isEdit: Boolean
  },
  computed: {
    showDialog: {
      get() {
        return this.value
      },
      set(show) {
        this.$emit('submitted', show)
      }
    }
  },

  methods: {
    ...mapActions(['addExpense']),

    async onSubmit() {
      try {
        const expense = {
          ...this.form,
          cost: Number.parseInt(this.form.cost)
        }
        await this.addExpense(expense)
      } catch (error) {
        console.error(error)
      } finally {
        this.$emit('submitted')
      }
    }
  },

  created() {
    this.form = this.isEdit ? { ...this.expense } : { ...initialForm }
  }
}
</script>
