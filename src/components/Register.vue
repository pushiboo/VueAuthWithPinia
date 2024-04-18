<script setup>
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiThemeLightDark } from '@mdi/js';

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
  <v-card
    id="vcard"
    class="mx-auto"
    max-width="344"
    title="User Registration"
  >
    <v-container>
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

      <v-checkbox
        v-model="state.terms"
        color="secondary"
        label="I agree to site terms and conditions"
      ></v-checkbox>
    </v-container>
    <v-icon icon="mdi-home" />
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

  <div>
    <p>HOME</p>
    <v-icon icon="mdi-home" />
    <svg-icon type="mdi" :path="path"></svg-icon>
  </div>

</template>


<style>
#vcard {
  @apply mx-auto max-w-80 dark
}
#vtext-field {
  @apply text-[8px]
}
/* div {
  @apply text-center
}
form {
  @apply text-indigo-500
  border-indigo-900
  border
  rounded-lg
  px-6 py-3
}
.regInput {
  @apply w-auto p-4 flex justify-center
}
.select {
  @apply active:bg-black
}
 */
</style>