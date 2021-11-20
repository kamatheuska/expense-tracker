<template>
  <v-app>
    <template v-if="isLoading">
      <code> Loading... </code>
    </template>
    <template v-else>
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <h1 class="headline font-weight-bold">
            {{ appName }}
          </h1>
        </div>

        <v-spacer></v-spacer>
        <div v-if="user">
          <v-btn @click="logout" text> Logout </v-btn>
        </div>
      </v-app-bar>

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
import { mapGetters, mapActions } from 'vuex'
import { APP_NAME } from '@/constants'

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
      isLoading: true,
      appName: APP_NAME
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
