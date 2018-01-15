import api from '../api'

let state = {
    metaData: {
        'user': {
            'permissions': {
               'employees': true
            },
            'preferences': {}
        },
        'buildings': [],
        'columns': {
            'wocolumns': [],
            'historycolumns': [],
            'filecolumns': [],
            'visitorcolumns': [],
            'employeescolumns': []
        },
        'status': [],
        'issuetypes': [],
        'companies': [],
        'floors': []
    }
},
    actions = {
        loadMetaData: ({ commit, state }) => {
            if (state.metaData.status.length === 0) {
                api.get('metadata').then((data) => {
                    commit('setMetaData', { obj: data })
                }).catch(function (error) {
                    console.log(error)
                  })
            }
        }
    },
    mutations = {
        setMetaData: (state, { obj }) => {
            state.metaData = obj
        }
    },
    getters = {
        getMetaData: state => {
            return state.metaData
        }
    }

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
