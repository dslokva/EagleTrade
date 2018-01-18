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
    wexApiEnabled: '',

    bitfinexApiKey: '',
    bitfinexApiSecret: '',
    bitfinexApiEnabled: ''
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
  setBitfinexAPIKey (state, newValue) {
    state.userdata.bitfinexApiKey = newValue
  },
  setBitfinexAPISecret (state, newValue) {
    state.userdata.bitfinexApiSecret = newValue
  },
  setBitfinexAPIEnabled (state, newValue) {
    state.userdata.bitfinexApiEnabled = newValue
  },
  clearUserProfile (state) {
    state.userdata.profile = ''
    state.authenticated = false
    console.log('user profile cleared')
  }
}

const getters = {
  userName: state => JSON.parse(state.userdata.profile).nickname,
  currentLocale: state => state.currentLocale,

  wexAPIEnabled: state => state.userdata.wexApiEnabled,
  wexAPIKey: state => state.userdata.wexApiKey,
  wexAPISecret: state => state.userdata.wexApiSecret,

  bitfinexAPIEnabled: state => state.userdata.bitfinexApiEnabled,
  bitfinexAPIKey: state => state.userdata.bitfinexApiKey,
  bitfinexAPISecret: state => state.userdata.bitfinexApiSecret
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [vuexLocal.plugin]
})
