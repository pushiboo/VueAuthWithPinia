import { defineStore } from 'pinia'
import AuthServices from '@/services/auth.service'

const AuthService = new AuthServices()
const cookieName = 'andreasplichta'
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
      // this.storeUser = user.user
      // this.storeEmail = user.email
      // this.storeRole = user.role
      // localStorage.setItem(cookieName, JSON.stringify(this.getUserstate))
      console.log("STATE######", this.$state, JSON.stringify(this.$state));
      
      // this.role = role
    },
    registerUser(user) {
      this.$state = {
        storeUserName: user.user,
        storeUserEmail: user.email,
        storeUserRole: user.role
      }
    }

    // toggleDarkMode() {
    //   this.darkMode = !this.darkMode
    //   if(this.darkMode){
    //     document.querySelector('html').classList.add('dark');
    //     localStorage.setItem('dark-mode', true)
    //   }else{
    //     document.querySelector('html').classList.remove('dark');
    //     localStorage.setItem('dark-mode', false)
    //   }
    // }
  }
})
