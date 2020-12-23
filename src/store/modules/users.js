import Axios from "axios"

const state = {
  fields: ["firstName", "lastName", "email", "edit", "delete"],
  users: []
}

const getters = {
  items: state => state.users,
  fields: state => state.fields
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
      commit("newUser", response.data.user)
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
    try {
      const response = await Axios.patch(`https://boiling-chamber-67613.herokuapp.com/api/v1/users/${user.id}`, user)
      commit("updateUser", user)
      console.log("User updated ", response)
    } catch (err) {
      console.log("Error updated user", err)
    }
  }
}

const mutations = {
  setUsers: (state, users) => (state.users = users),
  newUser: (state, user) => {
    state.users.push(user)
  },
  removeUser: (state, id) => {
    const userIndex = state.users.findIndex(user => user.id == id)
    state.users.splice(userIndex, 1)
  },
  updateUser: (state, newUser) => {
    const userIndex = state.users.findIndex(user => user.id == newUser.id)
    state.users.splice(userIndex, 1, newUser)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
