<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-navbar-nav class="ml-auto" style="padding-right: 30px">
      <HeaderDropdown/>
      <b-nav-item-dropdown right no-caret>
         <template slot="button-content">
            <b-nav-item class="px-3">
            <i class="fa fa-language fa-lg"></i>
          </b-nav-item>
          </template>
           
        <b-dropdown-item v-on:click="locale = 'en'"> 
          <img style="padding-right: 10px; height:20px" src="../../static/img/flags/USA.png"/>English
        </b-dropdown-item>
        
        <b-dropdown-item v-on:click="locale = 'ru'">
          <img style="padding-right: 10px; height:20px" src="../../static/img/flags/Russia.png"/>Русский
        </b-dropdown-item>
      </b-nav-item-dropdown>
   </b-navbar-nav>
    <!-- <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button> -->
  </header>
</template>

<script>
import HeaderDropdown from './HeaderDropdown.vue'

export default {
  name: 'header',
  data () {
    return {
      locale: this.$store.getters.currentLocale
    }
  },
  components: {
    HeaderDropdown
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
      this.$store.commit('setCurrentLocale', val)
    }
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
