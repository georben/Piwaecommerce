<template>
  <div class="Top-navigation"> 
  </div>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-container">
          <label for="email">Username</label>
          <input type="text" id="email" v-model="username" placeholder="Enter your Username">
        </div>
        <div class="input-container">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password">
        </div>
        <div class="links">
          <a href="#">Forgot Your Password?</a>
        </div>
        <div class="buttons">
          <button type="button" class="secondary-button">
            <a href="/Register" class="register">Register</a>
          </button>
          <button type="submit" class="primary-button">Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Define reactive variables
const username = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

// Get the router instance for redirection
const router = useRouter();

const login = async () => {
  if (!username.value || !password.value) {
    error.value = 'Username and password are required';
    return;
  }

  error.value = null;
  loading.value = true;

  try {
    const response = await axios.post('http://localhost:3001/api/users/login', {
      username: username.value,
      password: password.value,
    });

    if (response.data.success) {
      // Save token to local storage
      localStorage.setItem('token', response.data.token)  ;

      alert('Login successful');

      if (response.data.role === 'admin') {
        // Redirect to Admin Dashboard for admin users
        router.push('/admin-dashboard').catch((err) => {
          console.error('Redirection error:', err);
          alert('Error redirecting to Admin Dashboard');
        });
      } else {
        // Redirect to LandingPage for regular users
        router.push('/LandingPage').catch((err) => {
          console.error('Redirection error:', err);
          alert('Error redirecting to LandingPage');
        });
      }
    } else {
      error.value = response.data.message;
    }
  } catch (err) {
    error.value = 'An error occurred during login';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.Top-navigation {
  background-color: #514947;
  position: absolute;
  left: 65%;
  top: 20px;
}

.register {
  text-decoration: none;
  color: black;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #514947;
}

.login-card {
  width: 350px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.login-card h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
}

.input-container label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.input-container input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.links {
  text-align: center;
  margin-bottom: 20px;
}

.links a {
  color: #007BFF;
  text-decoration: none;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.secondary-button, .primary-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.secondary-button {
  background-color: #ccc;
  color: black;
}

.primary-button {
  background-color: #007BFF;
  color: black;
}
</style>
