<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <br />
      <div class="text-center">
        <vuetify-logo />
      </div>
      <br />
      <v-card>
        <v-card-title class="headline">
          Welcome to NuxtForce
        </v-card-title>
        <v-card-text>
          <p>NuxtForce is a demo of Nuxt and Salesforce integration.</p>
          <p>Some of the features of this demo include:</p>
          <ul>
            <li>Local User Authentication</li>
            <li>Salesforce REST API integration</li>
            <li>Server-side caching</li>
            <li>Progressive Web Application implementation</li>
          </ul>
          <p>
            For more information on NuxtForce, check out this <strong><a
              href="https://github.com/BrandonEnclude/nuxt-force"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github Repo
            </a>
            </strong>
          </p>
          <p v-if="!$auth.loggedIn">
            <a href="/login">Log in</a> or <a href="/register">register</a> to leave or delete comments.
          </p>
          <v-card-actions v-if="!$auth.loggedIn">
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              to="/register"
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  transitions: 'page-enter',
  components: {
    Logo,
    VuetifyLogo
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
