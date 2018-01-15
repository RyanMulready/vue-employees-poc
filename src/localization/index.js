import Vue from 'vue'
import store from 'src/store' // Vue Store Handles Data Management
import vuexI18n from 'vuex-i18n' // Localization Library
import en from './en.json' // Imports English Language

Vue.use(vuexI18n.plugin, store) // Set Store for Localization
Vue.i18n.add('en', en) // Add english to the translation store
Vue.i18n.set('en') // Set English as Default Language

export default vuexI18n
