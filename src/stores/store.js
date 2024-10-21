import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null, // Store the logged-in user's ID
    token: null,  // Store the token if using JWT
  }),
  actions: {
    login(userId, token) {
      this.userId = userId;
      this.token = token;
    },
    logout() {
      this.userId = null;
      this.token = null;
    }
  }
});
