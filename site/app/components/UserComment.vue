<template>
   <v-sheet class="my-2 px-2" background-color="white" :height="height" style="overflow: hidden;">
      <v-textarea
         name="comment-area"
         label="Leave a comment..."
         v-model="userComment"
         counter
         :rules="[maxLength('Comment', 250)]"
         v-on:focus="focus"
      ></v-textarea>
      <v-btn color="primary" style="margin-top: -1.5em;" v-on:click="handleSubmit">Submit</v-btn>
      <v-btn color="accent" style="margin-top: -1.5em;" v-on:click="focusout">Cancel</v-btn>
   </v-sheet>
</template>

<script>
import validations from "@/utils/validations";
export default {
   props: ['postId', 'onSubmit'],
   data() {
      return {
         userComment: '',
         height: '75px',
         ...validations
      }
   },
   methods: {
      focus() {
         this.height = 'auto'
      },
      focusout() {
         this.height = '60px'
         this.userComment = ''
      },
      async handleSubmit() {
         if (!this.userComment || this.userComment.length > 250) return;
         try {
            await this.onSubmit({comment: this.userComment, post: this.postId})
            this.$store.dispatch('snackbar/setSnackbar', {color: 'success', text: 'Comment submitted. Thanks :-)'})
            this.focusout()
            this.userComment = ''
         } catch (err) {
            console.log(err)
            this.$store.dispatch('snackbar/setSnackbar', {color: 'error', text: 'Unable to submit your comment.'})
         }
      }
   }
}
</script>

<style>
</style>