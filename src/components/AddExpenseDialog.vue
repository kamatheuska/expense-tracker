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
          <v-btn :disabled="!valid" color="primary" @click="$emit('add', form)">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showDatePicker: false,
      valid: false,
      form: this.resetForm
    }
  },

  props: {
    value: Boolean,
    initialForm: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    },
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
        this.$emit('open', { show })
      }
    },
    resetForm() {
      return this.isEdit ? { ...this.expense } : { ...this.initialForm }
    }
  },

  mounted() {
    this.form = this.resetForm
  },

  watch: {
    showDialog() {
      this.form = this.resetForm
    }
  }
}
</script>
