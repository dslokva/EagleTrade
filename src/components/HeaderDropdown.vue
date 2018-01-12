<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <!-- <img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com"> -->
          <b-nav-item class="px-3">
            <i class="fa fa-user-secret fa-lg"></i>
          </b-nav-item>
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>{{ $t('i18n.account') }}</strong></b-dropdown-header>        
        <div v-if="isLoggedIn()">
          <b-dropdown-item :to="'userprofile'"><i class="fa fa-user"></i> {{ $t('i18n.profile') }}</b-dropdown-item>
          <b-dropdown-item :to="'usersettings'"><i class="fa fa-wrench"></i> {{ $t('i18n.settings') }}</b-dropdown-item>
          <b-dropdown-item @click="handleLogout()"><i class="fa fa-lock"></i> {{ $t('i18n.logout') }}</b-dropdown-item>
        </div>
        <div v-if="!isLoggedIn()">
          <b-dropdown-item :to="'/pages/login'"><i class="fa fa-lock"></i> {{ $t('i18n.login') }}</b-dropdown-item>
        </div>
      </b-nav-item-dropdown>
</template>
<script>
import { isLoggedIn, logout } from '../utils/auth'

export default {
  name: 'header-dropdown',
  data: () => {
    return {}
  },
  methods: {
    handleLogout () {
      this.$store.commit('clearUserProfile')
      logout()
    },
    isLoggedIn () {
      return isLoggedIn()
    }
  }
}
</script>

