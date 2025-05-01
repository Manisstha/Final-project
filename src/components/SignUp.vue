<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { supabase } from "@/api";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showSuccess = ref(false);
const errorMessage = ref("");

const capitalizedError = computed(() =>
  errorMessage.value
    ? errorMessage.value.charAt(0).toUpperCase() + errorMessage.value.slice(1)
    : ""
);

const handleSignUp = async () => {
  errorMessage.value = "";

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match";
    return;
  }

  userStore.loading = true;
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  userStore.loading = false;

  if (error) {
    errorMessage.value = error.message;
    return;
  }
  showSuccess.value = true;
};
</script>

<template>
  <div
    class="grid place-items-center gap-10 m-0 h-screen px-8 bg-[#f1f5fb] text-[#474f5c]"
  >
    <div
      class="relative overflow-hidden z-3 m-0 w-[60vw] sm:max-w-[420px] px-[30px] py-[54px] rounded-[24px] text-center bg-white backdrop-blur-lg shadow-2xl"
    >
      <img
        class="absolute top-0 left-0 py-[25px] px-0 mt-3.5 w-full h-[130px] object-contain"
        src="@\assets\logo.png"
      />
      <h2 class="text-3xl font-semibold mt-20 mb-4">Sign Up</h2>
      <form @submit.prevent="handleSignUp" class="mb-8 grid gap-3">
        <div class="relative">
          <span
            class="material-symbols-outlined absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none text-[#9ca2ae]"
          >
            account_circle
          </span>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full h-[56px] rounded-[8px] text-base text-inherit border-0 pl-10 pr-4 py-0 placeholder-[#9ca2ae] bg-gray-100 focus:outline-none focus:border-2 focus:border-[#226ce7]"
          />
        </div>
        <div class="relative">
          <span
            class="material-symbols-outlined absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none text-[#9ca2ae]"
          >
            lock
          </span>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="w-full h-[56px] rounded-[8px] text-base text-inherit border-0 pl-10 pr-4 py-0 placeholder-[#9ca2ae] bg-gray-100 focus:outline-none focus:border-2 focus:border-[#226ce7]"
          />
          <span
            class="material-symbols-outlined absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-[#9ca2ae]"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? "visibility_off" : "visibility" }}
          </span>
        </div>
        <div class="relative">
          <span
            class="material-symbols-outlined absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none text-[#9ca2ae]"
          >
            lock
          </span>
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm Password"
            class="w-full h-[56px] rounded-[8px] text-base text-inherit border-0 pl-10 pr-4 py-0 placeholder-[#9ca2ae] bg-gray-100 focus:outline-none focus:border-2 focus:border-[#226ce7]"
          />
          <span
            class="material-symbols-outlined absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-[#9ca2ae]"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            {{ showConfirmPassword ? "visibility_off" : "visibility" }}
          </span>
        </div>
        <button
          :disabled="userStore.loading"
          class="border-0 text-white bg-[#226ce7] grid place-items-center font-medium cursor-pointer w-full h-[56px] rounded-[8px] text-base"
        >
          <span v-if="userStore.loading" class="loader"></span>
          <span v-else>Sign Up</span>
        </button>
        <p v-if="errorMessage" class="text-red-500 text-base">
          {{ capitalizedError }}
        </p>
      </form>

      <router-link to="/auth/signin" class="block text-[#216ce7] font-medium">
        Back to Sign In
      </router-link>
    </div>
  </div>
  <div
    v-if="showSuccess"
    class="fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 pointer-events-auto"
  ></div>
  <div
    v-if="showSuccess"
    class="fixed overflow-hidden z-50 m-0 w-[40vw] sm:max-w-[300px] px-[30px] py-[54px] rounded-[24px] text-center bg-white backdrop-blur-lg shadow-2xl"
  >
    <p class="text-[#226ce7] font-semibold text-center">
      Registration successful!
    </p>
    <button
      @click="
        () => {
          showSuccess = false;
          router.push('/auth/signin');
        }
      "
      class="mt-4 w-full bg-[#226ce7] text-white py-2 rounded cursor-pointer"
    >
      OK
    </button>
  </div>
</template>

<style scoped>
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin: auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>