<script setup>
  import { reactive, ref } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

  const initialState = {
    name: '',
    email: ''
  }
  const visible = ref(false)

  const state = reactive({
    ...initialState,
  })

  const rules = {
    name: { required },
    email: { required, email }
  }

  const v$ = useVuelidate(rules, state)

/*   function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }
 */
</script>

<template>
  <div class="wrapper">
    <h1>Login</h1>
  </div>
  <div class="regInput">

  <div>


    <v-card
      class="mx-auto pa-12 pb-8 bg-[--color-background]"
      elevation="4"
      max-width="448"
      rounded="sm"
    >
      <div class="text-subtitle-1 text-medium-emphasis ">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
      </v-card>

      <v-btn
        class="mb-8"
        color="blue"
        size="small"
        variant="tonal"
        block
      >
        Log In
      </v-btn>

      <v-card-text class="text-center" id="test">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
<!-- 
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

    </form> -->
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
v-card {
  @apply text-xs bg-black
}
text {
  @apply text-xs
}
v-card-text {
  @apply text-[6px]
}
#id {
  @apply text-[6px]
}
</style>