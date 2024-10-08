import { defineStore } from 'pinia'

export const useNavStore = defineStore('dark', {
  state: () => (
    {
      darkMode: true,
      userStoreDarkMode: true
    }
  ),
  getters: {
    getDarkMode: (state) => state.darkMode
  },
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      if(this.darkMode){
        document.querySelector('html').classList.add('dark');
        localStorage.setItem('dark-mode', true)
      }else{
        document.querySelector('html').classList.remove('dark');
        localStorage.setItem('dark-mode', false)
      }
    }
  }
})
