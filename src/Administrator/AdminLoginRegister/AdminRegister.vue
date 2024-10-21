<template>
  <div class="admin-register">
    <h2>Admin Registration</h2>
    <form @submit.prevent="register">
      <div>
        <label for="fullName">Full Name:</label>
        <input type="text" v-model="form.fullName" required />
      </div>

      <div>
        <label for="dob">Date of Birth:</label>
        <input type="date" v-model="form.dob" required />
      </div>

      <div>
        <label for="phone">Phone:</label>
        <input type="text" v-model="form.phone" />
      </div>

      <div>
        <label for="address">Address:</label>
        <input type="text" v-model="form.address" />
      </div>

      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="form.username" required />
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="form.email" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="form.password" required />
      </div>

      <button type="submit">Register</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Reactive state
const form = ref({
  fullName: '',
  dob: '',     // Add dob (date of birth)
  phone: '',
  address: '',
  username: '',
  email: '',
  password: '',
  role: 'admin'  // Default role for admin
});

const errorMessage = ref('');
const successMessage = ref('');

// Register function
const register = async () => {
  try {
    const response = await axios.post('http://localhost:3001/api/users/register', form.value);
    successMessage.value = response.data.message;
    errorMessage.value = '';
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'An error occurred during registration.';
    }
    successMessage.value = '';
  }
};
</script>

<style scoped>
.error {
  color: red;
}

.success {
  color: green;
}

form div {
  margin-bottom: 10px;
}
</style>
