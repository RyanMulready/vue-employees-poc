import router from '../router'
import api from '../api'
import notifications from '../api/notifications'

let state = {
  'authenticated': true,
  'token': '',
  'location': {
    'longitude': null,
    'latitude': null,
    'speed': null,
    'heading': null,
    'altitude': null
  },
  'permissions': {
    'employees': true
  },
  'avatar': null,
  'messages': null
},
  actions = {
    postLoginData: ({ commit, state }, obj) => {
      api.post('auth', JSON.stringify(obj)).then((response) => {
        commit('setAuthData', { troken: response.data })
        router.push({ name: 'home' })
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateLocationData: ({ commit, state }, location) => {
      var locationStr = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        speed: location.coords.speed,
        altitude: location.coords.altitude,
        heading: location.coords.heading
      }

      // Currently firefox is broken and updates every 5 seconds regardless of a location change
      if (state.location.latitude !== locationStr.latitude || state.location.longitude !== locationStr.longitude) {
        api.post('location', locationStr).then((response) => {
          commit('setLocationData', locationStr)
        }).catch(function (error) {
          commit('setLocationData', locationStr)
          console.log(error)
        })
      }
    }
  },
  mutations = {
    setAuthData: (state, { token }) => {
      state.authenticated = true
      state.token = token
    },
    setLocationData: (state, location) => {
      state.location = location
      const msg = {
        'name': 'Updating Location',
        'data': {
          'notify': true,
          'body': 'New Location Received:\n' + JSON.stringify(state.location)
        }
      }
      notifications.displayNotification(msg)
    }
  },
  getters = {
  }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
