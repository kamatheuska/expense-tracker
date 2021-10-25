<template>
  <v-app>
    <template v-if="isLoading">
      <code> Loading... </code>
    </template>
    <template v-else>
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <h2 class="headline font-weight-bold">Expense Tracker</h2>
        </div>

        <v-spacer></v-spacer>
        <div v-if="user">
          <span>
            Hola
            <strong> {{ displayName }} </strong>
          </span>
          <v-btn @click="logout" text> Logout </v-btn>
        </div>

        <v-btn @click="login" text v-else> Login </v-btn>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'

const provider = new GoogleAuthProvider()

export default {
  name: 'App',

  computed: {
    ...mapGetters(['user']),
    displayName: (vm) => (vm.user ? vm.user.displayName : '')
  },

  data() {
    return {
      isLoading: true
    }
  },

  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setUser(user)
      }
      this.isLoading = false
    })
  },

  methods: {
    ...mapActions(['setUser']),
    async login() {
      try {
        const auth = getAuth()
        const result = await signInWithPopup(auth, provider)
        this.setUser(result.user)
      } catch (error) {
        console.error(error)
      }
    },

    async logout() {
      try {
        const auth = getAuth()
        await signOut(auth)
        window.location.href = ''
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
