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
      <v-card-text>
        <v-card-title> Añadir un gasto </v-card-title>

        <v-form ref="form" v-model="valid">
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
            v-model="form.value"
            label="Valor"
            required
            :rules="rules.value"
            single-line
            prepend-icon="mdi-currency-usd"
            hint="¿De cuánto fue el gasto?"
            type="number"
            min
          />

          <v-menu
            ref="menu"
            v-model="showDatePicker"
            :return-value.sync="form.date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
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
            <v-date-picker v-model="form.date" no-title scrollable />
          </v-menu>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!valid || !hasFormChanged"
          color="primary"
          @click="onSubmit"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
const initialForm = {
  description: '',
  value: null,
  date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10)
}
export default {
  data() {
    return {
      showDatePicker: false,
      hasFormChanged: false,
      valid: false,
      rules: {
        description: [(v) => !!v || 'Una descripcion es necesaria'],
        value: [(v) => v > 0 || 'Tiene que ser mayor que cero (0)']
      },
      form: this.isEdit ? this.expense : initialForm
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
    },
    formattedForm() {
      return {
        ...this.expense,
        value: this.convertFirebaseNumberToDecimal(this.expense.value)
      }
    }
  },

  methods: {
    ...mapActions(['addExpense']),

    async onSubmit() {
      try {
        const expense = {
          ...this.form,
          value: Number.parseInt(this.form.value)
        }
        await this.addExpense(expense)
      } catch (error) {
        console.error(error)
      } finally {
        this.$emit('submitted')
      }
    },

    convertFirebaseNumberToDecimal(firebaseNumber) {
      return Number.parseInt(firebaseNumber.split(',').join(''))
    }
  },

  watch: {
    isEdit(newValue) {
      if (newValue) {
        this.form = this.formattedForm
      }
    },

    form: {
      deep: true,
      handler: function onFormChange(newForm, oldForm) {
        const isEqual =
          JSON.stringify(oldForm) === JSON.stringify(this.formattedForm)
        if (!isEqual && this.hasFormChanged) {
          this.hasFormChanged = true
        }
      }
    }
  }
}
</script>
