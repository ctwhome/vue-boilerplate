import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

Vue.config.devtools = true

export default new Vuex.Store({
  plugins: [createPersistedState()],
  debug: true,

  state: {
    user: null,
    otherDataExample: null
  },

  mutations: {
    updateUser (state, { user }) {
      Vue.set(state, 'user', user)
    },

    updateUserRole(state,payload){
     this.state.userRole = payload
    },

  },

  actions: {
    // EXAMPLE
    // updateData({ commit }, data) {
    //   commit('updateData', data)
    // },
  },
  getters:{
    user: state => state.user
  }
})
