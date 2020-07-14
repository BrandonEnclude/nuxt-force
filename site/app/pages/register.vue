<template>
   <div class="container">
      <h1>Register</h1>
      <UserAuthForm buttonText="Register" :submitForm="registerUser" hasName="true"/>
   </div>

</template>

<script>
export default {
   transitions: 'page-enter',
   methods: {
      async registerUser(userInfo) {
         try {
            await this.$axios.post('/api/auth/register', userInfo)
            this.$auth.loginWith('local', {
               data: userInfo
            })
            this.$store.dispatch('snackbar/setSnackbar', {color: 'green', text: `Registered new user ${userInfo.email}`})
            this.$router.push('/posts')
         } catch(err) {
            this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: 'Unable to register at this time'})
         }
      }
   }
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 100ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>