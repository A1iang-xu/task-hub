<script setup>
import { storeToRefs } from 'pinia';
import { useTaskStore } from './stores/taskStore';
import TaskHeader from './components/TaskHeader.vue';
import TaskInput from './components/TaskInput.vue';
import TaskFilter from './components/TaskFilter.vue';
import TaskItem from './components/TaskItem.vue';
//1.初始化任务状态管理
const taskStore = useTaskStore();
//2.解构出状态和方法，并使用storeToRefs包裹状态以保持响应式
const { filter, filteredTasks } = storeToRefs(taskStore);
const {addTask, removeTask, toggleTask} = taskStore;
</script>


<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-md mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
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
        <div v-if="filteredTasks.length === 0" class="text-center py-12 text-slate-400 text-sm">
          没有任务，快去添加一个吧！
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28); 
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>