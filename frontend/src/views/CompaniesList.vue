<template>
  <NavBar />
  <v-data-table :headers="headers" :items="companies">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Companies List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="secondary" dark v-bind="props">
              Add Company
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
                    <v-text-field v-model="editedItem.companyName" label="Company"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.companyCountry" label="Country"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.companyCity" label="City"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.companyZip" label="Zip Code"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.companyStreet" label="Street"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.createdBy" label="Created By"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="saveCompany">
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
        <v-dialog v-model="contactsDialog" max-width="600px">
  <v-card>
    <v-card-title class="text-h5">Contacts Information for {{ contactsDialogData.companyName }}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-if="contactsDialogData.contacts.length === 0">No contacts available.</v-list-item>
        <v-list-item v-else v-for="(contact, index) in contactsDialogData.contacts" :key="index"></v-list-item>
        <v-list-item v-for="(contact, index) in contactsDialogData.contacts" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ contact.contactFirstName }} {{ contact.contactLastName }}</v-list-item-title>
            <v-list-item-subtitle>Email: {{ contact.contactMail }}, Phone: {{ contact.contactPhoneNumber }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-btn color="blue-darken-1" @click="closeContactsDialog">Close</v-btn>
  </v-card>
</v-dialog>
        <v-dialog v-model="infoDialog" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">Company Information</v-card-title>
            <v-card-text>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Company Name: {{ detailsDialogData.companyName }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title>Country: {{ detailsDialogData.companyCountry }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title>City: {{ detailsDialogData.companyCity }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title>Zip: {{ detailsDialogData.companyZip }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title>Street: {{ detailsDialogData.companyStreet }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title>Contacts:
  <v-icon size="small" class="mdi-contacts-icon" @click="openContactsDialog(detailsDialogData)">mdi-contacts</v-icon>
  {{ detailsDialogData.companyStreet }}
</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-darken-1" @click="infoDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="openDetailsDialog(item)">
        mdi-information
      </v-icon>
      <v-icon size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)">
        mdi-delete
      </v-icon>

    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>

  <v-alert
    v-if="showSuccessMessageCompany"
    type="success"
    title="Success"
    :text="successMessageCompany"
  ></v-alert>

  <v-alert
    v-if="showErrorMessageCompany"
    type="error"
    title="Error"
    :text="errorMessageCompany"
  ></v-alert>
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
    contactsDialog: false,
    infoDialog: false,
    detailsDialogData: {
    companyName: '',
    companyCountry: '',
    companyCity: '',
    companyZip: '',
    companyStreet: '',
    createdBy: '',
    createdOn: '',
  },
  contactsDialogData: {
    companyName: '',
    contacts: [],
  },
    showSuccessMessageCompany: false,
    showErrorMessageCompany: false,
    successMessageCompany: '',
    errorMessageCompany: '',
    dialog: false,
    dialogDelete: false,
    model: 'rounded-0',
    headers: [
      { title: 'Company ID', key: 'companyIdNumber' },
      { title: 'Company Name', key: 'companyName' },
      { title: 'Country', key: 'companyCountry' },
      { title: 'City', key: 'companyCity' },
      { title: 'ZipCode', key: 'companyZip' },
      { title: 'Street', key: 'companyStreet' },
      { title: 'Created By', key: 'createdBy' },
      { title: 'Created On', key: 'createdOn' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    companies: [],
    editedIndex: -1,
    editedItem: {
      Company: '', 
      Country: '',
      ZipCode: '',
      Street: '',
      createdBy: '',
    },
    defaultItem: {
      name: '',
      Company: '',
      Country: '',
      ZipCode: '',
      Street: '',
      createdBy: '',
    },
  }),
  contactsDialog: false,
  contactsDialogData: {
    companyName: '',
    contacts: [],
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },



  created() {
    this.initialize()
    this.fetchCompanies();
  },

  methods: {

    openContactsDialog(item) {
  if (this.infoDialog) {
    this.infoDialog = false;
  }

  this.contactsDialogData = {
    companyName: item.companyName,
    contacts: item.contacts || [],
  };

  this.contactsDialog = true;
},

closeContactsDialog() {
    this.contactsDialogData = {
      companyName: '',
      contacts: [],
    };

    this.contactsDialog = false;

    this.infoDialog = false;
  },

    openDetailsDialog(item) {
    this.infoDialog = true;

    this.detailsDialogData = {
      companyName: item.companyName,
      companyCountry: item.companyCountry,
      companyCity: item.companyCity,
      companyZip: item.companyZip,
      companyStreet: item.companyStreet,
      createdBy: item.createdBy,
      createdOn: item.createdOn,
    };
  },

    generateCompanyId() {
      return uuidv4();
  },

  async saveCompany() {
  try {
    if (this.editedIndex > -1) {
      const updatedCompany = {
        companyIdNumber: this.editedItem.companyIdNumber,
        companyName: this.editedItem.companyName,
        companyCountry: this.editedItem.companyCountry,
        companyCity: this.editedItem.companyCity,
        companyZip: this.editedItem.companyZip,
        companyStreet: this.editedItem.companyStreet,
        createdBy: this.editedItem.createdBy,
        createdOn: this.editedItem.createdOn,
      };

      const response = await axios.patch(`http://localhost:8000/company/edit/${this.editedItem.companyIdNumber}`, updatedCompany);

      if (response.data.status) {
        this.showSuccessMessageCompany = true;
        this.successMessageCompany = 'Company updated successfully';

        setTimeout(() => {
          this.showSuccessMessageCompany = false;
        }, 3000);

        this.fetchCompanies();
        this.close();
      } else {
        console.error('Error updating company. Server response:', response.data.message);

        this.showErrorMessageCompany = true;
        this.errorMessageCompany = response.data.message || 'Error updating company.';

        setTimeout(() => {
          this.showErrorMessageCompany = false;
        }, 3000);
      }
    } else {
      this.editedItem.companyIdNumber = this.companies.length + 1;

      const newCompany = {
        companyIdNumber: this.companies.length + 1,
        companyName: this.editedItem.companyName,
        companyCountry: this.editedItem.companyCountry,
        companyCity: this.editedItem.companyCity,
        companyZip: this.editedItem.companyZip,
        companyStreet: this.editedItem.companyStreet,
        createdBy: this.editedItem.createdBy,
        createdOn: new Date().toLocaleDateString(),
      };

      const response = await axios.post('http://localhost:8000/company', newCompany);

      if (response.data.status) {
        this.showSuccessMessageCompany = true;
        this.successMessageCompany = 'Company created successfully';

        setTimeout(() => {
          this.showSuccessMessageCompany = false;
        }, 3000);

        this.fetchCompanies();
        this.close();
      } else {
        console.error('Error creating company. Server response:', response.data.message);

        this.showErrorMessageCompany = true;
        this.errorMessageCompany = response.data.message || 'Error creating company.';

        setTimeout(() => {
          this.showErrorMessageCompany = false;
        }, 3000);
      }
    }
  } catch (error) {
    console.error('Error saving company:', error);

    this.showErrorMessageCompany = true;
    this.errorMessageCompany = 'Error saving company.';

    setTimeout(() => {
      this.showErrorMessageCompany = false;
    }, 3000);
  }
},


    async fetchCompanies() {
      try {
        const response = await axios.get('http://localhost:8000/companies/getAll');
        this.companies = response.data.data || [];
      } catch (error) {
        console.error('Error getting company data:', error);
      }
    },
    initialize() {
      this.companies = [

      ]
    },

    editItem(item) {
      this.editedIndex = this.companies.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.companies.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
  try {
    console.log('Deleting company with ID:', this.editedItem.companyIdNumber);

    const response = await axios.delete('http://localhost:8000/company', { data: { companyIdNumber: this.editedItem.companyIdNumber } });

    if (response.data.status) {
      console.log('Company deleted successfully');

      this.showSuccessMessageCompany = true;
      this.successMessageCompany = 'Company deleted successfully';

      setTimeout(() => {
        this.showSuccessMessageCompany = false;
      }, 3000);

      this.companies = this.companies.filter(company => company.companyIdNumber !== this.editedItem.companyIdNumber);

      console.log('Updated companies array:', this.companies);
      this.closeDelete();
    } else {
      console.error('Error deleting company. Server response:', response.data);

      this.showErrorMessageCompany = true;
      this.errorMessageCompany = response.data.message || 'Error deleting company.';

      setTimeout(() => {
        this.showErrorMessageCompany = false;
      }, 3000);
    }
  } catch (error) {
    console.error('Error deleting company:', error);
  }
},

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.companies[this.editedIndex], this.editedItem);
      } else {
        this.companies.push(this.editedItem);
      }

      this.close();
    }
  },
}
</script>