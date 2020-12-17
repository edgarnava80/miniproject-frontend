<template>
  <div id="app">
    <b-button id="userModal" @click="createUser()" variant="primary">Create new user</b-button>
    <b-modal v-model="show" id="modal-lg" no-close-on-esc no-close-on-backdrop hide-footer centered scrollable>
      <template #modal-header="{ }">
        <h5>{{ message }}</h5>
      </template>
      <b-container>
        <b-form @submit.prevent="handleSubmit()">
          <b-form-group>
            <b-form-input v-model="firstName" type="text" placeholder="First name" class="mb-2" />
            <b-form-input v-model="lastName" type="text" placeholder="Last name" class="mb-2" />
            <b-form-input v-model="email" type="text" placeholder="Email" class="mb-2" />
          </b-form-group>
          <b-form-group>
            <b-button class="mr-4" type="submit" variant="success">Submit</b-button>
            <b-button @click="handleCancel()" type="cancel" variant="danger">Cancel</b-button>
          </b-form-group>
        </b-form>
      </b-container>
    </b-modal>
    <b-container>
      <h3 class="m-4">Users</h3>
      <div class="users">
        <b-table responsive small sticky-header="350px" striped hover :items="items" :fields="fields">
          <template #cell(edit)="data">
            <b-button @click="editUser(data.item)" v-b-modal.modal-lg class="btn btn-success" size="sm">{{ (data.value = "Edit") }}</b-button>
          </template>
          <template #cell(delete)="data">
            <b-button @click="handleDelete(data.item.id)" class="btn btn-danger" size="sm">{{ (data.value = "Delete") }}</b-button>
          </template>
        </b-table>
      </div>
    </b-container>
  </div>
</template>

<script>
import Vue from "vue"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
//import UsersList from "./components/UsersList.vue"
//import UserForm from "./components/UserForm.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "App",
  data() {
    return {
      show: false,
      action: 0,
      message: "",
      id: "",
      firstName: "",
      lastName: "",
      email: ""
    }
  },
  // components: {
  //   UsersList
  // },
  methods: {
    ...mapActions(["fetchUsers", "addUser", "deleteUser", "modifyUser"]),
    createUser() {
      this.show = true
      this.action = 1
      this.message = "Create new user"
    },
    editUser(item) {
      this.show = true
      this.action = 2
      this.message = "Edit user"
      this.id = item.id
      this.firstName = item.firstName
      this.lastName = item.lastName
      this.email = item.email
    },
    handleSubmit() {
      this.show = false
      if (this.action === 1) {
        this.addUser({ firstName: this.firstName, lastName: this.lastName, email: this.email })
        this.action = 0
      } else if (this.action === 2) {
        this.handleEdit()
      }
    },
    handleCancel() {
      this.show = false
      this.id = ""
      this.firstName = ""
      this.lastName = ""
      this.email = ""
    },
    handleEdit() {
      console.log("handle edit")
      this.modifyUser({ id: this.id, firstName: this.firstName, lastName: this.lastName, email: this.email })
      //console.log({ id: this.id, firstName: this.firstName, lastName: this.lastName, email: this.email })
      this.show = false
    },
    handleDelete(id) {
      this.deleteUser(id)
      //this.fetchUsers()
      console.log(this.items)
    }
  },
  computed: mapGetters(["items", "fields"]),
  created() {
    this.fetchUsers()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
