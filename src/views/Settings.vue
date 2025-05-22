<script setup>
import Sidebar from "@/components/Sidebar.vue";
import { ref } from "vue";

const sidebarOpen = ref(false);
</script>

<template>
  <div
    class="grid h-screen bg-[#f1f5fb] transition-all duration-300"
    :class="sidebarOpen ? 'grid-cols-[240px_1fr]' : 'grid-cols-[64px_1fr]'"
  >
    <Sidebar @toggle="(val) => (sidebarOpen = val)" />

    <div class="overflow-auto px-7 py-5">
      <h1 class="text-2xl font-semibold">Export</h1>

        <img
          class="w-auto h-full object-contain"
          src="@\assets\Settings_image\Settings.png"
        />
    </div>
  </div>
</template>

