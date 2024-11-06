<script setup>
  import { useRouter } from 'vue-router'
  import AuthServices from '@/services/auth.service'
  import { ref } from 'vue';

  const router = useRouter()
  const AuthService = new AuthServices()
  const logoutMessage = ref({
    message: {
      good: '',
      error: ''
    }
  })

  const logout = async () => {
    await AuthService
      .logout_delete()
      .then(res => {
        console.log("res.data.message",res);
        // logoutMessage.value.message.good = res.data.message
        // setTimeout(() => {
        //   router.push({name: 'login'})
        // }, 3000)
        // console.log(res.data.message);
      })
      .catch(err =>  {
        console.log("Logout err", err.message);
      })
  }
  const get = async () => {
    await AuthService
      .login_get()
      .then(res => {
        console.log("GET: res.data.message",res.data.decodetToken);
      })
      .catch(err =>  {
        console.log("GET err", err.message);
      })
  }


</script>

<template>
  <div class="wrapper">
    <v-container>
      <div class="text-h5">Logout </div>
      <div v-if="logoutMessage.message.good">{{logoutMessage.message.good}}</div>
      <div v-else >{{logoutMessage.message.error}}</div>

    </v-container>

    <v-divider></v-divider>
    <div class="d-flex justify-center m-2">
      <v-card-actions>

      <!-- <v-btn @click="router.push({ name: 'login'})" color="error" size="small" class="d-flex justify-center"> -->
      <v-btn @click="logout" color="error" size="small" class="d-flex justify-center">
        Logout
      </v-btn>
      <v-btn @click="get" color="warning" size="small" class="d-flex justify-center">
        Get
      </v-btn>
      </v-card-actions>
    </div>
  </div>

</template>


<style>
.wrapper {
  @apply mx-auto max-w-96 dark border border-indigo-900
}

</style>