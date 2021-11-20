<template>
  <div class="expenses-table">
    <v-data-table
      v-if="!errorMessage"
      :headers="headers"
      :items="formattedExpenses"
      item-key="name"
      class="elevation-1"
      :search="search"
      mobile-breakpoint="0"
      :loading="!fetched"
      loading-text="Cargando, por favor espere..."
      :footer-props="{
        itemsPerPageText: 'Items por página'
      }"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Buscar gasto"
          class="mx-4"
        ></v-text-field>
      </template>

      <template v-slot:item.cost="{ item }">
        <div class="d-flex align-items">
          <v-icon size="small"> mdi-currency-usd </v-icon>
          <span> {{ item.cost }} </span>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn-toggle dark dense background-color="white">
          <v-btn
            class="mr-1"
            fab
            dark
            x-small
            color="primary"
            @click="$emit('edit', item)"
          >
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
          <v-btn fab dark x-small color="red" @click="$emit('delete', item)">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-btn-toggle>
      </template>
    </v-data-table>
    <div v-else>
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fetched: Boolean,
    errorMessage: {
      type: String,
      default: ''
    },

    expenses: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      search: ''
    }
  },

  computed: {
    formattedExpenses() {
      return this.expenses.map((expense) => ({
        ...expense,
        cost: expense.cost.toLocaleString(),
        actions: {}
      }))
    },

    headers() {
      return [
        {
          text: 'Fecha',
          value: 'date',
          width: '30%',
          align: 'start'
        },
        {
          text: 'Descripción',
          width: '50%',
          value: 'description'
        },
        {
          text: 'Valor',
          width: '30%',
          value: 'cost'
        },
        {
          text: 'Acciones',
          sortable: false,
          value: 'actions'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.v-data-table__wrapper {
  table tbody tr {
    margin-bottom: 5rem;
  }
}
</style>
