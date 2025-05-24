<script setup>
import Sidebar from "@/components/Sidebar.vue";
import OverviewBoard from "@/components/OverviewBoard.vue";
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
      <OverviewBoard />
    </div>
  </div>
</template>