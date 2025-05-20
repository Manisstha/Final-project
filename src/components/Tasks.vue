<script setup>
import { ref, onMounted } from "vue";
import TaskCard from "@/components/TaskCard.vue";
import { supabase } from "@/api/index";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskApi,
  toggleFavorite,
} from "@/api/tasksApi";

const props = defineProps({
  searchQuery: String,
  fromDate: String,
  toDate: String,
});

const tasks = ref([]);
const newTitle = ref("");
const newDescription = ref("");
const showNewForm = ref(false);

const addTitleError = ref({ title: "" });
const editTitleError = ref({ title: "" });

//Edit tasks
const editingTaskId = ref(null);
const editedTitle = ref("");
const editedDescription = ref("");

const user = ref(null);

//GET tasks from db
const fetchTasks = async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data?.user;

  if (!user.value?.id) {
    console.error("User not logged in or userId missing");
    return;
  }

  const tasksData = await getAllTasks(user.value.id);
  tasks.value = tasksData;
};

onMounted(fetchTasks);

// Add task
const addTask = async () => {
  addTitleError.value.title = "";

  const title = newTitle.value.trim();
  const description = newDescription.value.trim();

  if (!title) {
    addTitleError.value.title = "Title is required.";
  }

  if (addTitleError.value.title) return;

  if (!user.value?.id) return;

  const newTask = await createTask(title, description, user.value.id);
  if (newTask) {
    tasks.value.unshift(newTask);
  }
  newTitle.value = "";
  newDescription.value = "";
  showNewForm.value = false;
};

// Filter logic
const filteredTasks = (status) => {
  return tasks.value.filter((task) => {
    const matchesStatus = task.status === status;
    const matchesSearch = props.searchQuery
      ? task.title?.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
        task.description
          ?.toLowerCase()
          .includes(props.searchQuery.toLowerCase())
      : true;

    const formatDateOnly = (date) => {
      const d = new Date(date);
      return d.toISOString().split("T")[0];
    };

    const matchesDate =
      (!props.fromDate || formatDateOnly(task.created_at) >= props.fromDate) &&
      (!props.toDate || formatDateOnly(task.created_at) <= props.toDate);

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

const saveEdit = async () => {
  editTitleError.value.title = "";

  if (!editedTitle.value.trim()) {
    editTitleError.value.title = "Title is required.";
    return;
  }

  const id = editingTaskId.value;
  const updated = await updateTask(id, {
    title: editedTitle.value,
    description: editedDescription.value,
  });

  if (updated) {
    const index = tasks.value.findIndex((t) => t.id === id);
    if (index !== -1) tasks.value[index] = updated;
    editingTaskId.value = null;
  } else {
    console.error("Task update failed");
  }
};

const cancelEdit = () => {
  editingTaskId.value = null;
  editTitleError.value.title = "";
};

const cancelNewTask = () => {
  showNewForm.value = false;
  newTitle.value = "";
  newDescription.value = "";
  addTitleError.value.title = "";
};

const updateTaskStatus = async (id, newStatus) => {
  const updated = await updateTask(id, { status: newStatus });
  if (updated) {
    const index = tasks.value.findIndex((t) => t.id === id);
    if (index !== -1) tasks.value[index] = updated;
  }
};

//Favorite task
const favoriteTask = async (id) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    const updated = await toggleFavorite(id, task.favorite);
    if (updated) {
      const index = tasks.value.findIndex((t) => t.id === id);
      if (index !== -1) tasks.value[index] = updated;
    }
  }
};

// Delete task
const deleteTask = async (id) => {
  const success = await deleteTaskApi(id);
  if (success) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
    <!-- Column -->
    <div>
      <h2
        class="text-lg font-semibold mb-2 text-[#2d2f33] flex items-center gap-2"
      >
        <span class="w-3 h-3 rounded-full bg-blue-400 inline-block"></span>
        To Do
      </h2>

      <!-- Add Task Card -->
      <div class="bg-white border-none shadow-sm rounded-xl p-4 mb-4">
        <button
          v-if="!showNewForm"
          @click="showNewForm = true"
          class="flex items-center justify-center gap-2 text-[#2d2f33] font-medium cursor-pointer text-sm"
        >
          <span class="material-symbols-outlined">add_circle</span>
          Add New Task
        </button>

        <div v-else class="space-y-2">
          <div>
            <input
              v-model="newTitle"
              maxlength="100"
              placeholder="Task title"
              class="w-full border rounded px-2 py-1 text-sm"
            />
            <p v-if="addTitleError.title" class="text-red-500 text-sm mt-1">
              {{ addTitleError.title }}
            </p>
          </div>
          <div>
            <textarea
              v-model="newDescription"
              maxlength="500"
              placeholder="Description (optional)"
              class="w-full border rounded px-2 py-1 text-sm"
            ></textarea>
          </div>

          <div class="flex gap-2">
            <button
              @click="addTask"
              class="bg-[#226ce7] text-white px-3 py-1 text-sm rounded cursor-pointer"
            >
              Add
            </button>
            <button
              @click="cancelNewTask"
              class="text-sm text-[#2d2f33] cursor-pointer"
            >
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
          <div>
            <input
              v-model="editedTitle"
              maxlength="100"
              class="w-full border rounded px-2 py-1 mb-2 text-sm"
            />
            <p v-if="editTitleError.title" class="text-red-500 text-sm mb-2">
              {{ editTitleError.title }}
            </p>
          </div>
          <div>
            <textarea
              v-model="editedDescription"
              maxlength="500"
              class="w-full border rounded px-2 py-1 mb-2 text-sm"
            />
          </div>

          <div class="flex gap-2">
            <button
              @click="saveEdit"
              class="bg-[#226ce7] text-white px-3 py-1 text-sm rounded cursor-pointer"
            >
              Save
            </button>
            <button
              @click="cancelEdit"
              class="text-sm text-[#2d2f33] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
        <TaskCard
          :task="task"
          @edit="editTask"
          @favorite="favoriteTask"
          @delete="deleteTask"
          @statusChange="({ id, status }) => updateTaskStatus(id, status)"
        />
      </div>
    </div>

    <!-- In Progress -->
    <div>
      <h2
        class="text-lg font-semibold mb-2 text-[#2d2f33] flex items-center gap-2"
      >
        <span class="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
        In Progress
      </h2>
      <div v-for="task in filteredTasks('In Progress')" :key="task.id">
        <div
          v-if="editingTaskId === task.id"
          class="bg-white p-4 mb-4 rounded-xl"
        >
          <div>
            <input
              v-model="editedTitle"
              maxlength="100"
              class="w-full border rounded px-2 py-1 mb-2 text-sm"
            />
            <p v-if="editTitleError.title" class="text-red-500 text-sm mb-2">
              {{ editTitleError.title }}
            </p>
          </div>
          <div>
            <textarea
              v-model="editedDescription"
              maxlength="500"
              class="w-full border rounded px-2 py-1 mb-2 text-sm"
            />
          </div>
          <div class="flex gap-2">
            <button
              @click="saveEdit"
              class="bg-[#226ce7] text-white px-3 py-1 text-sm rounded cursor-pointer"
            >
              Save
            </button>
            <button
              @click="cancelEdit"
              class="text-sm text-[#2d2f33] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
        <TaskCard
          :task="task"
          @edit="editTask"
          @favorite="favoriteTask"
          @delete="deleteTask"
          @statusChange="({ id, status }) => updateTaskStatus(id, status)"
        />
      </div>
    </div>

    <!-- Completed -->
    <div>
      <h2
        class="text-lg font-semibold mb-2 text-[#2d2f33] flex items-center gap-2"
      >
        <span class="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
        Completed
      </h2>
      <div v-for="task in filteredTasks('Completed')" :key="task.id">
        <div
          v-if="editingTaskId === task.id"
          class="bg-white p-4 mb-4 rounded-xl"
        >
          <div>
            <input
              v-model="editedTitle"
              maxlength="100"
              class="w-full border rounded px-2 py-1 mb-2 text-sm"
            />
            <p v-if="editTitleError.title" class="text-red-500 text-sm mb-2">
              {{ editTitleError.title }}
            </p>
          </div>
          <div>
            <textarea
              v-model="editedDescription"
              maxlength="500"
              class="w-full border rounded px-2 py-1 mb-2 text-sm"
            />
          </div>
          <div class="flex gap-2">
            <button
              @click="saveEdit"
              class="bg-[#226ce7] text-white px-3 py-1 text-sm rounded cursor-pointer"
            >
              Save
            </button>
            <button
              @click="cancelEdit"
              class="text-sm text-[#2d2f33] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
        <TaskCard
          :task="task"
          @edit="editTask"
          @favorite="favoriteTask"
          @delete="deleteTask"
          @statusChange="({ id, status }) => updateTaskStatus(id, status)"
        />
      </div>
    </div>
  </div>
</template>
