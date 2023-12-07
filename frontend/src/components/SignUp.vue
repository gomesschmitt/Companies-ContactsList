<template>
  <v-card class="mx-auto pa-16 pb-16" elevation="8" max-width="550" rounded="xl">
    <form @submit.prevent="submit">

      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="firstName.value.value"
        :counter="10"
        :error-messages="firstName.errorMessage.value"
        label="First Name"
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="lastName.value.value"
        :counter="10"
        :error-messages="lastName.errorMessage.value"
        label="Last Name"
        class="mb-2"
      ></v-text-field>
  
      <v-text-field
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        hint="At least 8 characters"
        @click:append="showPassword = !showPassword"
        class="mb-2"
      ></v-text-field>
      <br>

      <v-btn class="me-16" type="submit">Submit</v-btn>

      <v-btn @click="handleReset" class="ml-5 mr-16">Clear</v-btn>

      <v-btn @click="goBack" class="ml-8">Back</v-btn>
    </form>
  </v-card>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

const router = useRouter()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    FirstName(value) {
      if (value?.length >= 2) return true
      return 'Name needs to be at least 2 characters.'
    },
    lastName(value) {
      if (value?.length >= 2) return true
      return 'Last name needs to be at least 2 characters.'
    },
    password(value) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true
      return 'Password needs to be at least 9 digits.'
    },
    passwordValidation(value) {
      if (value?.length >= 8) return true;
      return 'Password needs to be at least 8 characters.';
    },
    select(value) {
      if (value) return true
      return 'Select an item.'
    },
    checkbox(value) {
      if (value === '1') return true
      return 'Must be checked.'
    },
  },
})

const firstName = useField('firstName')
const lastName = useField('lastName')
const password = useField('password');
let showPassword = false;
const email = useField('email')

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})

const goBack = () => {
  router.push('/')
}
</script>
