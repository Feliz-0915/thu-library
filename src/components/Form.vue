<!-- src/components/Form.vue -->
<template>
  <main class="page container py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8">
        <h2 class="text-center mb-4">User Information Form</h2>

        <form @submit.prevent="submitForm" novalidate>
          <!-- Row 1: Username / Password -->
          <div class="row g-3 mb-2">
            <!-- Username -->
            <div class="col-12 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': !!errors.username }"
                v-model.trim="formData.username"
                @input="validateName()"
                @blur="validateName()"
              />
              <div v-if="errors.username" class="invalid-feedback">
                {{ errors.username }}
              </div>
            </div>

            <!-- Password -->
            <div class="col-12 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': !!errors.password }"
                v-model="formData.password"
                @input="validatePassword()"
                @blur="validatePassword()"
              />
              <div v-if="errors.password" class="invalid-feedback">
                {{ errors.password }}
              </div>
            </div>
          </div>

          <!-- Row 2: Australian Resident / Gender -->
          <div class="row g-3 mb-3">
            <!-- Australian Resident (tri-state: null/true/false) -->
            <div class="col-12 col-sm-6">
              <div class="form-check mt-2">
                <input
                  id="isAustralian"
                  type="checkbox"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                  :true-value="true"
                  :false-value="false"
                  :indeterminate="formData.isAustralian === null"
                  @change="validateResident()"
                />
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
              <small v-if="errors.resident" class="text-danger d-block mt-1">
                {{ errors.resident }}
              </small>
              <small class="text-muted d-block">
                (Please tick for “Yes”, untick for “No”.)
              </small>
            </div>

            <!-- Gender -->
            <div class="col-12 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                :class="{ 'is-invalid': !!errors.gender }"
                v-model="formData.gender"
                @change="validateGender()"
                @blur="validateGender()"
              >
                <option value="" disabled>Please select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="invalid-feedback">
                {{ errors.gender }}
              </div>
            </div>
          </div>

          <!-- Row 3: Reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              rows="3"
              class="form-control"
              :class="{ 'is-invalid': !!errors.reason }"
              v-model.trim="formData.reason"
              @input="validateReason()"
              @blur="validateReason()"
            />
            <div v-if="errors.reason" class="invalid-feedback">
              {{ errors.reason }}
            </div>
          </div>

          <!-- Buttons -->
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-primary me-2"
              :disabled="!canSubmit"
              title="Please fix validation errors before submitting"
            >
              Submit
            </button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>

    <!--Cards -->
    <div class="cards-row mt-4" v-if="submittedCards.length">
      <div class="card" v-for="(card, index) in submittedCards" :key="index">
        <div class="card-header">User Information</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Username: {{ card.username }}</li>
          <li class="list-group-item">Password: {{ card.password }}</li>
          <li class="list-group-item">
            Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
          </li>
          <li class="list-group-item">Gender: {{ card.gender }}</li>
          <li class="list-group-item">Reason: {{ card.reason || 'None' }}</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

/* --- form state --- */
const formData = ref({
  username: '',
  password: '',
  isAustralian: null,
  reason: '',
  gender: ''
})

/* --- errors --- */
const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null
})

/* --- validators --- */
function validateName () {
  const v = (formData.value.username || '').trim()
  errors.value.username =
    v.length < 3 ? 'Name must be at least 3 characters.' : null
  return !errors.value.username
}

function validatePassword () {
  const p = formData.value.password || ''
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(p)
  const hasLowercase = /[a-z]/.test(p)
  const hasNumber = /\d/.test(p)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(p)

  if      (p.length < minLength) errors.value.password = `Password must be at least ${minLength} characters long.`
  else if (!hasUppercase)        errors.value.password = 'Password must contain at least one uppercase letter.'
  else if (!hasLowercase)        errors.value.password = 'Password must contain at least one lowercase letter.'
  else if (!hasNumber)           errors.value.password = 'Password must contain at least one number.'
  else if (!hasSpecial)          errors.value.password = 'Password must contain at least one special character.'
  else                           errors.value.password = null

  return !errors.value.password
}

function validateResident () {
  errors.value.resident =
    formData.value.isAustralian === null
      ? 'Please confirm whether you are an Australian resident.'
      : null
  return !errors.value.resident
}

function validateGender () {
  errors.value.gender =
    !formData.value.gender ? 'Please select a gender.' : null
  return !errors.value.gender
}

function validateReason () {
  const min = 10
  const v = (formData.value.reason || '').trim()
  errors.value.reason =
    v.length < min ? `Reason must be at least ${min} characters.` : null
  return !errors.value.reason
}

/* --- submit / clear --- */
const submittedCards = ref([])

function submitForm () {
  const ok =
    validateName() &&
    validatePassword() &&
    validateResident() &&
    validateGender() &&
    validateReason()

  if (!ok) return

  submittedCards.value.push({ ...formData.value })
  clearForm()
}

function clearForm () {
  Object.assign(formData.value, {
    username: '',
    password: '',
    isAustralian: null, // Go back to "unselected"
    reason: '',
    gender: ''
  })
  Object.keys(errors.value).forEach(k => (errors.value[k] = null))
}

/* --- disable submit when invalid --- */
const canSubmit = computed(() => {
  // Make a static judgement first to avoid a button that can be clicked but fails to be submitted
  return (
    (formData.value.username || '').trim().length >= 3 &&
    !validatePassword() === false &&
    formData.value.isAustralian !== null &&
    !!formData.value.gender &&
    (formData.value.reason || '').trim().length >= 10 &&
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason
  )
})
</script>

<style scoped>
.page { padding-top: 24px; }

/* Cards row */
.cards-row{
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 18rem;
  gap: 1rem;
  overflow-x: auto;
  padding: .25rem 1rem;
  scroll-snap-type: x proximity;
}
.cards-row .card{
  scroll-snap-align: start;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}
.card-header{
  background-color: #275FDA;
  color: #fff;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-group-item{ padding: 10px; }
</style>
