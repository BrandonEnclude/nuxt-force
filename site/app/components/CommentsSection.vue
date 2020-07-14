<template>
   <div>
      <div v-if="loading" class="text-center my-12">
         <v-progress-circular
            indeterminate
            color="accent"
         ></v-progress-circular>
      </div>
      <div v-else class="fg-sheet">
         <h3 class="heading-3 text--secondary ml-2 mt-2" style="margin-bottom: -.5em;">{{ this.comments.length }} comments</h3>
         <UserComment :onSubmit="handleSubmit" :postId="postId"/>
         <Comment v-for="(comment, index) in comments" :key="comment.Id" :comment="comment" :index="index" :onDelete="handleDelete"/>
      </div>
      
   </div>
</template>

<script>
export default {
   transitions: 'page-enter',
   data() {
      return {
         loading: true,
         comments: [],
         userComment: ''
      }
   },
   props: ['postId', 'totalComments', 'refreshComments'],
   methods: {
      async handleSubmit(args) {
         this.loading = true
         await this.$axios.$post('/api/sf/Blog_Comment__c/', args)
         this.comments = await this.$axios.$get('/api/sf/Blog_Comment__c/' + this.postId)
         this.loading = false
      },
      async handleDelete(args) {
         this.loading = true
         await this.$axios.$delete(`/api/sf/Blog_Comment__c/${args.commentId}`)
         this.comments = await this.$axios.$get('/api/sf/Blog_Comment__c/' + this.postId)
         this.loading = false
      }
   },
   created: async function() {
      if (this.totalComments > 0) {
         this.comments = await this.$axios.$get('/api/sf/Blog_Comment__c/' + this.postId)
      }
      this.loading = false;
   }
}
</script>

<style>
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