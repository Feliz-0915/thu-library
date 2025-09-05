<template>
  <main class="container" style="max-width:560px; padding:2rem 1rem;">
    <h2 class="mb-3" style="text-align:center;">Member Login</h2>

    <div v-if="$route.query.msg" style="padding:.75rem; background:#fff8e1; border:1px solid #ffe58f; margin-bottom:1rem;">
      {{ $route.query.msg }}
    </div>
    <div v-if="error" style="padding:.75rem; background:#fdecea; border:1px solid #f5c2c7; margin-bottom:1rem;">
      {{ error }}
    </div>

    <form @submit.prevent="onSubmit">
      <label class="form-label" for="user">Username</label>
      <input id="user" class="form-control" v-model.trim="username" autocomplete="username" />

      <label class="form-label" for="pass" style="margin-top:1rem;">Password</label>
      <input id="pass" class="form-control" type="password" v-model="password" autocomplete="current-password" />
      <small class="text-muted">Demo: <code>library</code> / <code>LetMeIn123!</code></small>

      <button type="submit" class="btn btn-primary" style="width:100%; margin-top:1rem;">Login</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const username = ref('')
const password = ref('')
const error = ref('')
const route = useRoute()
const router = useRouter()
const { login } = useAuth()

function onSubmit() {
  error.value = ''
  const res = login(username.value, password.value)
  if (!res.ok) {
    error.value = res.reason
    return
  }
  const redirect = route.query.redirect || '/about'
  router.replace(redirect)
}
</script>

<style scoped>
.form-label { display:block; margin-bottom: .5rem; }
.form-control { width:100%; padding:.5rem .75rem; border:1px solid #ccc; border-radius:.5rem; }
.btn { padding:.5rem 1rem; border:none; border-radius:.5rem; cursor:pointer; }
.btn-primary { background:#42b883; color:#fff; }
.text-muted { color:#777; }
</style>
