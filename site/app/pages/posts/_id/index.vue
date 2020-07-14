<template>
  <v-layout column justify-center align-center >
    <v-sheet class="bg-sheet pa-4" color="grey lighten-3" >
      <v-sheet elevation="1" class="fg-sheet px-6 py-4" >
        <h2 class="heading-3">{{ post.Name }}</h2>
        <span> {{ post.Created_By_Name__c }} </span>
        <br />
        <span> {{ post.CreatedDate | formatDate }} </span>
        <hr class="my-4">
        <div v-html="post.Body__c"></div>
      </v-sheet>
      <CommentsSection :postId="$route.params.id" :totalComments="post.Total_Comments__c"/>
    </v-sheet>
      
  </v-layout>
  
</template>

<script>
export default {
  transitions: 'page-enter',
  async asyncData({ $axios, params }) {
      try {
         const res = await $axios.$get('/api/sf/Blog_Post__c/' + params.id)
         return {
           post: res
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
    },
    head() {
      return {
          title: this.post.Name,
          meta: [
              {
                  hid: this.post.Id,
                  name: this.post.Name,
                  content: this.post.Name + ' ' + this.post.Subject__c
              }
          ]
      }
  },
}
</script>

<style>
.bg-sheet {
  width: 100%;
  height: 100%;
}
.fg-sheet {
  min-height: 100px;
  max-width: 950px;
  width: 100%;
  height: 100%;
  margin: 0 auto 0 auto;
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