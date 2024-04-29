<script setup>
  import { ref, onUpdated } from 'vue'
  import { useRouter } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core'
  import { email, alpha, required, minLength, between, sameAs } from '@vuelidate/validators'
import { computed } from 'vue';

  const router = useRouter()

  const user = ref({
    name: '',
    age: null,
    email: '',
    password: '',
    repeatPassword: '',
    show: true
  })
  const rules = {
/*     name: { required, alpha, minLength: minLength(3) },
    age: { required, between: between(20, 30) },
    email: { required, email }, */
    password: { required, minLength: minLength(5) },
    repeatPassword: { sameAsPassword: sameAs(computed(() => user.value.password))}
  }

  const v$ = useVuelidate(rules, user)

 /*  function setName (value) {
     user.value.name = value
  }
  function setAge (value) {
     user.value.age = value
  }
  function setEmail (value) {
     user.value.email = value
  } */
  function setPassword (value) {
     user.value.password = value
  }
  function rePasswd (upasswd, repasswd) {
     if( upasswd === repasswd ){
      return { equal: true, error: '' }
     }else{
      return { equal: false, error: 'The value must be EQUAL to the other value' }
     }
  }
  function repeatPasswd (value) {
     user.value.repeatPassword = value
  }
  const testPasswd = ref('')
  onUpdated(() => {
    testPasswd.value = rePasswd(user.value.password, user.value.repeatPassword)
    console.log("updatetd")
  })

  const handleSubmit = (() => {
   /*  console.log('v$.value.age', v$.value.age.$model ) */
/*    console.log("user.value.repeatPassword:", user.value.repeatPassword) */
/*    console.log("v$.value:", v$.value) */
    console.log("user.password", user.value.password)
 /*    console.log("user.repeatPassword", user.value.repeatPassword)
   console.log("v$.value:", v$.value)
   console.log("v$.value.password.$model:", v$.value.password.$model)
   console.log("v$.value.repeatPassword.$model:", v$.value.repeatPassword.$model)
   console.log("v$.value.repeatPassword.sameAsPassword:", v$.value.repeatPassword.sameAsPassword.$params)
   console.log("v$.value.repeatPassword.sameAsPassword.$response:", v$.value.repeatPassword.sameAsPassword.$response) */
   /* console.log("testPasswd:", rePasswd(v$.password.$model, v$.repeatPassword.$model)) */
   console.log("testPasswd:",testPasswd.value )

/*    console.log("v$.value.repeatPassword.$response:", v$.value.repeatPassword.$response)
   console.log('v$.value.repeatPassword.sameAsPassword:', v$.value.repeatPassword.sameAsPassword )
   console.log('v$.value.repeatPassword.sameAsPassword.$response:', v$.value.repeatPassword.sameAsPassword.$response )
   console.log('v$.value.repeatPassword.sameAsPassword.$pending:', v$.value.repeatPassword.sameAsPassword.$pending ) */
/*    console.log('v$.value.repeatPassword.sameAsPassword.$message:', v$.value.repeatPassword.sameAsPassword.$message ) */
  })
/*   console.log("repeat v$.password.sameAsPassword",v$.value.repeatPassword.sameAsPassword.$response )
  console.log("user.repeatPassword", user.value.repeatPassword)
  console.log("user.repeatPassword.sameAsPassword", v$.value.repeatPassword.sameAsPassword) */
</script>

<template>
  <div class="wrapper ">
  
    <v-container>
      <v-form>
        <div class="text-h5">Register</div>

        <v-responsive>
<!--           <v-text-field
          v-model="user.name"
          @change="setName(user.name)"
          @input="v$.name.$touch"
          :error-messages="v$.name.$errors.map(e => e.$message)"
          color="primary"
          label="Name"
          placeholder="Please enter your name"
          variant="underlined"
          clearable
        ></v-text-field>

          <v-text-field
          v-model="user.age"
          @change="setAge(user.age)"
          @blur="v$.age.$touch"
          @input="v$.age.$touch"
          :counter="v$.age.$model"
          :error-messages="v$.age.$errors.map(e => e.$message)"
          color="primary"
          label="Age"
          placeholder="Please chose between 20 - 30"
          variant="underlined"
          clearable
        ></v-text-field>

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
 -->
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
          <!-- 
            @change="setPassword(user.repeatPassword)"
            name="input-10-1" 
            @input="v$.repeatPassword.$touch"
            :error-message="v$.repeatPassword.sameAsPassword.map(e => e.$message)"
            :error="v$.repeatPassword.sameAsPassword.$response"-->
          <!-- 
            @input="v$.repeatPassword.$touch"
            @change="repeatPassword(user.repeatPassword)"
            @change="setPassword(user.password)"
            -->
          <v-text-field
            v-model.trim="user.repeatPassword" 
            @input="v$.repeatPassword.$touch"
            @blur="v$.repeatPassword.$touch"
            @change="repeatPasswd(v$.repeatPassword.$model)"
            :error-messages="v$.repeatPassword.$errors.map(e => e.$message)"
            :append-icon="user.show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="user.show ? 'text' : 'password'"
            hint="At least 5 characters"
            label="Repeat Password"
    
            counter
            autocomplete="off"
            variant="underlined"
            @click:append="user.show = !user.show"
          ></v-text-field>
          <div v-if="v$.repeatPassword.$error">error: {{v$.repeatPassword.$error }}</div>
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