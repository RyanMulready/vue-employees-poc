import Vue from 'vue'
import api from '../api'
import schema from '../statics/utils/schema'

let state = {
    employeesArray: [],
    employeeData: schema.newEmployee
},
    actions = {
        clearEmployeesArray: ({ commit, state }) => {
            commit('setEmployeesArray', { list: [] })
        },
        loadEmployeesArray: ({ commit, state }, params) => {
            api.get('employeeslist', JSON.stringify(params)).then((data) => {
                commit('setEmployeesArray', { list: data })
            }).catch(function (error) {
                console.log(error)
              })
        },
        loadEmployeeData: ({ commit, state }, id) => {
            api.get('employeeslist' + '/' + id).then((data) => {
                commit('setEmployeeData', { obj: data })
            }).catch(function (error) {
                console.log(error)
              })
        },
        postEmployeeData: ({ commit, state }, obj) => {
            api.patch('employeeslist' + '/' + obj.id, obj).then((data) => {
                commit('setEmployeeData', { obj: data })
            }).catch(function (error) {
                console.log(error)
              })
        }
    },
    mutations = {
        setEmployeesArray: (state, { list }) => {
            state.employeesArray = list
        },
        setEmployeeData: (state, { obj }) => {
            let oldArray = state.employeesArray
            const oldWo = oldArray.find(wo => wo.id === obj.id)
            const index = oldArray.indexOf(oldWo)

            if (index === -1) {
                Vue.set(state.employeesArray, 0, obj)
            }
            else {
                Vue.set(state.employeesArray, index, obj)
            }
        }
    },
    getters = {
        getEmployeesArray: state => {
            return state.employeesArray
        },
        getEmployeeById: state => (id) => {
            if (state.employeesArray.length) {
                const employeesData = state.employeesArray.find(employees => employees.id === id)
                state.employeesData = employeesData
            }
            return state.employeesData
        }
    }

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
