<script setup>
import Sidebar from "@/components/Sidebar.vue";
import { useSidebarStore } from "@/stores/sidebar";
import { ref, computed } from "vue";

const sidebarStore = useSidebarStore();
const isOpen = computed(() => sidebarStore.isOpen);

const settings = ref({
  showSearch: false,
  allowEdit: false,
  showFavorites: false,
  showDateFilter: false,
  enableAnalytics: false,
  enableChat: false,
  allowExport: false,
});

const labels = {
  showSearch: "Show Search option",
  allowEdit: "Allow edit",
  showFavorites: "Show My Favorites filter option",
  showDateFilter: "Show Date filter option",
  enableAnalytics: "Enable Analytics data for dashboard",
  enableChat: "Enable chat and social media",
  allowExport: "Allow dashboard data export",
};

const toggleBtn = (key) => {
  if (key in settings.value) {
    settings.value[key] = !settings.value[key];
  }
};
</script>

<template>
  <div
    class="grid h-screen bg-[#f1f5fb] transition-all duration-300"
    :class="isOpen ? 'grid-cols-[240px_1fr]' : 'grid-cols-[64px_1fr]'"
  >
    <Sidebar />

    <div class="overflow-auto px-7 py-5 flex flex-col gap-5">
      <h1 class="text-2xl font-semibold">Settings</h1>

      <div
        v-for="(label, key) in labels"
        :key="key"
        class="flex gap-5 items-center"
      >
        <button
          @click="toggleBtn(key)"
          :class="[
            'relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none cursor-pointer',
            settings[key] ? 'bg-[#226ce7]' : 'bg-gray-300',
          ]"
        >
          <span
            :class="[
              'absolute left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300',
              settings[key] ? 'translate-x-6' : 'translate-x-0',
            ]"
          ></span>
        </button>
        <div class="font-semibold">{{ label }}</div>
      </div>
    </div>
  </div>
</template>

