import Vue from 'vue'
import App from './App'

window.Array.prototype.first = function () {
  return this[0]
}

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

