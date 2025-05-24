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
      <h1 class="text-2xl font-semibold mb-6">Analytics page</h1>

      <div class="flex flex-wrap justify-around py-13">
        <img
          class="w-full sm:w-1/2 md:w-1/3 h-[200px] object-contain"
          src="@\assets\Analytics_image\ToDo.jpg"
        />
        <img
          class="w-full sm:w-1/2 md:w-1/3 h-[200px] object-contain"
          src="@\assets\Analytics_image\InProgress.jpg"
        />
        <img
          class="w-full sm:w-1/2 md:w-1/3 h-[200px] object-contain"
          src="@\assets\Analytics_image\Completed.jpg"
        />
      </div>
      <div class="flex flex-wrap justify-around py-13">
        <img
          class="w-full md:w-[48%] h-[360px] object-contain"
          src="@\assets\Analytics_image\Piechart.jpg"
        />
        <img
          class="w-full md:w-[48%] h-[360px] object-contain"
          src="@\assets\Analytics_image\Graph.jpg"
        />
      </div>
    </div>
  </div>
</template>