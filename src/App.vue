<template>
  <v-app>
    <template v-if="isLoading">
      <code> Cargando la app... </code>
    </template>
    <template v-else>
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon
          @click.stop="showNavigation = !showNavigation"
        ></v-app-bar-nav-icon>

        <div class="d-flex align-center">
          <h1 class="headline font-weight-bold">
            {{ appName }}
          </h1>
        </div>

        <v-spacer></v-spacer>
        <div>
          <v-btn @click="() => {}" text> Logout </v-btn>
        </div>
      </v-app-bar>

      <v-navigation-drawer v-model="showNavigation" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item href="/expenses">
              <v-list-item-title>Gastos</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view v-if="true" />

        <v-container v-else>
          <div>
            <p>Por favor autenticate para empezar</p>

            <v-btn color="primary" @click="login"> Login </v-btn>
          </div>
        </v-container>
      </v-main>
    </template>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { APP_NAME } from '@/constants'

export default {
  name: 'App',

  computed: {
    ...mapGetters(['user']),
    displayName: (vm) => (vm.user ? vm.user.displayName : '')
  },

  data() {
    return {
      isLoading: true,
      appName: APP_NAME,
      showNavigation: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>
