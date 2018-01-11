import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const state = {
  userdata: {
    profile: ''
  }
}

const mutations = {
  setUserProfile (state, newValue) {
    state.userdata.profile = newValue
    console.log('user changed - ' + JSON.parse(state.userdata.profile).nickname)
  },
  clearUserProfile (state) {
    state.userdata.profile = ''
    state.authenticated = false
    console.log('user profile cleared')
  }
}

const getters = {
  userName: state => JSON.parse(state.userdata.profile).nickname
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [vuexLocal.plugin]
})
