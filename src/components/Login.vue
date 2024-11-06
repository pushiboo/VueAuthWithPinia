<script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core'
  import { email, minLength, required } from '@vuelidate/validators'
  // import UserServices from '@/services/users.service'
  import AuthServices from '@/services/auth.service'
  import { watchEffect } from 'vue'
  import { useAuthStore } from '@/stores/auth.store.js'

  // const UserService = new UserServices()
  const router = new useRouter()
  const authStore = useAuthStore()
  const { updateUser } = authStore
  const user = ref({
    email: '',
    password: '',
    show: false
  })
  let error = ref('')
  const AuthService = new AuthServices()

  const storageLoginCache = localStorage.getItem('LoginCache')
  if (storageLoginCache) {
    user.value.email = storageLoginCache
    console.log("storageLoginCache",storageLoginCache);
  }
  watchEffect(() => {
    // user.email.value
    console.log("user.email.value:", typeof(user.value.email),user.value.email);
    localStorage.setItem('LoginCache', user.value.email)

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

  const handleClick = async () => {
    let data = {
      email: user.value.email,
      password: user.value.password
    }

    console.log("handleClick, data", data)
   /*  const getUser = await UserService.findByEmail(user.value.email)
    console.log("getUser:", getUser.value) */
    /* const authLogin = await  */
    await AuthService
      .login_post(data)
      .then(res =>{
        const data = res.data
        let user = { user: data.user, email: data.email, role: data.role}
        console.log("LOGIN res.data", res.data )
        console.log("LOGIN user", user )
        user.role = 'd e v'
        updateUser(user)
        // localStorage.setItem()
        // storeUser = data.user
        // storeEmail = data.email
        // updateUser.user = res.data.user
        // updateUser(data.email)

        // updateUser.role = res.data.role
        // console.log("then data", data.user, data.email, data.role)
        router.push({name: "home"})
      })
      .catch(err => {
        error.value = err.message
        console.log('LoginView.vue | ERROR: ', err.message)
      })
    /* console.log("getUser:", getUser) */
    /* console.log("authLogin:", authLogin) */
  }

  function onEnter () {
    console.log("enter hit successfull");
    
  }

  // const handleSubmit = async () => {
  //   let data = {
  //     username: user.value.username,
  //     password: user.value.password
  //   }

  //   await userAuth
  //     .login_post(data)
  //     .then((res) => {
  //       const data = res.data
  //       userStore.receiveUser(data)
  //       authStore.receiveAuth(data)
  //       localStorage.setItem(
  //         'andreasplichta',
  //         JSON.stringify({ name: name, state: true, date: currDate })
  //       )
  //       error.value = null
  //       router.push({ name: 'home' })
  //     })
  //     .catch((err) => {
  //       console.log('login_post.err: ', err)
  //       error.value = err.response.data.errors
  //       console.log(`LoginView.vue | ERROR: occured during create user, see error message: ${err}`)
  //       console.log('LoginView.vue | ERROR: ', error.value)
  //       if (error.value.email) {
  //         error.value = error.value.email
  //         console.log('username')
  //       } else if (error.value.password) {
  //         error.value = error.value.password
  //         console.log('password')
  //       } else {
  //         console.log('default', error.value)
  //         error.value = error.value = 'some other error occured here'
  //       }
  //     })

  //   return { user, handleSubmit, error }
  // }

</script>

<template>
  <div class="wrapper">
    <v-container>
      <div class="text-h5">Login</div>
      <!-- <v-form @submit.prevent="handleSubmit"> -->
      <v-form @submit.prevent="onEnter()" >
      <!-- <v-form  > -->
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
            v-model="user.password"
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

          <v-card-actions class="d-flex justify-center item  ">

              <!-- <v-btn @click="handleClick" color="success" size="small">Login</v-btn> -->
              <v-btn type="submit" @click="handleClick" color="success" size="small">Login</v-btn>

              <span class="text-red" v-if="error">{{ error }}</span>
            <!-- <v-btn @click="handleSubmit" color="success" size="small" class="d-flex justify-center">Login</v-btn> -->
          </v-card-actions>
          <v-alert class="justify-center"
                v-if="error"
                color="error"
               >
                {{ error }}
          </v-alert>
      </v-form>
      <!-- 
          @change="setEmail(user.email)"  
          @change="setPassword(user.password)"
      -->
    </v-container>

    <v-divider></v-divider>
    <div class="d-flex justify-center m-2"> 
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