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
        :error-messages="firstName.errorMessage.value"
        label="First Name"
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="lastName.value.value"
        :error-messages="lastName.errorMessage.value"
        label="Last Name"
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="birthDay.value.value"
        label="Birth Day"
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="iban.value.value"
        label="IBAN"
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

      <v-checkbox
        v-model="checkbox.value.value"
        :error-messages="checkbox.errorMessage.value"
        value="1"
        label="I agree to the terms of Service."
        type="checkbox"
      ></v-checkbox>
      <br>
      <v-btn class="me-16" type="submit" @click="handleSubmitFunction">Submit</v-btn>

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
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    email (value) {
        if (/^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]+$/i.test(value)) return true

        return 'Must be a valid e-mail.'
      },
    firstName(value) {
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

const email = useField('email');
const firstName = useField('firstName');
const lastName = useField('lastName');
const password = useField('password');
const checkbox = useField('checkbox');
const birthDay = useField('birthDay');
const iban = useField('iban');

const showPassword = ref(false);

const handleSubmitFunction = async () => {
  try {
    const response = await axios.post('http://localhost:8000/register', {
      userFirstName: firstName.value.value,
      userLastName: lastName.value.value,
      email: email.value.value,
      userPassword: password.value.value,
      userBirthDay: birthDay.value.value,
      userIban: iban.value.value
    });

    console.log('Answer to backend:', response.data);

    router.push('/');
  } catch (error) {
    console.error('Error calling backend:', error);
  }
};


const submit = handleSubmit(values => {
  console.log('Form submitted with values:', values);
  alert(JSON.stringify(values, null, 2))
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
}

const goBack = () => {
  router.push('/')
}
</script>