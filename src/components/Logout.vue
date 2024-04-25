<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

</script>

<template>
  <div class="wrapper">
    <v-container>
      <div class="text-h5">Logout </div>

    </v-container>

    <v-divider></v-divider>
    <div class="d-flex justify-center m-2">
      <v-card-actions>

      <v-btn @click="router.push({ name: 'login'})" color="error" size="small" class="d-flex justify-center">
        Logout
      </v-btn>
      </v-card-actions>
    </div>
  </div>

</template>


<style>
.wrapper {
  @apply mx-auto max-w-96 dark border border-indigo-900
}

</style>