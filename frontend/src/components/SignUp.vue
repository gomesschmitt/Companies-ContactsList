<template>
   <v-card class="mx-auto pa-16 pb-16" elevation="8" max-width="550" rounded="xl">
    <form @submit.prevent="submit">

      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="firstName.value.value"
        :counter="10"
        :error-messages="firstName.errorMessage.value"
        label="First Name"
      ></v-text-field>

      <v-text-field
        v-model="lastName.value.value"
        :counter="10"
        :error-messages="lastName.errorMessage.value"
        label="Last Name"
      ></v-text-field>
  
      <v-text-field
    v-model="password.value.value"
    :counter="7"
    :error-messages="password.errorMessage.value"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPassword ? 'text' : 'password'"
    label="Password"
    hint="At least 8 characters"
    @click:append="showPassword = !showPassword"
  ></v-text-field>

      <v-checkbox
        v-model="checkbox.value.value"
        :error-messages="checkbox.errorMessage.value"
        value="1"
        label="Option"
        type="checkbox"
      ></v-checkbox>
  
      <v-btn
        class="me-4"
        type="submit"
      >
        submit
      </v-btn>
  
      <v-btn @click="handleReset">
        clear
      </v-btn>
    </form>
  </v-card>
  </template>
  
  <script setup>
    import { useField, useForm } from 'vee-validate'
  
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        FirstName (value) {
          if (value?.length >= 2) return true
  
          return 'Name needs to be at least 2 characters.'
        },
        lastName (value) {
          if (value?.length >= 2) return true
  
          return 'Name needs to be at least 2 characters.'
        },
        password (value) {
          if (value?.length > 9 && /[0-9-]+/.test(value)) return true
  
          return 'Password needs to be at least 9 digits.'
        },
         passwordValidation  (value)  {
          if (value?.length >= 8) return true;

  return 'Password needs to be at least 8 characters.';
},
        select (value) {
          if (value) return true
  
          return 'Select an item.'
        },
        checkbox (value) {
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
    const checkbox = useField('checkbox')
 
    const submit = handleSubmit(values => {
      alert(JSON.stringify(values, null, 2))
    })
  </script>