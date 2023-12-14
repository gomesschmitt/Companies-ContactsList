<template>
    <v-card class="mx-auto pa-16 pb-16" elevation="8" max-width="550" rounded="xl">
      <form @submit.prevent="submit">
  
        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="Old E-mail"
          class="mb-2"
        ></v-text-field>
    
        <v-text-field
          v-model="changedEmail.value.value"
          :error-messages="changedEmail.errorMessage.value"
          label="New E-mail"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="password.value.value"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="togglePasswordVisibility"
          class="mb-2"
        ></v-text-field>
        <br>
        <v-btn class="me-16" type="submit" @click="submit">Submit</v-btn>
  
        <v-btn @click="handleReset" class="ml-5 mr-13">Clear</v-btn>
        <v-btn
        class="ml-5"
        @click="goBack"
      >
        <v-icon
          start
          icon="mdi-arrow-left"
        ></v-icon>
        Back
      </v-btn>
      </form>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useField, useForm } from 'vee-validate';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter()
  
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      email (value) {
          if (/^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]+$/i.test(value)) return true
  
          return 'Must be a valid e-mail.'
        },
        oldEmail (value) {
          if (/^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]+$/i.test(value)) return true
  
          return 'Must be a valid e-mail.'
        },
      password(value) {
        if (value?.length > 9 && /[0-9-]+/.test(value)) return true
        return 'Password needs to be at least 9 digits.'
      },
    },
  })
  
  const email = useField('email')
  const changedEmail = useField('changedEmail')
  const password = useField('password');
  const showPassword = ref(false);
  
  const submit = handleSubmit(async (values) => {
  try {
    const response = await axios.patch('http://localhost:8000/user/edit', {
      oldEmail: values.email,
      newEmail: values.changedEmail,
      password: values.password,
    });

    if (response.data.status) {
      alert('Account updated successfully');

      email.value.value = '';
      changedEmail.value.value = '';
      password.value.value = '';

    } else {
      alert('Failed to update account');
    }
  } catch (error) {
    console.error('Error updating account:', error);
    alert('An error occurred while updating the account');
  }
});
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  }
  
  const goBack = () => {
      router.go(-1);
    };
  </script>