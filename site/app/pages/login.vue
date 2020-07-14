<template>
   <div class="container">
      <h1>Log in</h1>
      <UserAuthForm buttonText="Login" :submitForm="loginUser"/>
   </div>

</template>

<script>
export default {
   transitions: 'page-enter',
   methods: {
      async loginUser(userInfo) {
         try {
            await this.$auth.loginWith('local', {
               data: userInfo
            })
            this.$store.dispatch('snackbar/setSnackbar', {color: 'success', text: `Signed in as ${this.$auth.user.email}`})
            this.$router.push('/posts')
         } catch(err) {
            this.$store.dispatch('snackbar/setSnackbar', {color: 'error', text: 'Incorrect username or password'})
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