import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomTheme', // Set the default theme
    themes: {
      myCustomTheme: {
        dark: false, // Set to true for a dark theme
        colors: {
          primary: '#1976D2', // Custom primary color
          secondary: '#424242', // Custom secondary color
          accent: '#82B1FF', // Custom accent color
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#F5F5F5', // Background color
        },
      },
    },
  },
})

createApp(App).use(vuetify).mount('#app')
