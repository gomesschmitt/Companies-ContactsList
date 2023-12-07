<template>
  <NavBar />
  <v-data-table :headers="headers" :items="companies" :sort-by="[{ key: 'calories', order: 'asc' }]">
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
                    <v-text-field v-model="editedItem.name" label="Company Id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Company" label="Company"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Country" label="Country"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.City" label="City"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.ZipCode" label="Zip Code"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Street" label="Street"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.MailAddress" label="Mail Address"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Contacts" label="Contacts"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.CreatedBy" label="Created By"></v-text-field>
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
              <v-btn color="blue-darken-1" variant="text" @click="save">
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
import NavBar from '../components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    model: 'rounded-0',
    headers: [
      {
        title: 'Companies ID',
        align: 'start',
        sortable: false,
        key: 'name',
      },
      { title: 'Company Name', key: 'Company' },
      { title: 'Country', key: 'Country' },
      { title: 'City', key: 'City' },
      { title: 'Zip Code', key: 'ZipCode' },
      { title: 'Street', key: 'Street' },
      { title: 'Mail Address', key: 'MailAddress' },
      { title: 'Contacts', key: 'Contacts' },
      { title: 'Created By', key: 'CreatedBy' },
      { title: 'Created On', key: 'CreatedOn' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    companies: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      Company: '',
      Country: '',
      ZipCode: '',
      Street: '',
      MailAddress: '',
      Contacts: '',
      CreatedBy: '',
    },
    defaultItem: {
      name: '',
      Company: '',
      Country: '',
      ZipCode: '',
      Street: '',
      MailAddress: '',
      Contacts: '',
      CreatedBy: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
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

    deleteItemConfirm() {
      this.companies.splice(this.editedIndex, 1)
      this.closeDelete()
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
      if (this.editedIndex === -1) {
        this.editedItem.CreatedOn = new Date().toLocaleDateString();
      }

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
