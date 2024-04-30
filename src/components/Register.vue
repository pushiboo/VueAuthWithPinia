<script setup>
  import { ref, onUpdated, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core'
  import { email, alpha, required, minLength, between, sameAs } from '@vuelidate/validators'
  import UserServices from '@/services/users.service'
  import { camelize } from 'vue'


  const router = useRouter()
  const UserService = new UserServices()
  const testPasswd = ref('')
  const user = ref({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    show: false
  })
  const rules = {
    name: { required, alpha, minLength: minLength(3) },
    /* age: { required, between: between(20, 30) }, */
    email: { required, email },
    password: { required, minLength: minLength(5) },
    repeatPassword: { sameAsPassword: sameAs(computed(() => user.value.password))}
  }
  const v$ = useVuelidate(rules, user)
  const handleClick = () => {
    handleSubmit()
  }
  const handleSubmit = async () => {
/*  
    e.preventDefault() 
    console.log("e:", e) */
    let data = JSON.stringify(user.value)
    console.log("BEVORE SEND data", data)
    await UserService
      .create(data)
      .then((res) => {
        const data = res.data
        console.log("res.data", data )
        router.push({name: "home"})
      })
      .catch((err) => {
        console.log("err", err)
      })


/*     if(!v$.value.repeatPassword.$error){
      console.log("SUBMIT:", v$.value.repeatPassword.$error)
      console.log("SUBMIT:",  user.value)
      try {
        UserService.create(user.value)
      }
      catch {
        console.log("ERRoR catched ")
      }

      return UserService.create(user.value) 
    }else{
      return console.log("ERROR:", v$.value.repeatPassword.$error)
    } */
    /* console.log("user.password", user.value.password) */
   /*  console.log("PASSED:", v$ ) */
  }
/* 
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
  } */

  onUpdated(() => {
      testPasswd.value = rePasswd(user.value.password, user.value.repeatPassword)
  })


</script>

<template>
  <div class="wrapper">
  
    <v-container>
      <v-form @submit.prevent="handleClick">
        <div class="text-h5">Register</div>
<!-- 
@change="setName(user.name)"
@change="setAge(user.age)"
@change="setEmail(user.email)"
@change="setPassword(v$.password.$model)"
@change="repeatPasswd(v$.repeatPassword.$model)"
clearableS
 -->
        <v-responsive>
          <v-text-field
            v-model="user.name"
            @input="v$.name.$touch"
            :error-messages="v$.name.$errors.map(e => e.$message)"
            color="primary"
            label="Name"
            placeholder="Please enter your name"
            variant="underlined"
            clearable
          ></v-text-field>
<!--           <v-text-field
            v-model="user.age"
            @blur="v$.age.$touch"
            @input="v$.age.$touch"
            :counter="v$.age.$model"
            :error-messages="v$.age.$errors.map(e => e.$message)"
            color="primary"
            label="Age"
            placeholder="Please chose between 20 - 30"
            variant="underlined"
            clearable
          ></v-text-field> -->
          <v-text-field
            v-model="user.email"
            @input="v$.email.$touch"
            :error-messages="v$.email.$errors.map(e => e.$message)"
            color="primary"
            label="Email"
            placeholder="Please enter your email"
            variant="underlined"
            
          ></v-text-field>
          <v-text-field
              v-model.trim="user.password"
              @input="v$.password.$touch"
              @blur="v$.password.$touch"
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
        </v-responsive>

        <v-divider></v-divider>
        <div v class="d-flex justify-center m-2">
          <v-card-actions>
           <!--  <SubmitButton @submit.submit.prevent="handleSubmit"  class="d-flex justify-center">Registration</SubmitButton> -->
            <v-btn @click="handleClick" color="success" size="small" class="d-flex justify-center">
              Complete Registration
            </v-btn>
            <div v-if="v$.repeatPassword.$error">error: {{v$.repeatPassword.$error }}</div>
          </v-card-actions>
        </div>
        <div class="flex justify-center gap-2 text-indigo-500 mb-4">
          <p class="text-sm">Or would you like to > <span @click=" router.push('/login') ">Sign In </span></p>
        </div>  
      </v-form>
    </v-container>
  </div>

</template>


<style>
.wrapper {
  @apply mx-auto max-w-96 dark border border-indigo-900
}

</style>