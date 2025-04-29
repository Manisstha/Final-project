import { defineStore } from 'pinia';
import { signUpUser, signInUser, getCurrentUser, signOutUser } from "@/api/userApi";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
  }),

  actions: {
    async register(email, password) {
      this.loading = true;
      try {
        const response = await signUpUser(email, password)
        this.user = response.user
      } catch (error) {
        console.error("Registration failed:", error.message)
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async login(email, password) {
      this.loading = true;
      try {
        const response = await signInUser(email, password);
        this.user = response.user;
      } catch (error) {
        console.error("Login failed:", error.message)
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async loadUser() {
      try {
        const user = await getCurrentUser();
        this.user = user;
      } catch (error) {
        console.error("Failed to retrieve user:", error.message);
      }
    },
    async logout() {
      await signOutUser();
      this.user = null;
    },
  },
});


