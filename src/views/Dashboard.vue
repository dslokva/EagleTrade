<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="10">
        <mainTable hover></mainTable>
      </b-col>
    </b-row>

    <section v-if="authRequired()">
      <p>Authenticated user content</p>
    </section>
  </div>
</template>

<script>
import mainTable from './parts/MainTable'
import { isLoggedIn } from '../utils/auth'

export default {
  name: 'Dashboard',
  data () {
    return {
    }
  },
  components: {
    mainTable
  },
  methods: {
    authRequired: function () {
      return isLoggedIn()
    }
  }
}
</script>
