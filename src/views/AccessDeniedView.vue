<template>
  <main style="padding:3rem 1rem; text-align:center;">
    <h2>Access Denied</h2>
    <p>You don't have permission to view that page.</p>
    <RouterLink :to="{ name:'Login', query:{ msg:'Login required.' } }" class="btn">Go to Login</RouterLink>
  </main>
</template>

<script setup></script>

<style scoped>
.btn { display:inline-block; margin-top:1rem; padding:.5rem 1rem; border-radius:.5rem; background:#42b883; color:#fff; text-decoration:none; }
</style>
