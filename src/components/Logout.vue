<script setup>
  import { reactive } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core'
  import { email, minLength, required } from '@vuelidate/validators'

  const router = useRouter()
  const initialState = {
    email: '',
    password: ''
  }

  const state = reactive({
    ...initialState,
  })

  const rules = {
    email: { required, email },
    password: { required, minLength}
  }

  const v$ = useVuelidate(rules, state)

  function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }

</script>

<template>
  <div class="wrapper">
    <v-container>
      <div class="text-h5">Logout </div>

      <v-text-field
        v-model="state.email"
        color="primary"
        label="Email"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="state.password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>

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
  @apply mx-auto max-w-80 dark border border-indigo-900
}

</style>