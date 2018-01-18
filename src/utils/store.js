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
  serverTick: '',
  currentLocale: 'en',
  coinData: '',

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
    // todo: replace this code with bus.$emit('method', obj)
    let rawMessage = message.data
    if (rawMessage.startsWith('tick:')) {
      state.serverTick = rawMessage.substring(5, rawMessage.length)
    } else
    if (rawMessage.startsWith('coin_data:')) {
      state.coinData = rawMessage.substring(10, rawMessage.length)
    }
    state.socket.message = rawMessage
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
    // todo: clean local storage api keys at logout + load it at login
  }
}

const getters = {
  userName: state => JSON.parse(state.userdata.profile).nickname,
  currentLocale: state => state.currentLocale,
  serverTick: state => state.serverTick,

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
