<script setup>
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

  const initialState = {
    name: '',
    email: ''
  }

  const state = reactive({
    ...initialState,
  })

  const rules = {
    name: { required },
    email: { required, email }
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
    <h1>Login</h1>
  </div>
  <div class="regInput">
    <form>
      <v-text-field
        v-model="state.name"
        :counter="10"
        :error-messages="v$.name.$errors.map(e => e.$message)"
        label="Name"

        required
        @blur="v$.name.$touch"
        @input="v$.name.$touch"
      ></v-text-field>

      <v-responsive
        class="mx-auto"
        max-width="244"
      >
        <v-text-field
          v-model="state.email"
          :error-messages="v$.email.$errors.map(e => e.$message)"
          hide-details="auto"
          label="Email address"
          placeholder="forename@surename.com"
          type="email"
          required
          @blur="v$.email.$touch"
          @input="v$.email.$touch"
        ></v-text-field>
      </v-responsive>

      <v-btn
        density="comfortable"
        size="small"
        color="primary"
        class="me-4"
        @click="v$.$validate"
      >
        login
      </v-btn>

    </form>
  </div>


 
</template>

<style>
div {
  @apply text-center
}
form {
  @apply text-indigo-500
  /*  */
  /* w-48 items-center */
  w-52
  border-indigo-900
  border
  rounded-lg
  px-6 py-3
}
.regInput {
  @apply w-auto p-4  flex justify-center
}
</style>