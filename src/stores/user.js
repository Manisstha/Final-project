import { defineStore } from 'pinia';
import { supabase } from "@/api/index";
import { signUpUser, signInUser, signOutUser } from "@/api/userApi";

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
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
          this.user = null;
        } else {
          this.user = data.session.user;
        }
      } catch (error) {
        console.error("Failed to retrieve session:", error.message);
        this.user = null;
      }
    },
    async logout() {
      await signOutUser();
      this.user = null;
    },
  },
});


