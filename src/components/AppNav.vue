<template>
  <nav style="padding:.75rem 1rem; background:#35495e; color:#fff;">
    <div style="display:flex; gap:1rem; align-items:center; justify-content:space-between; max-width:1000px; margin:0 auto;">
      <div style="display:flex; gap:1rem; align-items:center;">
        <RouterLink to="/" class="brand">Library</RouterLink>
        <RouterLink to="/" class="link">Home</RouterLink>
        <RouterLink to="/about" class="link">About</RouterLink>
        <RouterLink to="/members" class="link">Members</RouterLink>
      </div>

      <div>
        <template v-if="isAuthenticated">
          <span class="user">Hi, {{ currentUser?.username }}</span>
          <button class="btn" @click="logout()">Logout</button>
        </template>
        <template v-else>
          <RouterLink class="btn outline" :to="{ name:'Login' }">Login</RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'
const { isAuthenticated, currentUser, logout } = useAuth()
</script>

<style scoped>
.brand { font-weight:700; color:#fff; text-decoration:none; }
.link { color:#cfe8ff; text-decoration:none; }
.link + .link { margin-left:.5rem; }
.user { margin-right:.75rem; }
.btn { padding:.35rem .75rem; border:none; border-radius:.4rem; cursor:pointer; background:#42b883; color:#fff; }
.btn.outline { background:transparent; border:1px solid #cfe8ff; color:#cfe8ff; }
</style>
