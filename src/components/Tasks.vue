<script setup>
import { ref } from "vue";
import TaskCard from "@/components/TaskCard.vue";

const props = defineProps({
  searchQuery: String,
  fromDate: String,
  toDate: String,
});

// Task list
const tasks = ref([
  {
    id: 1,
    title: "Example Task",
    description: "This is a sample task",
    status: "To Do",
    createdAt: "2025-05-01",
  },
  {
    id: 2,
    title: "Progress Task",
    description: "",
    status: "In Progress",
    createdAt: "2025-05-05",
  },
]);

// New Task State
const newTitle = ref("");
const newDescription = ref("");
const showNewForm = ref(false);

//Edit tasks
const editingTaskId = ref(null);
const editedTitle = ref("");
const editedDescription = ref("");

// Add task
const addTask = () => {
  if (!newTitle.value.trim()) return;
  tasks.value.unshift({
    id: Date.now(),
    title: newTitle.value,
    description: newDescription.value,
    status: "To Do",
    createdAt: new Date().toISOString().split("T")[0],
  });
  newTitle.value = "";
  newDescription.value = "";
  showNewForm.value = false;
};

// Filter logic
const filteredTasks = (status) => {
  return tasks.value.filter((task) => {
    const matchesStatus = task.status === status;
    const matchesSearch = props.searchQuery
      ? task.title.toLowerCase().includes(props.searchQuery.toLowerCase())
      : true;
    const matchesDate =
      (!props.fromDate || task.createdAt >= props.fromDate) &&
      (!props.toDate || task.createdAt <= props.toDate);
    return matchesStatus && matchesSearch && matchesDate;
  });
};

//Edit task
const editTask = (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    editingTaskId.value = id;
    editedTitle.value = task.title;
    editedDescription.value = task.description;
  }
};
const saveEdit = () => {
  const task = tasks.value.find((t) => t.id === editingTaskId.value);
  if (task) {
    task.title = editedTitle.value;
    task.description = editedDescription.value;
    editingTaskId.value = null;
  }
};

const cancelEdit = () => {
  editingTaskId.value = null;
};

//Favorite task
const favoriteTask = (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    task.favorite = !task.favorite;
  }
};

// Delete task
const deleteTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
    <!-- Column -->
    <div>
      <h2 class="text-lg font-semibold mb-2 text-[#2d2f33]">To Do</h2>

      <!-- Add Task Card -->
      <div class="bg-white border-none rounded-xl p-4 mb-4">
        <button
          v-if="!showNewForm"
          @click="showNewForm = true"
          class="flex items-center justify-center gap-2 text-[#2d2f33] font-medium not-[]:hover:underline cursor-pointer text-sm"
        >
          <span class="material-symbols-outlined">add_circle</span>
          Add New Task
        </button>

        <div v-else class="space-y-2">
          <input
            v-model="newTitle"
            placeholder="Task title"
            class="w-full border rounded px-2 py-1 text-sm"
          />
          <textarea
            v-model="newDescription"
            placeholder="Description (optional)"
            class="w-full border rounded px-2 py-1 text-sm"
          ></textarea>
          <div class="flex gap-2">
            <button
              @click="addTask"
              class="bg-[#226ce7] text-white px-3 py-1 text-sm rounded cursor-pointer"
            >
              Add
            </button>
            <button @click="showNewForm = false" class="text-sm text-[#2d2f33] cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- To Do Tasks -->
      <div v-for="task in filteredTasks('To Do')" :key="task.id">
        <div
          v-if="editingTaskId === task.id"
          class="bg-white p-4 mb-4 rounded-xl"
        >
          <input
            v-model="editedTitle"
            class="w-full border rounded px-2 py-1 mb-2 text-sm"
          />
          <textarea
            v-model="editedDescription"
            class="w-full border rounded px-2 py-1 mb-2 text-sm"
          />
          <div class="flex gap-2">
            <button
              @click="saveEdit"
              class="bg-[#226ce7] text-white px-3 py-1 text-sm rounded cursor-pointer"
            >
              Save
            </button>
            <button @click="cancelEdit" class="text-sm text-[#2d2f33] cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
        <TaskCard
          v-else
          :task="task"
          @edit="editTask"
          @favorite="favoriteTask"
          @delete="deleteTask"
        />
      </div>
    </div>

    <!-- In Progress -->
    <div>
      <h2 class="text-lg font-semibold mb-2 text-[#2d2f33]">In Progress</h2>
      <TaskCard
        v-for="task in filteredTasks('In Progress')"
        :key="task.id"
        :task="task"
        @delete="deleteTask"
      />
    </div>

    <!-- Completed -->
    <div>
      <h2 class="text-lg font-semibold mb-2 text-[#2d2f33]">Completed</h2>
      <TaskCard
        v-for="task in filteredTasks('Completed')"
        :key="task.id"
        :task="task"
        @delete="deleteTask"
      />
    </div>
  </div>
</template>
