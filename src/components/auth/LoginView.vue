<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserAuthServices from '../../services/AuthService'
import { useUserStore } from '../../stores/user.store'
import { useAuthStore } from '../../stores/auth.store'

const userAuth = new UserAuthServices()
const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()
const name = 'andreasplichta'
const currDate = Date.now()
const submitted = ref(false)
const error = ref(null)
const username = ref('Username')
const email = ref('E-Mail')
const password = ref('Password')
const holder = ref("can't be empty")
const user = ref({
  id: null,
  username: '',
  email: '',
  password: ''
})

// disabling the default behaivor of the required input field
/*   document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
        document.getElementById("password").focus();
    };
  })(), true); */

const handleSubmit = async () => {
  let data = {
    username: user.value.username,
    password: user.value.password
  }

  await userAuth
    .login_post(data)
    .then((res) => {
      const data = res.data
      userStore.receiveUser(data)
      authStore.receiveAuth(data)
      localStorage.setItem(
        'andreasplichta',
        JSON.stringify({ name: name, state: true, date: currDate })
      )
      error.value = null
      router.push({ name: 'home' })
    })
    .catch((err) => {
      console.log('login_post.err: ', err)
      error.value = err.response.data.errors
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
  if (user.value.username && user.value.password) {
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
      <form name="login" @submit.prevent="handleClick">
        <h2>Login</h2>
        <div class="form-content">
          <input
            id="username"
            type="text"
            autocomplete="username"
            :placeholder="username"
            v-model="user.username"
          />
          <input
            id="password"
            type="password"
            autocomplete="new-password"
            :placeholder="password"
            v-model="user.password"
          />
          <!-- Here we're creating some errors on our form when the user tries to login and something went wrong -->
          <div class="password error">{{ error }}</div>
          <button>Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply h-max mx-auto w-80
    
    /* sm:w-full */ /* md:w-64 lg:w-96 */
      /* max-w-lg  *//* min-w-max */
      rounded-md 
      shadow
      /* border border-slate-100  */;
}
h2 {
  @apply pb-2
    text-lg text-slate-600 
    uppercase font-semibold
    border-b border-slate-300;
}
form {
  @apply border border-gray-100;
}
button {
  @apply mt-2
    /* hover:border */ /* hover:shadow-inner */;
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
