import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authUser', {
  state: () => (
    {
      storeUserName: '',
      storeUserEmail: '',
      storeUserRole: ''
    }
  ),
  getters: {
    getUserstate: (state) => state,
    getUserEmail: (state) => state.storeUserEmail,
    getUserRole: (state) => state.storeUserRole,
  },
  actions: {
    updateUser(user) {
      this.$state = {
        storeUserName: user.user,
        storeUserEmail: user.email,
        storeUserRole: user.role
      }
    },
    registerUser(user) {
      this.$state = {
        storeUserName: user.user,
        storeUserEmail: user.email,
        storeUserRole: user.role
      }
    }
  }
})
