<script setup>
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/taskStore';
import { useRouter } from 'vue-router';
import TaskHeader from '../components/TaskHeader.vue';
import TaskInput from '../components/TaskInput.vue';
import TaskFilter from '../components/TaskFilter.vue';
import TaskItem from '../components/TaskItem.vue';
//1.初始化任务状态管理
const taskStore = useTaskStore();
const router = useRouter();

//2.解构出状态和方法，并使用storeToRefs包裹状态以保持响应式
const { filter, filteredTasks } = storeToRefs(taskStore);
const {addTask, removeTask, toggleTask} = taskStore;

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
  router.push('/login');
};
</script>


<template>
  <div class="py-12 px-4">
    <div class="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
<!-- //TaskHeader组件 -->
      <TaskHeader />
      <main class="p-6">
        <TaskInput @add-task="addTask" />
        <TaskFilter v-model="filter" />
        <ul class="space-y-3">
          <TransitionGroup name="list">
          <TaskItem 
            v-for="task in filteredTasks" 
            :key="task.id" 
            :task="task"
            @toggle="toggleTask"
            @remove="removeTask"
          />
          </TransitionGroup>
        </ul>
        <button @click="handleLogout" class="mt-8 w-full py-2 text-xs text-slate-400 hover:text-red-500 transition-colors">
          Logout
        </button>
      </main>
    </div>
  </div>
</template>