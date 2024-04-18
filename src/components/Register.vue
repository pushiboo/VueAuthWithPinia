<script setup>
  import { reactive } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'


  const initialState = {
    first: '',
    last: '',
    email: '',
    terms: null,
    checkbox: null,
  }

  const state = reactive({
    ...initialState,
  })

  const rules = {
    first: { required },
    last: { required },
    email: { required, email },
    terms: { required },
    items: { required },
    checkbox: { required },
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
      <div class="text-h5">Register</div>
      <v-text-field
        v-model="state.first"
        color="primary"
        label="First name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="state.last"
        color="primary"
        label="Last name"
        variant="underlined"
      ></v-text-field>

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

      <v-btn color="success" size="small" class="d-flex justify-center">
        Complete Registration
      </v-btn>
      </v-card-actions>
    </div>
    <div class="flex justify-center gap-2 text-indigo-500 mb-4">
      <p class="text-[10px]">Or would you like to ></p>
      <RouterLink class="text-sm" to="login">Sign In</RouterLink>
    </div>

  </div>

</template>


<style>
.wrapper {
  @apply mx-auto max-w-80 dark border border-indigo-900
}

</style>