<script setup>
import Tasks from "@/components/Tasks.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const fromDate = ref("");
const toDate = ref("");
const searchQuery = ref("");
const showFavoritesOnly = ref(false);

const myFavoriteTasks = () => {
  showFavoritesOnly.value = !showFavoritesOnly.value;
};

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const clearSearchField = () => {
  searchQuery.value = "";
};

const clearDateFields = () => {
  fromDate.value = "";
  toDate.value = "";
};

const logout = async () => {
  menuOpen.value = false;
  await userStore.logout();
  router.push("/auth/signin");
};

function limitYearDigits(event, modelRef) {
  const value = event.target.value;
  const parts = value.split("-");

  if (parts.length === 3 && parts[0].length > 4) {
    parts[0] = parts[0].slice(0, 4);
    const limitedValue = parts.join("-");
    event.target.value = limitedValue;
    modelRef.value = limitedValue;
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">My Tasks</h1>
      <div class="relative">
        <button
          @click.stop="toggleMenu"
          class="flex items-center justify-center text-[32px] text-[#226ce7] hover:text-[#1b4ec7] transition-colors duration-200 cursor-pointer"
        >
          <span class="material-symbols-outlined" style="font-size: 32px"
            >account_circle</span
          >
        </button>

        <div
          v-if="menuOpen"
          v-click-outside="closeMenu"
          class="absolute right-0 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50"
        >
          <button
            @click="logout"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-[#474f5c] cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center flex-wrap gap-4">
      <div class="flex flex-wrap items-center gap-4">
        <!-- Search input -->
        <div class="relative w-64">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search tasks..."
            class="bg-white rounded-lg shadow-sm pl-3 pr-10 py-1 text-base w-full text-[#2d2f33] focus:outline-none"
          />
          <button
            @click="clearSearchField"
            class="absolute inset-y-0 right-2 flex items-center justify-center text-[#474f5c] hover:text-[#226ce7] cursor-pointer"
          >
            <span class="material-symbols-outlined">cancel</span>
          </button>
        </div>

        <!-- Favorite filter button -->
        <button
          @click="myFavoriteTasks"
          class="bg-white rounded-lg shadow-sm flex items-center gap-1.5 pl-3 pr-10 py-1 text-base w-auto text-[#2d2f33] focus:outline-none hover:text-[#226ce7] cursor-pointer border-2"
          :class="{
            'border-[#4b8cf5]': showFavoritesOnly,
            'border-none': !showFavoritesOnly,
          }"
        >
          <span
            class="material-icons"
            :class="{
              'text-yellow-300': showFavoritesOnly,
              'text-[#474f5c]': !showFavoritesOnly,
            }"
          >
            {{ showFavoritesOnly ? "star" : "star_border" }}
          </span>
          <span>My favorites</span>
        </button>
      </div>

      <!-- Date inputs -->
      <div class="flex flex-wrap items-center gap-2">
        <label class="text-sm font-medium">From</label>
        <input
          type="date"
          v-model="fromDate"
          @input="(e) => limitYearDigits(e, fromDate)"
          class="bg-white rounded-lg shadow-sm px-2 py-1 text-base text-[#2d2f33] focus:outline-none"
        />
        <label class="text-sm font-medium">To</label>
        <input
          type="date"
          v-model="toDate"
          @input="(e) => limitYearDigits(e, toDate)"
          class="bg-white rounded-lg shadow-sm px-2 py-1 text-base text-[#2d2f33] focus:outline-none"
        />
        <button
          @click="clearDateFields"
          class="flex items-center justify-center text-[#474f5c] hover:text-[#226ce7] cursor-pointer"
        >
          <span class="material-symbols-outlined">refresh</span>
        </button>
      </div>
    </div>
    <Tasks
      :search-query="searchQuery"
      :show-favorites-only="showFavoritesOnly"
      :from-date="fromDate"
      :to-date="toDate"
    />
  </div>
</template>

