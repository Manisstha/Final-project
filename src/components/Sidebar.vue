<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSidebarStore } from "@/stores/sidebar";

const router = useRouter();
const route = useRoute();
const sidebarStore = useSidebarStore();

const isOpen = computed(() => sidebarStore.isOpen);

const toggleOpen = () => {
  sidebarStore.toggle();
};

const menuItems = [
  { label: "Dashboard", icon: "dashboard", route: "/dashboard" },
  { label: "Analytics", icon: "analytics", route: "/analytics" },
  { label: "Message", icon: "message", route: "/message" },
  { label: "Export", icon: "file_export", route: "/export" },
  { label: "Settings", icon: "settings", route: "/settings" },
];

const activeIndex = computed(() =>
  menuItems.findIndex((item) => route.path.startsWith(item.route))
);

const navigateTo = (routePath) => {
  router.push(routePath);
};
</script>

<template>
  <div class="m-0 h-screen bg-[#f1f5fb] text-[#474f5c] relative">
    <aside
      class="fixed top-0 bottom-0 bg-white transition-all duration-300"
      :class="isOpen ? 'w-[240px]' : 'w-[64px]'"
    >
      <button
        type="button"
        class="absolute z-10 top-6 -right-3 grid place-items-center w-6 h-6 rounded-full bg-[#226ce7] text-white/80 shadow-md transition-transform duration-300 hover:text-white cursor-pointer"
        :class="{ 'rotate-180': isOpen }"
        @click="toggleOpen"
      >
        <span class="material-symbols-outlined">chevron_right</span>
      </button>

      <div class="absolute top-0 left-0 bottom-0 w-full overflow-hidden">
        <div
          class="flex items-center h-[72px] px-5 rounded-t-lg transition-all duration-300 w-full"
        >
          <img src="@/assets/logo.png" class="h-7" />
          <h1
            class="ml-3 text-lg font-medium tracking-wide text-[#3e4145] transition-all duration-150 overflow-hidden whitespace-nowrap"
            :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }"
          >
            To-Do Dash
          </h1>
        </div>

        <nav class="relative grid mt-4">
          <div
            class="absolute left-1 w-1 h-[56px] bg-[#226ce7] transition-transform duration-300"
            :style="{ transform: `translateY(${activeIndex * 56}px)` }"
          ></div>
          <button
            v-for="(item, index) in menuItems"
            :key="item.label"
            class="flex items-center gap-4 h-[56px] px-[22px] text-[17px] capitalize transition-all duration-300 opacity-80 hover:opacity-100 hover:text-[#226ce7] cursor-pointer"
            :class="['w-full', activeIndex === index ? 'text-[#226ce7]' : '']"
            @click="navigateTo(item.route)"
          >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
            <p
              class="transition-opacity duration-300"
              :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }"
            >
              {{ item.label }}
            </p>
          </button>
        </nav>
      </div>
    </aside>
  </div>
</template>