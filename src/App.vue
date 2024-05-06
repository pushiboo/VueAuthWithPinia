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
      place-items-center
  }
}
/* .wrapper {
  @apply w-96
} */
</style>
