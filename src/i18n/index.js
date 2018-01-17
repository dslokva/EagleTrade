import Vue from 'vue'
import VueI18n from 'vue-i18n'
import mainStore from '../utils/store'

Vue.use(VueI18n)

var storedLocale = mainStore.getters.currentLocale
if (!storedLocale) storedLocale = 'en'

const i18n = new VueI18n({
  locale: storedLocale,
  messages: {
    'en': require('./en.json'),
    'ru': require('./ru.json')
  }
})

if (module.hot) {
  module.hot.accept(['./en.json', './ru.json'], () => {
    i18n.setLocaleMessage('en', require('./en.json'))
    i18n.setLocaleMessage('ru', require('./ru.json'))
    console.log('hot language reload', this, arguments)
  })
}

export default i18n
