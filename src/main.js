/* import './assets/main.css' */
/* import './assets/base.css' */
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useNavStore } from './stores/nav.store'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'


const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

const darkMode = useNavStore()

// validate user setting and check default setting and 
if (localStorage.getItem('dark-mode') === 'true' || (!('dark-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.querySelector('html').classList.add('dark');
  localStorage.setItem('dark-mode', true)
  darkMode.$patch({ darkMode: true })
  console.log("DARK MODE was added")
  console.log("See Store value:", darkMode.getDarkMode)
} else {
  document.querySelector('html').classList.remove('dark');
  localStorage.setItem('dark-mode', false)
  /* darkMode.$patch({ darkMode: false }) */
  console.log("DARK MODE was removed")
  console.log("See Store value:", darkMode.getDarkMode)
}


app.mount('#app')
