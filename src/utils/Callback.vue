<template>
  <b-row class="justify-content-center">
    <div>
      <i class="fa fa-spinner fa-lg fa-spin"></i>
    </div>
  </b-row>
</template>

<script>
import { navigateToMainPage, handleAuthentication } from '../utils/auth'

export default {
  name: 'Callback',
  data () {
    return {

    }
  },
  mounted () {
    this.$nextTick(() => {
      handleAuthentication()
      navigateToMainPage()
    })
  }
}
</script>