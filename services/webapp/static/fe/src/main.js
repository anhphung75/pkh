import Vue from 'vue'
//import App from './App.vue'
import App from './components/testChips.vue'

// Importing the Rhea PrimeVue theme styles
//import 'primevue/resources/themes/rhea/theme.css';
import 'primevue/resources/themes/vela-blue/theme.css';

// Importing the base PrimeVue component styles
import 'primevue/resources/primevue.min.css';

// Importing the base PrimeIcon styles
import 'primeicons/primeicons.css';

Vue.config.productionTip = false

var webapp = new Vue({
  render: h => h(App),
}).$mount('#app')

export { webapp as default };