<script setup>
  import UserServices from '@/services/users.service';
  import {ref} from 'vue'

  const UserService = new UserServices()
  const Users = ref()
  const getUsers = async () => {
    let results = []
    console.log("clicked")
    await UserService.getAll()
      .then(res => {
        res.data.forEach(elem => {
          console.log("elem", elem)
          results.push({...elem})
        });
        Users.value = results
        console.log("Users.value:::", Users.value)
    })
  }

</script>

<template>
  <main>
    <h1>HOME</h1>
    <v-btn 
      density="comfortable"
      size="small"
      icon="$vuetify"></v-btn>
    <v-btn 
      @click="getUsers"
      size="small"
      color="primary"
      density="comfortable"
        >get User</v-btn>

    <br>  
    <div>
      <div v-for="user in Users" :key="user.id">
        {{ user.name }}
      </div>
    </div>

  </main>
</template>

<style>
main {
  @apply text-center
}
</style>
