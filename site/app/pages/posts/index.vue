<template>
  <v-layout column justify-center align-center >
    <v-card v-for="post in posts" :key="post.Id" class="card mb-6">
      <v-card-title class="headline">
        {{ post.Name }}
      </v-card-title>
      <v-card-text>
        <span> {{ post.Created_By_Name__c }} </span>
        <br />
        <span> {{ post.CreatedDate | formatDate }} </span>
        <p class="text--primary subtitle-1">
          {{ post.Subject__c }} 
        </p>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            :to="'/posts/' + post.Id"
          >
            Read Post >
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
   transitions: 'page-enter',
   async asyncData({ $axios }) {
      try {
         const res = await $axios.$get('/api/sf/Blog_Post__c')
         return {
           posts: res.records
         }
      } catch(err) {
      console.log(err)
      }
   },
    filters: {
      formatDate(isoDate) {
        const date = new Date(isoDate);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        return dt + '-' + month + '-' + year
      }
    }
}
</script>

<style>
.card {
  width: 750px;
  max-width: 100%;
}
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