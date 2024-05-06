<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserAuthServices from '@/services/AuthService'
import { useUserStore } from '../../stores/user.store'
import { useAuthStore } from '../../stores/auth.store'

const userAuth = new UserAuthServices()
const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()
const currDate = Date.now()
const submitted = ref(false)
const name = 'andreasplichta'
const error = ref(null)
const username = ref('Username')
const email = ref('E-Mail')
const password = ref('Password')
const holder = ref("can't be empty")
const user = ref({
  id: null,
  username: '',
  forename: '',
  surname: '',
  email: '',
  password: '',
  active: true,
  'ad-account': '',
  role: 'user',
  'function-role': true,
  'api-token': 'none',
  additional: 'admin notes about the person'
})

// disabling the default behaivor of the required input field
/* document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
        document.getElementById("username").focus();
      };
    })(), true); */

const handleSubmit = async () => {
  let data = user.value

  await userAuth
    .signin_post(data)
    .then((res) => {
      const data = res.data

      userStore.receiveUser(data)
      authStore.receiveAuth(data)
      submitted.value = true
      localStorage.setItem(
        'andreasplichta',
        JSON.stringify({ name: name, state: true, date: currDate })
      )
      error.value = null
      userStore.active = true
      authStore.active = true
      router.push({ name: 'home' })
    })
    .catch((err) => {
      /*       error.value = err.message
      console.log(`SignInView.vue | ERROR: occured during create user, see error message: ${err}`) */
      console.log('login_signin.err: ', err)
      /* error.value = err */
      error.value = err.response.data.errors
      /* error.value = err.message */
      console.log(`LoginView.vue | ERROR: occured during create user, see error message: ${err}`)
      console.log('LoginView.vue | ERROR: ', error.value)
      if (error.value.email) {
        error.value = error.value.email
        console.log('username')
      } else if (error.value.password) {
        error.value = error.value.password
        console.log('password')
      } else {
        console.log('default', error.value)
        error.value = error.value = 'some other error occured here'
      }
    })

  return { user, handleSubmit, error }
}
const handleClick = () => {
  if (user.value.username && user.value.email && user.value.password) {
    username.value = 'Username'
    email.value = 'E-Mail'
    password.value = 'Password'
    console.log('Now success!')

    handleSubmit()
  }
  if (!user.value.username) {
    username.value = 'Username'
    console.log('No User data entered')
    document.getElementById('username').setAttribute('class', 'require')
    username.value = `${username.value} ${holder.value}`
  }
  if (!user.value.email) {
    email.value = 'E-Mail'
    console.log('No Email data entered')
    document.getElementById('email').setAttribute('class', 'require')
    email.value = `${email.value} ${holder.value}`
  }
  if (!user.value.password) {
    password.value = 'Password'
    console.log('No Pasword data entered')
    document.getElementById('password').setAttribute('class', 'require')
    password.value = `${password.value} ${holder.value}`
  }
}
</script>

<template>
  <div class="wrapper">
    <div v-if="!submitted">
      <form @submit.prevent="handleClick" name="signin" id="signin">
        <h2>Sign in</h2>
        <div class="form-content">
          <input
            type="text"
            autocomplete="firstname"
            placeholder="Firstname"
            v-model="user.forename"
          />
          <input type="text" autocomplete="surname" placeholder="Surname" v-model="user.surname" />
          <input
            id="username"
            type="text"
            autocomplete="username"
            :placeholder="username"
            v-model="user.username"
          />
          <input
            id="email"
            type="email"
            autocomplete="email"
            :placeholder="email"
            v-model="user.email"
          />
          <input
            id="password"
            type="password"
            autocomplete="new-password"
            :placeholder="password"
            v-model="user.password"
          />
          <!--
            Here we're creating some errors on our form when the user tries to login and something went wrong
          -->
          <div class="password error">{{ error }}</div>
          <button>Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply h-max w-96
      max-w-lg min-w-max
      rounded-md 
      shadow;
}
h2 {
  @apply pb-2
      text-lg text-slate-600 
      uppercase font-semibold
      border-b border-slate-300;
}
button {
  @apply mt-2;
}
.form-content {
  @apply flex flex-col py-2 
      h-auto;
}
.form-content input {
  @apply mb-4 px-2 py-1;
}
.form-content,
label {
  @apply mb-0 flex font-bold;
}
.error {
  @apply text-rose-600 text-center;
}
</style>
