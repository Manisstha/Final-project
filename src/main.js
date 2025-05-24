import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUserStore } from '@/stores/user';
import clickOutside from "@/directives/v-click-outside";

const app = createApp(App)

app.use(createPinia())
app.use(router)

const userStore = useUserStore();
await userStore.loadUser();

app.directive("click-outside", clickOutside);
app.mount('#app')
