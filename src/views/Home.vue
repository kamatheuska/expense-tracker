<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Home</h1>

        <p>
          Hola
          <strong> {{ displayName }} </strong>
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn color="green lighten-2" dark to="/expenses"> Gastos </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',

  computed: {
    ...mapGetters(['user']),
    displayName: (vm) => (vm.user ? vm.user.displayName : '')
  }
}
</script>
