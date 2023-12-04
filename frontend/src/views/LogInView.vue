<template>
  <div class="d-flex align-center justify-center" style="height: 80vh;">

      <v-card class="mx-auto pa-16 pb-16" elevation="8" max-width="550" rounded="xl">
          <v-form fast-fail @submit.prevent="login">
              
              <img class="mx-auto d-flex" style="max-width: 75%;" src="../assets/img/T8Logo.png">
<br>               
              <v-text-field density="compact" placeholder="User Name" variant="outlined"></v-text-field>

              <v-text-field density="compact" placeholder="Password" variant="outlined"></v-text-field>

              <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

                  <v-btn type="submit" variant="outlined" color="primary" block class=" mt-2">

                      <RouterLink to="/table">Sign in</RouterLink>

                  </v-btn>
          </v-form>
          <div class="mt-2">
              <p class="text-body-2">Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink></p>
          </div>
      </v-card>
  </div>
  <!--TODO try to make the clickable part of the button all functionale and not only one part of it-->
</template>
<script>
export default {
  data() {
      return {
          username: '',
          password: '',
      };
  },
  methods: {
      login() {
          // Your login logic here
      },
  },
}
</script>