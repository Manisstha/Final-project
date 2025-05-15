<script setup>
import Tasks from "@/components/Tasks.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const fromDate = ref("");
const toDate = ref("");
const searchQuery = ref("");

const menuOpen = ref(false);
const menuRef = ref(null);

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleClickOutside);
});

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const logout = () => {
  menuOpen.value = false;
};
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
          ref="menuRef"
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
      <!-- Search input -->
      <div class="relative w-64">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search tasks..."
          class="bg-white rounded-lg shadow-sm pl-3 pr-10 py-1 text-base w-full text-[#2d2f33] focus:outline-none"
        />
        <button
          class="absolute inset-y-0 right-2 flex items-center justify-center text-[#474f5c] hover:text-[#226ce7] cursor-pointer"
        >
          <span class="material-symbols-outlined">search</span>
        </button>
      </div>

      <!-- Date inputs -->
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium">From</label>
        <input
          type="date"
          v-model="fromDate"
          class="border rounded px-2 py-1 text-sm"
        />
        <label class="text-sm font-medium">To</label>
        <input
          type="date"
          v-model="toDate"
          class="border rounded px-2 py-1 text-sm"
        />
      </div>
    </div>
    <Tasks />
  </div>
</template>

