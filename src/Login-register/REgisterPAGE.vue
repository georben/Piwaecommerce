<template>
  <div class="register-background">
    <div class="register-container">
      <form @submit.prevent="handleSubmit">
        <div v-if="step === 1" class="form-step">
          <h2>Step 1: Personal Information</h2>
          <label for="fullName">Full Name:</label>
          <input type="text" id="fullName" v-model="personalInfo.fullName" required>
    
          <label for="email">Email Address:</label>
          <input type="email" id="email" v-model="personalInfo.email" required>
    
          <label for="dob">Date of Birth:</label>
          <input type="date" id="dob" v-model="personalInfo.dob" required>
    
          <label for="phone">Phone Number:</label>
          <input type="tel" id="phone" v-model="personalInfo.phone" required>
    
          <label for="address">Address:</label>
          <textarea id="address" v-model="personalInfo.address" required></textarea>
    
          <button type="button" @click="nextStep">Next</button>
        </div>
    
        <div v-if="step === 2" class="form-step">
          <h2>Step 2: Account Details</h2>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="accountInfo.username" required>
    
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="accountInfo.password" required>
    
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="accountInfo.confirmPassword" required>
    
          <!-- <label for="idType">ID Type:</label>
          <select id="idType" v-model="accountInfo.idType" required>
            <option value="passport">Passport</option>
            <option value="driversLicense">Driver's License</option>
          </select> -->
    
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Reactive data for the steps and user input
const step = ref(1);
const personalInfo = ref({
  fullName: '',
  email: '',
  dob: '',
  phone: '',
  address: ''
});
const accountInfo = ref({
  username: '',
  password: '',
  confirmPassword: '',
});

// Access the router for navigation after registration
const router = useRouter();

// Move to the next step if personal info is valid
const nextStep = () => {
  if (validatePersonalInfo()) {
    step.value = 2;
  } else {
    alert('Please fill out all fields in the current step.');
  }
};

// Validate that all personal information fields are filled
const validatePersonalInfo = () => {
  return Object.values(personalInfo.value).every(value => value.trim() !== '');
};

// Handle the form submission for registration
const handleSubmit = async () => {
  if (accountInfo.value.password !== accountInfo.value.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  if (!accountInfo.value.username || !accountInfo.value.password) {
    alert('Please fill out all fields in the account details.');
    return;
  }

  try {
    // Send user data to the backend
    const response = await axios.post('http://localhost:3001/api/users/register', {
      ...personalInfo.value,
      ...accountInfo.value
    });

    console.log('Data being sent to server:', {
      ...personalInfo.value,
      ...accountInfo.value
    });

    if (response.data.success) {
      alert('Registration successful!');
      router.push('/'); // Redirect to homepage after success
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Registration failed. Please try again later.');
  }
};
</script>

<style scoped>
.register-background {
  height: 100vh;
  background-color: #514947;
}

.register-container {
  position: relative;
  top: 50px;
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-step {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input, textarea, select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
}
</style>
