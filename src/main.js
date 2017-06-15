import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Navbar from './Navbar.vue';
/*import 'jquery';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
*/
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';

import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
  locales: {
    // you will need json-loader in webpack 1
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

Vue.use(Vuetify);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
