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
    settings: ''
  },
  serverTick: '',
  currentLocale: 'en',
  last50spots: '',
  autoRefreshEnabled: false,

  socket: {
    isConnected: false,
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
    let rawMessage = JSON.parse(message.data)
    if (rawMessage.last_50_spots) {
      state.last50spots = rawMessage.last_50_spots
    }
    if (rawMessage.tick) {
      state.serverTick = rawMessage.tick.dateStr
    }
  },
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
  setAutoRefreshEnabled (state, newValue) {
    state.autoRefreshEnabled = newValue
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
  last50spots: state => state.last50spots,
  autoRefreshEnabled: state => state.autoRefreshEnabled
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [vuexLocal.plugin]
})
