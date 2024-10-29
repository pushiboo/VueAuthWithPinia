<script setup>
  import UserServices from '@/services/users.service';
  import {onUpdated, ref} from 'vue'

  const UserService = new UserServices()
  const Users = ref()
  const selectedUser = ref('')
  const selectedEmail = ref('')
  const errorMessage = ref('')
  const successMessage = ref('')

  const getUsers = async () => {
    let results = []
    console.log("clicked getUsers")
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

  const deleteUser = async (id) => {
    selectedUser.value = id
    console.log("selectedUser ID:", selectedUser.value);

    await UserService.delete(selectedUser.value)
      .then(res => {
        console.log("User deleted:", res.data.message)
        successMessage.value = res.data.message
        getUsers()
      })
      .catch(error => {
        console.log("error:", error);
        errorMessage.value = error.data.message
      })
    
  }

  const checkUser = async (email) => {
    selectedEmail.value = email
    console.log("clicked checkUser",selectedEmail.value)
    // await UserService.findByEmail('tam@tam.de')
    await UserService.findByEmail(selectedEmail.value)
      .then(res => {
        console.log('checkUser res:', res.data);
      })
      .catch(error => {
        console.log('checkUser error:', error);
      })
  }
  
  function mouseClicked(email) {
    selectedEmail.value = email
    console.log("mouse clicked", selectedEmail.value );
    
  }
  // onUpdated((Users) => {
  //   if (Users.value.length > 0) {
  //     console.log("Users.value.length", Users.value.length);
  //     // Users.value.length
  //   }
  //   console.log("updating Users", Users.value);

  //   // getUsers
  //   // Users.value.length
    
  // })

</script>

<template>
  <main>
    <h1>HOME</h1>
    <v-btn
      @click="Users.$reset()"
      density="comfortable"
      size="small"
      icon="$vuetify"></v-btn>
      <br>

    <v-btn 
      @click="getUsers"
      size="small"
      color="primary"
      density="comfortable"
        >get User</v-btn>
    <br>  
    <div class="text-red-500">
      <div v-for="user in Users" :key="user.id" @click="selectedUser = user._id">
        {{ user.name }} - {{  user.email }} - {{ user._id }}
      </div>
    </div>
    <br>
    <v-btn v-if="selectedUser"
      @click="deleteUser(selectedUser)"
      size="small"
      color="red"
      density="comfortable"
        >delete User ID: {{ selectedUser }}</v-btn>
    <br>
    <div v-if="successMessage" class="text-green">{{ successMessage }}</div>
    <div v-else class="text-red">{{ errorMessage }}</div>  

    <br>
    <div>
      <v-btn 
      @click="checkUser(selectedEmail)"
      size="small"
      color="secondary"
      density="comfortable"
        >check User: {{ selectedEmail }}</v-btn>
    <br>  
    <div class="text-orange-500">
      <div v-for="user in Users" :key="user.id" @click="mouseClicked(user.email) ">
        {{ user.name }} - {{  user.email }} - {{ user._id }}
      </div>
    </div>
    <br>
    </div>

  </main>
</template>

<style>
main {
  @apply text-center
}
</style>