<script setup>
import Sidebar from "@/components/Sidebar.vue";
import OverviewBoard from "@/components/OverviewBoard.vue";
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
      <OverviewBoard />
    </div>
  </div>
</template>