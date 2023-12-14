<template>
    <v-card class="navbar-card">
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
        >
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <RouterLink to="/companies">
              <v-list-item
                prepend-icon="mdi-home-city"
                title="Companies List"
                value="companiesList"
              ></v-list-item>
            </RouterLink>
            <RouterLink to="/contacts/list">
              <v-list-item
                prepend-icon="mdi-account-group-outline"
                title="Contacts List"
                value="contactsList"
              ></v-list-item>
            </RouterLink>

            <RouterLink to="/user/edit">
            <v-list-item
                    prepend-icon="mdi-account"
                    title="Edit Account"
                    value="account"
                ></v-list-item>
            </RouterLink>
            <RouterLink to="/">
            <v-list-item
              prepend-icon="md:home"
              title="Sign Out"
              value="signOut"
            ></v-list-item>
            </RouterLink>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </template>
  
  <script>
    export default {
      data() {
        return {
          drawer: true,
          rail: true,
        }
      },
    }
  </script>
  
  <style scoped>
.navbar-card {
  z-index: 1000;
}
</style>