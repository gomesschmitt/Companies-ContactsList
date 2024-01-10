<template>
  <NavBar />
  <v-data-table :headers="headers" :items="contacts">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Contact List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="secondary" dark v-bind="props">
              Add Contact
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.contactFirstName" label="First Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.contactLastName" label="Last Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.contactMail" label="Contact Mail"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.contactPhoneNumber" label="Phone Number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select v-model="editedItem.companyName" :items="companiesList.map(company => company.companyName)"
                      label="Select Company"></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="saveContact">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
  <v-alert
      v-if="showSuccessMessage"
      type="success"
      title="Success"
      :text="successMessage"
    ></v-alert>

    <v-alert
      v-if="showErrorMessage"
      type="error"
      title="Error"
      :text="errorMessage"
    ></v-alert>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import axios from 'axios';

export default {
  components: {
    NavBar,
  },
  data: () => ({
    showSuccessMessage: false,
    showErrorMessage: false,
    successMessage: '',
    errorMessage: '',
    companiesList: [],
    dialog: false,
    dialogDelete: false,
    contactIdCounter: parseInt(localStorage.getItem('contactIdCounter')) || 1,
    model: 'rounded-0',
    headers: [
      { title: 'Contact ID', key: 'contactIdNumber' },
      { title: 'First Name', key: 'contactFirstName' },
      { title: 'Last Name', key: 'contactLastName' },
      { title: 'Contact Mail', key: 'contactMail' },
      { title: 'Phone Number', key: 'contactPhoneNumber' },
      { title: 'Company ID', key: 'companyId' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    contacts: [],
    editedIndex: -1,
    editedItem: {
      contactId: '',
      contactMail: '',
      contactFirstName: '',
      contactLastName: '',
      contactPhoneNumber: '',
      companyId: '',
    },
    defaultItem: {
      contactId: '',
      contactMail: '',
      contactFirstName: '',
      contactLastName: '',
      contactPhoneNumber: '',
      companyId: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    this.fetchContacts();
    this.fetchCompanies();
    const existingContactIds = this.contacts.map(contact => contact.contactIdNumber);
    const maxContactId = Math.max(...existingContactIds, 0);

    this.contactIdCounter = maxContactId + 1;
  },

  methods: {
    findNextSequentialId() {
      const existingContactIds = this.contacts.map(contact => contact.contactIdNumber);

      for (let i = 1; i <= existingContactIds.length + 1; i++) {
        if (!existingContactIds.includes(i)) {
          return i;
        }
      }

      return existingContactIds.length + 1;
    },
    resetContactIdCounter() {
      this.contactIdCounter = 1;
      localStorage.setItem('contactIdCounter', this.contactIdCounter);
    },
    generateContactId() {
      return this.contactIdCounter++;
    },
    openUpdateDialog(item) {
      this.editedIndex = this.contacts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.updateDialog = true;
    },
    closeUpdateDialog() {
      this.updateDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async saveContact() {
  try {
    if (this.editedIndex > -1) {
      // Se editedIndex for maior que -1, estamos editando um contato existente
      const response = await axios.put(`http://localhost:8000/contact/${this.editedItem.contactIdNumber}`, this.editedItem);

      if (response.data.status) {
        console.log('Contact updated successfully');

        this.showSuccessMessage = true;
        this.successMessage = 'Contact updated successfully';

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);

        // Atualize a tabela chamando a função fetchContacts
        this.fetchContacts();
      } else {
        console.error('Error updating contact. Server response:', response.data);

        this.showErrorMessage = true;
        this.errorMessage = response.data.message || 'Error updating contact.';

        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    } else {
      // Se editedIndex for menor ou igual a -1, estamos criando um novo contato
      if (!this.editedItem.contactId) {
        this.editedItem.contactId = this.contacts.length + 1;
      }

      if (this.editedItem.companyName) {
        const selectedCompany = this.companiesList.find(company => company.companyName === this.editedItem.companyName);
        if (selectedCompany) {
          this.editedItem.companyId = selectedCompany.companyIdNumber;
        } else {
          console.error('Selected company not found.');
        }
      }

      const response = await axios.post('http://localhost:8000/contact', this.editedItem);

      if (response.data.status) {
        console.log('Contact created successfully');

        this.showSuccessMessage = true;
        this.successMessage = 'Contact created successfully';

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);

        // Atualize a tabela chamando a função fetchContacts
        this.fetchContacts();
      } else {
        console.error('Error creating contact. Server response:', response.data);

        this.showErrorMessage = true;
        this.errorMessage = response.data.message || 'Error creating contact.';

        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    }

    this.close();
  } catch (error) {
    console.error('Error saving contact:', error);

    // ... Restante do código de tratamento de erro ...
  }
},





    async fetchCompanies() {
      try {
        const response = await axios.get('http://localhost:8000/companies/getAll');
        this.companiesList = response.data.data || [];
      } catch (error) {
        console.error('Error getting company data:', error);
      }
    },
    async fetchContacts() {
      try {
        const response = await axios.get('http://localhost:8000/contacts/getAll');
        this.contacts = response.data.data || [];
      } catch (error) {
        console.error('Error getting contact data:', error);
      }
    },
    initialize() {
      this.contacts = [];
    },
    editItem(item) {
      this.editedIndex = this.contacts.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.contacts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        console.log('Deleting contact with ID:', this.editedItem.contactIdNumber);

        const response = await axios.delete('http://localhost:8000/contact', { data: { contactIdNumber: this.editedItem.contactIdNumber } });

        if (response.data.status) {
          console.log('Contact deleted successfully');

          this.contacts = this.contacts.filter(contact => contact.contactIdNumber !== this.editedItem.contactIdNumber);

          console.log('Updated contacts array:', this.contacts);
          this.closeDelete();
        } else {
          console.error('Error deleting contact. Server response:', response.data);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
