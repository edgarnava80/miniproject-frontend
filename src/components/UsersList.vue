<template>
  <b-container>
    <h3 class="m-4">Users</h3>
    <div class="users">
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(edit)="data">
          <b-button v-b-modal.modal-lg class="btn btn-success">{{ (data.value = "Edit") }}</b-button>
        </template>
        <template #cell(delete)="data">
          <b-button class="btn btn-danger">{{ (data.value = "Delete") }}</b-button>
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "UsersList",
  methods: {
    ...mapActions(["fetchUsers"])
  },
  computed: mapGetters(["items", "fields"]),
  created() {
    this.fetchUsers()
  }
}
</script>

<style></style>
