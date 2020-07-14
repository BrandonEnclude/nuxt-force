<template>
  <div>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${(index * 60) + 8}px;`"
    >
      <span style="position: absolute; top: calc(50% - 10px);">{{snackbar.text}}</span>
      <v-btn text @click="snackbar.showing = false" style="float: right;">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        snackbars: state => state.snackbar.snackbars
      })
    },    
  }
</script>

<style lang="scss" scoped>
</style>