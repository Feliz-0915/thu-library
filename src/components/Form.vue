<!-- src/components/Form.vue -->
<template>
  <main class="page container py-4">
    <!-- Centred container: narrows and stays centred with breakpoints -->
    <div class="row justify-content-center">
      <!-- xs: Full width; sm: 10 columns with 1 column left and 1 column right; md: 8 columns with 2 columns offset left and right -->
      <div class="col-12 col-sm-10 col-md-8">
        <h2 class="text-center mb-4">User Information Form</h2>

        <form @submit.prevent="submitForm">
          <!-- Row 1: Username / Password -- side-by-side in sm(≥576px) -->
          <div class="row g-3 mb-2">
            <div class="col-12 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                type="text"
                class="form-control"
                v-model.trim="formData.username"
              />
            </div>

            <div class="col-12 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                v-model="formData.password"
              />
            </div>
          </div>

          <!-- Row 2: whether resident in Australia / gender - also side by side at sm breakpoints -->
          <div class="row g-3 mb-3">
            <div class="col-12 col-sm-6">
              <div class="form-check mt-2">
                <input
                  id="isAustralian"
                  type="checkbox"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
            </div>

            <div class="col-12 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
              >
                <option disabled value="">Please select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <!-- Row 3: Reason (single column filled) -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              rows="3"
              class="form-control"
              v-model.trim="formData.reason"
            ></textarea>
          </div>

          <!-- button row -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Activity 6: Display cards after submission (horizontal single line increasing to the right) -->
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
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

const submitForm = () => {
  submittedCards.value.push({ ...formData.value })
}

const clearForm = () => {
  Object.assign(formData.value, {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  })
}
</script>

<style scoped>
.page { /* Overall white space only, does not affect breakpoint behaviour */
  padding-top: 24px;
}

/* -- Activity 6: Card Patterns & Horizontal Rows -- */
.cards-row{
  display: grid;
  grid-auto-flow: column;      /* Lateral flow, increase to the right */
  grid-auto-columns: 18rem;    /* Fixed width per card */
  gap: 1rem;
  overflow-x: auto;            /* Horizontal scrolling when width is insufficient */
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
