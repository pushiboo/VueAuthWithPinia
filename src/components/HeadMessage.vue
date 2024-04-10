<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>

  </div>
</template>

<style scoped>
h1 {
  @apply 
    font-medium
    text-2xl
    relative
    top-0
}
h3 {
  @apply
    text-xl
}
.greetings h1,
.greetings h3 {
  @apply text-center
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
   @apply
    text-center 
    border 
    border-emerald-500
  }
}
</style>
