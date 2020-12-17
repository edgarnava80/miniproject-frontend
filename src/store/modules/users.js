import Axios from "axios"

const state = {
  fields: ["firstName", "lastName", "email", "edit", "delete"],
  users: [],
  show: false,
  id: "",
  firstName: "",
  lastName: "",
  email: ""
}

const getters = {
  items: state => state.users,
  fields: state => state.fields,
  getShow: state => state.show,
  getId: state => state.id,
  getFirstName: state => state.firstName,
  getLastName: state => state.lastName,
  getEmail: state => state.email
}

const actions = {
  async fetchUsers({ commit }) {
    try {
      const response = await Axios.get("https://boiling-chamber-67613.herokuapp.com/api/v1/users")
      commit("setUsers", response.data.users)
    } catch (err) {
      console.log("Error in Get All Users", err)
    }
  },
  async addUser({ commit }, user) {
    try {
      const response = await Axios.post("https://boiling-chamber-67613.herokuapp.com/api/v1/users", user)
      commit("newUser", response.data)
    } catch (err) {
      console.log("Error adding user", err)
    }
  },
  async deleteUser({ commit }, id) {
    try {
      const response = await Axios.delete(`https://boiling-chamber-67613.herokuapp.com/api/v1/users/${id}`)
      commit("removeUser", id)
      console.log("User removed ", response)
    } catch (err) {
      console.log("Error deleting user", err)
    }
  },
  async modifyUser({ commit }, user) {
    console.log("editUser action ", user)
    try {
      const response = await Axios.patch(`https://boiling-chamber-67613.herokuapp.com/api/v1/users/${user.id}`, user)
      commit("updateUser", user.id)
      console.log("User updated ", response)
    } catch (err) {
      console.log("Error updated user", err)
    }
  }
}

const mutations = {
  setUsers: (state, users) => (state.users = users),
  newUser: (state, user) => state.users.push(user),
  removeUser: (state, id) => state.users.filter(user => user.id !== id),
  updateUser: (state, newUser) => {
    state.users.filter(user => user.id !== newUser.id)
    state.users.push(newUser)
  }
  // setShow: (state, show) => (state.show = show),
  // setId: (state, id) => (state.id = id),
  // setFirstName: (state, firstName) => (state.firstName = firstName),
  // setLastName: (state, lastName) => (state.lastName = lastName),
  // setEmail: (state, email) => (state.email = email)
}

export default {
  state,
  getters,
  actions,
  mutations
}
