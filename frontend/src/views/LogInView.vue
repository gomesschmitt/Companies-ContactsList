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

        <v-btn type="submit" variant="outlined" color="secondary" :block="true" class="mt-2">
          Sign in
        </v-btn>
      </v-form>

      <div class="mt-2">
        <p class="text-body-2">Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink></p>
      </div>
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
    };
  },
  methods: {
    async login() {
      try {
        if (!this.username || !this.password) {
          console.error('Please fill all the blanks.');
          return;
        }

        const response = await axios.post('http://localhost:8000/login', {
          email: this.username,
          password: this.password,
        });

        console.log('API answer:', response.data);

        if (response.data.status === true) {
          this.$router.push('/companies');
        }

      } catch (error) {
        console.error('Authentication error:', error.response.data.message);
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>