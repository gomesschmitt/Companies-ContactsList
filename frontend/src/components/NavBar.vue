<template>
  <v-card class="navbar-card">
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item>
          <template v-slot:prepend-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="John Leider">
          </template>
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
          <template v-slot:append>
            <v-btn variant="text" icon @click.stop="rail = !rail">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <RouterLink to="/companies">
            <v-list-item :class="{ 'selected-item': isItemSelected('companies') || isItemSelected('companies') }" @click="handleItemClick('companies')" prepend-icon="mdi-home-city" title="Companies List"></v-list-item>
          </RouterLink>
          <RouterLink to="/contacts/list">
            <v-list-item :class="{ 'selected-item': isItemSelected('contactsList') }" @click="handleItemClick('contactsList')" prepend-icon="mdi-account-group-outline" title="Contacts List"></v-list-item>
          </RouterLink>
          <RouterLink to="/user/edit">
            <v-list-item prepend-icon="mdi-account" title="Edit Account"></v-list-item>
          </RouterLink>
          <v-list-item @click="openConfirmationDialog">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-dialog v-model="confirmationDialog" max-width="300">
        <v-card>
          <v-card-title class="headline">Confirm Sign Out</v-card-title>
          <v-card-text>
            Are you sure you want to sign out?
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="performSignOut">Yes</v-btn>
            <v-btn color="primary" @click="confirmationDialog = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-layout>
  </v-card>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css';
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      confirmationDialog: false,
    };
  },
  methods: {
    performSignOut() {
    localStorage.removeItem('jwt');

    this.$router.replace({ name: 'LogIn' });
  },
    openConfirmationDialog() {
      this.confirmationDialog = true;
    },
    handleItemClick(item) {
      this.$router.push({ name: item });
    },
    isItemSelected(routeName) {
      return this.$route.name === routeName;
    },
  },
};
</script>

<style scoped>
.navbar-card {
  z-index: 1000;
}

.selected-item {
  background-color: var(--vt-c-divider-light-1);
  color: var(--color-heading);
}
</style>
