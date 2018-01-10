<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <!-- <img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com"> -->
          <b-nav-item class="px-3">
            <i class="icon-home icons font-2xl d-block mt-4"></i>
          </b-nav-item>
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>        
        <div v-if="isAuthenticated">
          <b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>
          <b-dropdown-item><i class="fa fa-wrench"></i> Settings</b-dropdown-item>
          <b-dropdown-item @click="handleLogout()"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
        </div>
        <div v-if="!isAuthenticated">
          <b-dropdown-item v-bind:to="'/pages/login'"><i class="fa fa-lock"></i> Login</b-dropdown-item>
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
      logout()
      this.$router.go('/pages/login')
    },
    isAuthenticated () {
      return isLoggedIn()
    }
  }
}
</script>

