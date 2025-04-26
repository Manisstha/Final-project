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
      <h2 class="text-3xl font-semibold mt-20 mb-4">Sign In</h2>
      <form class="mb-8 grid gap-3">
        <div class="relative">
          <span
            class="material-symbols-outlined absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none text-[#9ca2ae]"
          >
            account_circle
          </span>
          <input
            type="email"
            placeholder="Username"
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
            type="password"
            placeholder="Password"
            class="w-full h-[56px] rounded-[8px] text-base text-inherit border-0 pl-10 pr-4 py-0 placeholder-[#9ca2ae] bg-gray-100 focus:outline-none focus:border-2 focus:border-[#226ce7]"
          />
        </div>
        <button
          class="border-0 text-white bg-[#226ce7] grid place-items-center font-medium cursor-pointer w-full h-[56px] rounded-[8px] text-base"
        >
          Sign In
        </button>
      </form>
      <router-link
        to="/auth/forgot-password"
        class="block mb-14 text-[#216ce7] font-medium"
      >
        Forgot password?
      </router-link>
      <!-- <a href="#" class="block mb-14 text-[#216ce7] font-medium"
        >Forgot password?</a
      > -->
      <footer class="text-[#9ca2ae]">
        Need an account?
        <router-link to="/auth/signup" class="text-[#216ce7] font-medium"
          >Sign up here</router-link
        >
        <!-- <a href="#" class="text-[#216ce7] font-medium">here</a> -->
      </footer>
    </div>
  </div>
</template>