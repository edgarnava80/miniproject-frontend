<template>
  <b-container>
    <b-form @change="handleChange">
      <b-form-group>
        <b-form-input v-model="firstName" type="text" placeholder="First name" class="mb-2" />
        <b-form-input v-model="lastName" type="text" placeholder="Last name" class="mb-2" />
        <b-form-input v-model="email" type="text" placeholder="Email" class="mb-2" />
      </b-form-group>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "UserForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: ""
    }
  },
  methods: {
    ...mapActions(["addUser", "updateFirstName", "updateLastName", "updateEmail"]),
    handleChange() {
      this.updateFirstName(this.firstName)
      this.updateLastName(this.lastName)
      this.updateEmail(this.email)
    }
  }
}
</script>

<style></style>
