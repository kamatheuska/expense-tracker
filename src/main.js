import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyCuPVmr1O-Yol85bfIxheIGgcYsih__Apw',
  authDomain: 'expense-tracker-f9e2c.firebaseapp.com',
  projectId: 'expense-tracker-f9e2c',
  storageBucket: 'expense-tracker-f9e2c.appspot.com',
  messagingSenderId: '409192637961',
  appId: '1:409192637961:web:0498bed9ae4980c64b3ad8'
}

export const firebaseApp = initializeApp(config)
export const db = getFirestore()
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
