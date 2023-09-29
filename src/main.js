/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
 
// Composables
import { createApp } from 'vue'

// Plugins
import { createStore } from 'vuex';
import { registerPlugins } from '@/plugins'
import userModule from './store/user.js';
const app = createApp(App)
const store = createStore({
    modules: {
      user: userModule,
    },
    // Otras configuraciones de Vuex...
  });
registerPlugins(app)
app.use(store);
app.mount('#app')
