<script>

</script>

<template>
  <div>
     <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/logout">Logout</RouterLink>
      </nav>
    </div>
</template>

<style>
nav {
  @apply 
  w-full
  text-xs
  text-center
  my-8
}
nav a.router-link-exact-active {
  @apply 
    text-indigo-500
}

nav a.router-link-exact-active:hover {
  @apply 
    bg-transparent
}
nav a {
  @apply 
    inline-block
    pr-4 p-0
    border-l-indigo-500
}
nav a:first-of-type {
  @apply 
    border-none
}
</style>