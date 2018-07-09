import Vue from 'vue'
import App from './App.vue'
import com1 from './component1.vue'

Vue.component('comp1',com1);

new Vue({
  el: '#app',
  render: h => h(App)
})
