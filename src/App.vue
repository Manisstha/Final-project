<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
onMounted(async () => {
  await userStore.loadUser();
});
</script>

<template>
  <router-view />
</template>

