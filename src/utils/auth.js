/* eslint no-undef: "off" */
import decode from 'jwt-decode'
import Auth0 from 'auth0-js'
import router from '../router'
import EventEmitter from 'eventemitter3'
import store from './store'

const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'
const CLIENT_ID = 'FqhJekTQYLhICdIfKPqXGWKl9GQIcy2I'
const CLIENT_DOMAIN = 'bittradeng.eu.auth0.com'
const REDIRECT = window.location.origin + '/callback'
const SCOPE = 'openid profile'
const AUDIENCE = 'http://eagletrade.com'

const auth = new Auth0.WebAuth({
  domain: CLIENT_DOMAIN,
  clientID: CLIENT_ID,
  callbackURL: REDIRECT,
  audience: AUDIENCE,
  scope: SCOPE,
  redirectUri: REDIRECT,
  responseType: 'token id_token'
})

export var authNotifier = new EventEmitter()

export function login (username, password) {
  auth.login({
    connection: 'Username-Password-Authentication',
    username: username,
    password: password
  },
  function (err) {
    if (err) {
      authNotifier.emit('authError', {
        errorMessage: err.error,
        errorDescription: err.error_description
      })
    }
  })
}
export function logout () {
  clearIdToken()
  clearAccessToken()
  clearSSOData()
  router.replace('/pages/login')
}

export function requireAuth (to, from, next) {
  if (!isLoggedIn()) {
    store.commit('clearUserProfile')
    next({
      path: '/pages/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export function handleAuthentication () {
  setAccessToken()
  setIdToken()
  auth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      auth.client.userInfo(authResult.accessToken, function (err, user) {
        store.commit('setUserProfile', JSON.stringify(user))
        console.log(user)
        console.log(err)
      })
      router.replace('/dashboard')
    } else if (err) {
      router.replace('/pages/login')
      console.log(err)
      alert(`Error: ${err.error}. Check the console for further details.`)
    }
  })
}

export function navigateToMainPage () {
  router.replace('dashboard')
}

export function getIdToken () {
  return localStorage.getItem(ID_TOKEN_KEY)
}

export function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearIdToken () {
  localStorage.removeItem(ID_TOKEN_KEY)
}

function clearSSOData () {
  localStorage.removeItem('auth0.ssodata')
}

function clearAccessToken () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName (name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

// Get and store access_token in local storage
export function setAccessToken () {
  let accessToken = getParameterByName('access_token')
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

// Get and store id_token in local storage
export function setIdToken () {
  let idToken = getParameterByName('id_token')
  localStorage.setItem(ID_TOKEN_KEY, idToken)
}

export function isLoggedIn () {
  const idToken = getIdToken()
  return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate (encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
