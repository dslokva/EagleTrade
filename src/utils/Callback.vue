<template>
  <div>
    <i class="fa fa-spinner fa-lg fa-spin"></i>
  </div>
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