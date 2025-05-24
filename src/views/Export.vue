<script setup>
import Sidebar from "@/components/Sidebar.vue";
import { useSidebarStore } from "@/stores/sidebar";
import { computed } from "vue";

const sidebarStore = useSidebarStore();
const isOpen = computed(() => sidebarStore.isOpen);
</script>

<template>
  <div
    class="grid h-screen bg-[#f1f5fb] transition-all duration-300"
    :class="isOpen ? 'grid-cols-[240px_1fr]' : 'grid-cols-[64px_1fr]'"
  >
    <Sidebar />

    <div class="overflow-auto px-7 py-5">
      <h1 class="text-2xl font-semibold">Export</h1>
      <div class="flex items-center justify-center">
        <img
          class="w-auto h-full object-contain"
          src="@\assets\Export_image\Export.png"
        />
      </div>
    </div>
  </div>
</template>

