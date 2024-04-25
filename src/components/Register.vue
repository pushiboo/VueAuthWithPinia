<script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core'
  import { email, alpha, required, minLength, between, sameAs } from '@vuelidate/validators'

  const router = useRouter()
  const user = reactive({
    password: '',
    repeatPassword: '',
    show: true
  })
/*   const props = defineProps({
    password: user.password
  }) */
  const rules = {
    password: { required, minLength: minLength(5) },
    repeatPassword: { sameAsPassword: sameAs(user.password)}
  }
  const v$ = useVuelidate(rules, user/* , { $lazy: true } */)

  function setPassword (value) {
     user.password = value
  }
  function repPassword (value) {
     user.repeatPassword = value
  }
  const handleSubmit = (() => {
    v$.value = useVuelidate(rules, user/* , { $lazy: true } */)
    console.log("v$:", v$)
  })

</script>

<template>
  <div class="wrapper ">
    <v-container>
      <v-form>
        <div class="text-h5">Register</div>
        <v-responsive>
        <v-text-field
            v-model.trim="user.password"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
            @change="setPassword(v$.password.$model)"
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
          <v-text-field
            v-model.trim="user.repeatPassword" 
            @input="v$.repeatPassword.$touch"
            @blur="v$.repeatPassword.$touch"
            @change="repPassword(v$.repeatPassword.$model)"
            :error-messages="v$.repeatPassword.sameAsPassword.$errors"
            :append-icon="user.show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="user.show ? 'text' : 'password'"
            hint="At least 5 characters"
            label="Repeat Password"
    
            counter
            autocomplete="off"
            variant="underlined"
            @click:append="user.show = !user.show"
          ></v-text-field>
          <div v-if="!v$.repeatPassword.sameAsPassword.$errors">
<!--             <br>
            $message:
            {{v$.repeatPassword.sameAsPassword.$message}} -->
            <br>
            $response:
            {{v$.repeatPassword.sameAsPassword.$response}}
            <br>
            equalTo:
            {{v$.repeatPassword.sameAsPassword.$params.equalTo}}
            <br>
            otherName:
            {{v$.repeatPassword.sameAsPassword.$params.otherName}}
            <br>
            user:
            {{user}}
          </div>
        </v-responsive>
      </v-form>
    </v-container>

    <v-divider></v-divider>
    <div v class="d-flex justify-center m-2">
      <v-card-actions>

      <v-btn @click="handleSubmit" color="success" size="small" class="d-flex justify-center">
        Complete Registration
      </v-btn>
      </v-card-actions>
    </div>
    <div class="flex justify-center gap-2 text-indigo-500 mb-4">
      <p class="text-sm">Or would you like to > <span @click=" router.push('/login') ">Sign In </span></p>
    </div>

  </div>

</template>


<style>
.wrapper {
  @apply mx-auto max-w-96 dark border border-indigo-900
}

</style>