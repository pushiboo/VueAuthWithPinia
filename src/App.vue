<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Nav from './components/Nav.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="VueAuthWithPinia" />
      <Nav />

    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  @apply 
    leading-normal
    max-h-screen
}
@media (min-width: 1024px) {
  header {
    @apply 
      flex
      pr-[var(--section-gap)]
      place-items-center
  }
  header .wrapper {
    @apply 
    flex 
    flex-wrap
    place-items-start 
  }
  nav {
    @apply 
      text-left
      text-base
      ml-[-1rem]
      p-4 pr-0
  }
}
</style>
