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
                    <v-text-field v-model="editedItem.companyId" label="Company ID"></v-text-field>
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
    <template v-slot:item.actions="{ item }"> <!-- TODO FIX THIS MODIFIER-->
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    NavBar,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
  },

  methods: {

    openUpdateDialog(item) {
      this.editedIndex = this.contacts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.updateDialog = true;
    },

// TODO Fix bug that creates new one and doesn't update previous one

    async updateContact() {
  try {
    const updatedFields = {
      contactMail: this.editedItem.contactMail,
      contactFirstName: this.editedItem.contactFirstName,
      contactLastName: this.editedItem.contactLastName,
      contactPhoneNumber: this.editedItem.contactPhoneNumber,
      companyId: parseInt(this.editedItem.companyId, 10),
    };

    const response = await axios.patch(`http://localhost:8000/contact/edit/${this.editedItem.contactIdNumber}`, updatedFields);

    console.log('Update Response:', response.data);

    if (response.data.status) {
      console.log('Contact updated successfully');
      this.contacts[this.editedIndex] = response.data.updatedContact;
      this.closeUpdateDialog();
    } else {
      console.error('Error updating contact. Server response:', response.data);
    }
  } catch (error) {
    console.error('Error updating contact:', error);
  }
},


    closeUpdateDialog() {
      this.updateDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    generateContactId() {
      return uuidv4();
    },

    async saveContact() {
      try {
        this.editedItem.contactId = this.contacts.length + 1;

        const newContact = {
          contactId: this.editedItem.contactId,
          contactMail: this.editedItem.contactMail,
          contactFirstName: this.editedItem.contactFirstName,
          contactLastName: this.editedItem.contactLastName,
          contactPhoneNumber: this.editedItem.contactPhoneNumber,
          companyId: parseInt(this.editedItem.companyId, 10),
        };

        const response = await axios.post('http://localhost:8000/contact', newContact);
        this.contacts.push(response.data);
        this.close();
      } catch (error) {
        console.error('Error creating contact:', error);
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
      this.editedItem = Object.assign({}, item);
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

          // Use a filter function to create a new list excluding the contact being deleted
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.contacts[this.editedIndex], this.editedItem);
      } else {
        this.contacts.push(this.editedItem);
      }

      this.close();
    },
  },
};
</script>
