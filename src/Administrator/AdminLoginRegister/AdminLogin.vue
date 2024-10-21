<template>
    <div class="login">
      <h2>Admin Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="form.email" required />
        </div>
  
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="form.password" required />
        </div>
  
        <button type="submit">Login</button>
      </form>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        errorMessage: '',
        successMessage: '',
      };
    },
    methods: {
  async login() {
    try {
      const response = await axios.post('http://localhost:3001/admin/login', this.form);
      const token = response.data.token;
      localStorage.setItem('token', token); // Store the token
      localStorage.setItem('isAdmin', 'true'); // Optionally store the admin flag

      alert('Login successful');
      this.errorMessage = '';
      
      // Redirect to the admin dashboard
      this.$router.push('/admin-dashboard');
    } catch (error) {
      if (error.response) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = 'An error occurred during login.';
      }
      this.successMessage = '';
    }
  },    
},
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
  