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

        <div class="password-input">
    <v-text-field
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      label="Password"
    ></v-text-field>
    <v-icon class="password-icon" @click="togglePasswordVisibility">
      {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
    </v-icon>
  </div>

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
      this.errorMessage = 'Please fill in all the fields.';
      return;
    }

    const response = await axios.post('http://localhost:8000/login', {
      email: this.username,
      password: this.password,
    }, { withCredentials: true });

    console.log('API response:', response.data);

    if (response.data.status === true) {
      const userEmail = this.username;
      localStorage.setItem('userEmail', userEmail);
      
      this.showSuccessMessage = true;
      this.successMessage = 'Login successful';
      this.showErrorMessage = false;

      const token = response.data.token;
      localStorage.setItem('jwt', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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

<style scoped>
.password-input {
  position: relative;
}

.password-icon {
  position: absolute;
  top: 40%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>