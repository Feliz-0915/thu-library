import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(JSON.parse(localStorage.getItem('isAuthed') || 'false'))
const currentUser = ref(JSON.parse(localStorage.getItem('user') || 'null'))

const DEMO = { username: 'library', password: 'LetMeIn123!' }

export function useAuth() {
  const router = useRouter()

  function login(username, password) {
    const ok = username === DEMO.username && password === DEMO.password
    if (ok) {
      isAuthenticated.value = true
      currentUser.value = { username }
      localStorage.setItem('isAuthed', 'true')
      localStorage.setItem('user', JSON.stringify(currentUser.value))
      return { ok: true }
    }
    return { ok: false, reason: 'Invalid username or password.' }
  }

  function logout() {
    isAuthenticated.value = false
    currentUser.value = null
    localStorage.removeItem('isAuthed')
    localStorage.removeItem('user')
    router.push({ name: 'Login' })
  }

  return { isAuthenticated, currentUser, login, logout }
}
