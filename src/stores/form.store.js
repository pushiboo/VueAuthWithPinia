import { defineStore } from 'pinia'

export const useFormStore = defineStore('form',{
  state: () => (
    {
      user: {
        name: '',
        age: '',
        email: '',
        show: false
      }
    }
  ),
  getters: {
    getUser: (state) => state.user
  },
  // actions: {
  //   toggleDarkMode() {
  //     this.darkMode = !this.darkMode
  //     if(this.darkMode){
  //       document.querySelector('html').classList.add('dark');
  //       localStorage.setItem('dark-mode', true)
  //     }else{
  //       document.querySelector('html').classList.remove('dark');
  //       localStorage.setItem('dark-mode', false)
  //     }
  //   }
  // }
})
