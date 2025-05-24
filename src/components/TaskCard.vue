<script setup>
import { computed } from "vue";
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  showConfirm: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "edit",
  "favorite",
  "delete",
  "statusChange",
  "show-confirm",
  "cancel-confirm",
]);

const handleEdit = () => {
  emit("edit", props.task.id);
};

const handleFavorite = () => {
  emit("favorite", props.task.id);
};

const confirmDelete = () => {
  emit("show-confirm", props.task.id);
};

const cancelDelete = () => {
  emit("cancel-confirm");
};

const handleDelete = () => {
  emit("delete", props.task.id);
};

const statusOptions = ["To Do", "In Progress", "Completed"];

const otherStatuses = computed(() =>
  statusOptions.filter((s) => s !== props.task.status)
);

const onStatusChange = (event) => {
  const newStatus = event.target.value;
  emit("statusChange", { id: props.task.id, status: newStatus });
};
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm border-none p-4 mb-4 space-y-2 relative"
  >
    <div
      v-if="showConfirm"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 m-0 sm:max-w-[300px] px-7 py-7 rounded-[24px] text-center bg-white backdrop-blur-lg shadow-2xl"
    >
      <p class="text-[#474f5c] font-semibold text-center">
        Are you sure you want to delete this task?
      </p>
      <div class="flex justify-end gap-2">
        <button
          @click="handleDelete"
          class="mt-4 w-full bg-[#226ce7] text-white py-2 rounded cursor-pointer"
        >
          Yes
        </button>
        <button
          @click="cancelDelete"
          class="mt-4 w-full bg-[#226ce7] text-white py-2 rounded cursor-pointer"
        >
          No
        </button>
      </div>
    </div>
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-medium text-[#2d2f33]">
          {{ task.title }}
        </h3>
        <p v-if="task.description" class="text-sm text-gray-600 mt-1">
          {{ task.description }}
        </p>
      </div>
      <div class="relative">
        <select
          class="text-xs rounded px-2 py-1 font-medium appearance-none cursor-pointer bg-opacity-50"
          :class="{
            'bg-blue-100 text-blue-700': task.status === 'To Do',
            'bg-yellow-100 text-yellow-700': task.status === 'In Progress',
            'bg-green-100 text-green-700': task.status === 'Completed',
          }"
          @change="onStatusChange"
        >
          <option :value="task.status" disabled selected>
            {{ task.status }}
          </option>
          <option v-for="status in otherStatuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex gap-2 justify-end">
      <button @click="handleEdit" class="text-[#474f5c] cursor-pointer">
        <span class="material-symbols-outlined">edit</span>
      </button>
      <button @click="handleFavorite">
        <span
          class="material-icons cursor-pointer text-[#474f5c]"
          :class="{ 'text-yellow-300': task.favorite }"
        >
          {{ task.favorite ? "star" : "star_border" }}
        </span>
      </button>
      <button @click="confirmDelete" class="text-[#474f5c] cursor-pointer">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  </div>
</template>
