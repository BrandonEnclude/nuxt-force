<template>
  <transition name="bounce">
    <v-card elevation="1" class="px-6 py-4 mb-4" v-if="delayDone">
      <v-card-text>
        <h4 v-if="$auth.user && $auth.user._id === comment.NuxtForce_User_Id__c" class="heading-4" :style="{color: $vuetify.theme.themes['light'].primary}">Me</h4>
        <h4 v-else class="heading-4 text--primary">{{ comment.NuxtForce_User_Name__c }}</h4>
        <span class="text--secondary"> {{ comment.CreatedDate | formatDate }} </span>
        <br />
        <div class="mt-2 body-1 text--primary"> {{ comment.Body__c }} </div>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="$auth.user && $auth.user._id === comment.NuxtForce_User_Id__c" text color="error" v-on:click="handleDelete">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </transition>
  
</template>

<script>
export default {
  props: ['comment', 'index', 'onDelete'],
  data: function() {
      return {
         delayDone: false
      }
   },
  created: async function() {
    setTimeout(() => this.delayDone = true, 100 + this.index * 100);
    this.loading = false;
  },
  methods: {
    async handleDelete() {
      const args = {commentId: this.comment.Id}
      try {
        await this.onDelete(args)
        this.$store.dispatch('snackbar/setSnackbar', {color: 'success', text: 'Comment deleted.'})
      } catch (err) {
        this.$store.dispatch('snackbar/setSnackbar', {color: 'error', text: 'Unable to delete your comment at this time.'})
      }
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
}
</script>

<style>
.bounce-enter-active {
  animation: bounce-in .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(.8);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>