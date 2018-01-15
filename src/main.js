require(`quasar/dist/quasar.${__THEME}.css`)

import Vue from 'vue' // Main Vuew Library
import Quasar, * as All from 'quasar' // Quasar component library
import 'quasar-extras/material-icons' // Use Material Icons
import 'quasar-extras/fontawesome' // Use Font Awesome Icons

import store from './store' // Vue Store Handles Data Management
import router from './router' // Vue Router Handles navigation
import localization from './localization' // vuexI18n Han dles Localization

import geolocation from './api/geolocation' // Handles geolocation updating to user store
geolocation.install()

import notifications from './api/notifications' // Handles requesting permission to user web notifications
notifications.install()

import utils from './statics/utils/' // Loading Common custom util functions
Vue.mixin(utils) // Make utils a global mixin

import Vuelidate from 'vuelidate' // Import vuelidate for form validation
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)
Vue.use(Vuelidate) // Init Vuelidate

Vue.use(Quasar, {
  components: All,
  directives: All
}) // Init Quasar Framework

// Start App
Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    localization,
    router,
    store,
    VueQuillEditor,
    render: h => h(require('./App'))
  })
})
