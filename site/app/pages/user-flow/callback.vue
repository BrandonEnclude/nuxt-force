<template>
    <v-sheet elevation="1" class="fg-sheet px-6 py-4" >
        <h1>Callback Page</h1>
        <h3 class="text-truncate" style="max-width: 100%;">Your Authorization Code: <strong v-if="authCode" style="color: #A23B72;">{{authCode}}</strong></h3>
    </v-sheet>
</template>

<script>
export default {
    async asyncData({ query }) {
        return {
            authCode: query.code,
        }
    },
}
</script>

<style>

</style>