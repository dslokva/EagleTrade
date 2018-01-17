<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <mainTable hover></mainTable>
      </b-col>
    </b-row>

    <section v-if="authRequired()">
      <p>Authenticated user content</p>
    </section>

    <b-button variant="primary" @click="register()"><i class="fa fa-refresh"></i>&nbsp; Register</b-button>
    <b-button variant="primary" @click="echo()"><i class="fa fa-refresh"></i>&nbsp; Echo</b-button>
  </div>
</template>

<script>
import mainTable from './parts/MainTable'
import { isLoggedIn } from '../utils/auth'

export default {
  name: 'Dashboard',
  data () {
    return {}
  },
  components: {
    mainTable
  },
  methods: {
    authRequired: function () {
      return isLoggedIn()
    },
    register () {
      this.$socket.send(
        JSON.stringify({ messageType: 'LOGIN', message: 'Name111' })
      )
    },
    echo () {
      this.$socket.send(
        JSON.stringify({ messageType: 'MESSAGE', message: 'Message111' })
      )
    }
  }
}
</script>
