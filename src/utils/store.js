import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const state = {
  userdata: {
    profile: '',
    wexApiKey: '',
    wexApiSecret: '',
    wexApiEnabled: ''
  },

  currentLocale: 'en',

  socket: {
    isConnected: false,
    message: '',
    reconnectError: false
  }
}

const mutations = {
  SOCKET_ONOPEN (state, event) {
    state.socket.isConnected = true
  },
  SOCKET_ONCLOSE (state, event) {
    state.socket.isConnected = false
  },
  SOCKET_ONERROR (state, event) {
    console.error(state, event)
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE (state, message) {
    console.log(message)
    state.message = message
  },
  // mutations for reconnect methods
  SOCKET_RECONNECT (state, count) {
    console.info(state, count)
  },
  SOCKET_RECONNECT_ERROR (state) {
    state.socket.reconnectError = true
  },
  setUserProfile (state, newValue) {
    state.userdata.profile = newValue
    console.log('user changed - ' + JSON.parse(state.userdata.profile).nickname)
  },
  setCurrentLocale (state, newValue) {
    state.currentLocale = newValue
  },
  setWexAPIKey (state, newValue) {
    state.userdata.wexApiKey = newValue
  },
  setWexAPISecret (state, newValue) {
    state.userdata.wexApiSecret = newValue
  },
  setWexAPIEnabled (state, newValue) {
    state.userdata.wexApiEnabled = newValue
  },
  clearUserProfile (state) {
    state.userdata.profile = ''
    state.authenticated = false
    console.log('user profile cleared')
  }
}

const getters = {
  userName: state => JSON.parse(state.userdata.profile).nickname,
  wexAPIEnabled: state => state.userdata.wexApiEnabled,
  wexApiKey: state => state.userdata.wexApiKey,
  wexApiSecret: state => state.userdata.wexApiSecret,
  currentLocale: state => state.currentLocale
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [vuexLocal.plugin]
})
