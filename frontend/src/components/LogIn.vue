<template>
    <div class="d-flex align-center justify-center" style="height: 80vh;">

        <v-card class="mx-auto pa-16 pb-16" elevation="8" max-width="550" rounded="xl">
            <v-form fast-fail @submit.prevent="login">
                
                <img class="mx-auto d-flex" style="max-width: 75%;" src="../assets/img/T8Logo.png">
<br>               
                <v-text-field density="compact" placeholder="User Name" variant="outlined"></v-text-field>

                <v-text-field density="compact" placeholder="User Name" variant="outlined"></v-text-field>

                <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

                    <v-btn type="submit" variant="outlined" color="primary" block class=" mt-2">

                        <RouterLink to="/table">Sign in</RouterLink>

                    </v-btn>
            </v-form>
            <div class="mt-2">
                <p class="text-body-2">Don't have an account? <a href="#">Sign Up</a></p>
            </div>
        </v-card>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router'
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