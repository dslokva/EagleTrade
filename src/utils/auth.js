/* eslint no-undef: "off" */
import decode from 'jwt-decode'
import Auth0 from 'auth0-js'
import Router from 'vue-router'

const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'
const CLIENT_ID = 'FqhJekTQYLhICdIfKPqXGWKl9GQIcy2I'
const CLIENT_DOMAIN = 'bittradeng.eu.auth0.com'
const REDIRECT = window.location.origin + '/callback'
const SCOPE = 'openid profile'
const AUDIENCE = 'http://eagletrade.com'

/* eslint no-undef: "off" */
const auth = new Auth0({
  domain: CLIENT_DOMAIN,
  clientID: CLIENT_ID,
  responseType: 'token',
  callbackURL: window.location.origin + '/'
})

export function login (username, password) {
  auth.login({
    connection: 'Username-Password-Authentication',
    responseType: 'token id_token',
    email: username,
    password: password,
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  },
  function (err) {
    if (err) alert('something went wrong: ' + err.message)
  })
}

var router = new Router({
  mode: 'history'
})

export function logout () {
  clearIdToken()
  clearAccessToken()
  router.go('/')
}

export function requireAuth (to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
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
