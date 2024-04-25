<script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core'
  import { email, minLength, required } from '@vuelidate/validators'

  const user = ref({
    email: '',
    password: '',
    show: false
  })
  const rules = ref({
    email: { required, email },
    password: { required, minLength: minLength(5)}
  })
  const v$ = useVuelidate(rules, user)

  function clear () {
    v$.value.$reset()
    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }


  function setEmail (value) {
     user.value.email = value
  }
  function setPassword (value) {
     user.value.password = value
  }
</script>

<template>
  <div class="wrapper">
    <v-container>
      <div class="text-h5">Login</div>

      <v-text-field
          v-model="user.email"
          @change="setEmail(user.email)"
          @input="v$.email.$touch"
          :error-messages="v$.email.$errors.map(e => e.$message)"
          color="primary"
          label="Email"
          placeholder="Please enter your email"
          variant="underlined"
          clearable
        ></v-text-field>

        <v-text-field
            v-model="user.password"
            @change="setPassword(user.password)"
            @input="v$.password.$touch"
            :error-messages="v$.password.$errors.map(e => e.$message)"
            :append-icon="user.show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="user.show ? 'text' : 'password'"
            hint="At least 5 characters"
            label="Password"
            name="input-10-1"
            counter
            autocomplete="off"
            variant="underlined"
            @click:append="user.show = !user.show"
          ></v-text-field>

    </v-container>

    <v-divider></v-divider>
    <div class="d-flex justify-center m-2">
      <v-card-actions>

      <v-btn color="success" size="small" class="d-flex justify-center">
        Login
      </v-btn>
      </v-card-actions>
    </div>
    <div class="flex justify-center gap-2 text-indigo-500 mb-4">
      <p class="text-sm">Please register here:</p>
      <RouterLink class="text-sm" to="register">Register</RouterLink>
    </div>

  </div>

</template>


<style>
.wrapper {
  @apply mx-auto max-w-96 dark border border-indigo-900
}

</style>