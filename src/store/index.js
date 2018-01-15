import Vue from 'vue'
import Vuex from 'vuex'

import employees from '../store/employees'
import metadata from '../store/metadata'
import user from '../store/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: user,
    metadata: metadata,
    employees: employees
  }
})
