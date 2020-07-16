<template>
  <v-sheet elevation="1" class="fg-sheet px-6 py-4" >
    <h1>User Flow</h1>
    <h3>Salesforce Auth URI:</h3>
    <h3>https://login.salesforce.com/services/oauth2/authorize</h3>
    <h3><strong style="color: #A23B72;">?client_id=</strong>{{clientId}}</h3>
    <h3><strong style="color: #A23B72;">&redirect_uri=</strong>{{redirectUri}}</h3>
    <h3>&response_type=code</h3>
    <br>
    <v-btn
      color="blue-grey"
      class="ma-2 white--text"
      :href="href"
    >
      Authorize App
      <v-icon right dark>mdi-cloud</v-icon>
    </v-btn>
  </v-sheet>
  
</template>

<script>
export default {
  data: function() {
    return {
      clientId: '3MVG95G8WxiwV5Ptib1Zg_oPWxjMaC6bFnt9sWVt8FVPGY1t9_1NulvI2yIX77Wx9Y5.Ejnyv3SzfWGLl68c8',
      redirectUri: 'http://www.imugi.io/user-flow/callback'
    }
  },
  computed: {
    href() {
      return `https://login.salesforce.com/services/oauth2/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code`
    }
  }
}
</script>

<style>

</style>