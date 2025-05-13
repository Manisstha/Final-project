<script setup>
import { ref, watch, defineEmits } from "vue";

const fromDate = ref("");
const toDate = ref("");
const searchQuery = ref("");
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">My Tasks</h1>
      <img
        src="@/assets/logo.png"
        alt="User"
        class="w-10 h-10 rounded-full border border-gray-300"
      />
    </div>

    <div class="flex justify-between items-center flex-wrap gap-4">
      <!-- Search input -->
      <div class="flex items-center gap-2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search tasks..."
          class="border rounded px-3 py-1 text-sm w-64"
        />
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
  </div>
</template>

