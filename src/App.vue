<script setup>
import { RouterView } from 'vue-router'
import HeadMessage from './components/HeadMessage.vue'
import Nav from './components/Nav.vue'

</script>

<template>
  <header>
    <div class="wrapper">
      <HeadMessage msg="VueAuthWithPinia" />
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
    mb-2
}
@media (min-width: 1024px) {
  header {
    @apply 
      flex justify-center
      /* pr-[var(--section-gap)] */
      place-items-center
  }
/*   header .wrapper {
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
  } */
}
</style>
