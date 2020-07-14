<template>
  <v-form v-model="valid">
    <v-text-field v-model="userInfo.firstName" 
                  label="First Name" 
                  :rules="[required('first name')]"
                  v-if="hasName" />

    <v-text-field v-model="userInfo.lastName" 
                  label="Last Name" 
                  :rules="[required('last name')]"
                  v-if="hasName" />

    <v-text-field v-model="userInfo.email" 
                  label="Email" 
                  :rules="[required('email'), emailFormat()]"/>

    <v-text-field v-model="userInfo.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'" 
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  counter=true
                  :rules="[required('password'), minLength('password', 8)]"
                  />

    <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
  import validations from "@/utils/validations";
  export default {
    data() {
      return {
        valid: false,
        showPassword: false,
        userInfo: {
          firstName: 'Billiam',
          lastName: 'Testington',
          email: 'test@test.com',
          password: 'password'
        },
        ...validations
      }
    },
    props: ["submitForm", "buttonText", "hasName"]
  }
</script>

<style lang="scss" scoped>
</style> 