<template>
  <div class="animated fadeIn">
    <p class="text-info">User profile</p>
    <div>
      Hello, {{ userName }}!
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
    return {
    }
  },
  computed: {
    userName () {
      return this.$store.getters.userName
    }
  }
}
</script>
