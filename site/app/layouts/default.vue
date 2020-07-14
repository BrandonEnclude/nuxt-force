<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app elevate-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="$auth.loggedIn"/>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="$auth.loggedIn">
        <span style="margin-right: 5px;">{{ $auth.user.email }}</span>
        <v-btn @click="logout">Log out</v-btn>
      </div>
      <div v-else>
        <v-btn style="margin-right: 5px;" to='/login'>Login</v-btn>
        <v-btn color="primary" to='/register'>Register</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <TheSnackbar />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Posts',
          to: '/posts',
        },
        
      ],
      miniVariant: false,
      title: 'NuxtForce',
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$store.dispatch('snackbar/setSnackbar', {text: 'Successfully signed out'})
      this.$router.push('/')
    }
  }
}
</script>
