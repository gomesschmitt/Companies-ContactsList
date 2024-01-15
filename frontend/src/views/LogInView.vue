<template>
  <div class="d-flex align-center justify-center" style="height: 80vh;">
    <v-card class="mx-auto pa-16 pb-16" elevation="8" max-width="550" rounded="xl">
      <v-form @submit.prevent="login">
        <img class="mx-auto d-flex" style="max-width: 75%;" src="../assets/img/T8Logo.png">
        <br>
        <v-text-field
          v-model="username"
          label="Email"
          hint="At least 8 characters"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="togglePasswordVisibility"
        ></v-text-field>

        <v-btn type="submit" variant="outlined" color="secondary" :block="true" class="mt-2"  :disabled="loginInProgress">
          Sign in
        </v-btn>
      </v-form>

      <div class="mt-2">
        <p class="text-body-2">Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink></p>
      </div>

      <v-alert
        v-if="showSuccessMessage"
        type="success"
        title="Success"
        :text="successMessage"
        style="margin: 16px;"
      ></v-alert>

      <v-alert
        v-if="showErrorMessage"
        type="error"
        title="Error"
        :text="errorMessage"
        style="margin: 16px;"
      ></v-alert>
    </v-card>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';
import '@mdi/font/css/materialdesignicons.css';

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      showSuccessMessage: false,
      showErrorMessage: false,
      successMessage: '',
      errorMessage: '',
      redirectTimer: null,
      loginInProgress: false,
    };
  },
  methods: {
    async login() {
  try {
    this.loginInProgress = true;

    if (!this.username || !this.password) {
      this.showErrorMessage = true;
      this.errorMessage = 'Please fill all the blanks.';
      return;
    }

    const response = await axios.post('http://localhost:8000/login', {
      email: this.username,
      password: this.password,
    });

    console.log('API answer:', response.data);

    if (response.data.status === true) {
      this.showSuccessMessage = true;
      this.successMessage = 'Login successful';
      this.showErrorMessage = false;

      this.redirectTimer = setTimeout(() => {
        this.$router.push('/companies');
        this.loginInProgress = false;
      }, 3000);
    } else {
      this.showErrorMessage = true;
      this.errorMessage = 'Invalid credentials. Please try again.';
      this.loginInProgress = false;
    }

  } catch (error) {
    this.showErrorMessage = true;
    this.errorMessage = 'Authentication error: ' + error.response.data.message;
    this.loginInProgress = false;
  }
},
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
  beforeUnmount() {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
  },
};
</script>
