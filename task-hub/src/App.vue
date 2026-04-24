<script setup>
import {ref, computed} from 'vue'
//1.任务数据模型:
const tasks = ref([
  {id: '1', title: '体验Tailwind特性', isCompleted: false},
  {id: '2', title: '掌握Composition API', isCompleted: true}
]);
const newTaskTitle = ref(''); //新任务标题输入框绑定的变量
const currentFilter = ref('all'); //当前任务过滤条件

//2.核心方法
const addTask = () => {
  const title = newTaskTitle.value.trim();
  if (title === '') return; //防止添加空任务
  tasks.value.unshift({
    id: crypto.randomUUID(), 
    title,
    isCompleted: false
  }); //创建新任务对象并添加到任务列表开头
  newTaskTitle.value = ''; //清空输入框

};
  const removeTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id); //通过过滤掉指定id的任务来删除
  };
  const toggleTask = (id) => {
    const task = tasks.value.find(task => task.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted; //切换任务完成状态
    }
  };

  // 3.计算属性:根据当前过滤条件返回相应的任务列表
  const filteredTasks = computed(() => {
    if (currentFilter.value === 'active') {
      return tasks.value.filter(task => !task.isCompleted); //返回未完成任务
    } 
    if (currentFilter.value === 'completed') {
      return tasks.value.filter(task => task.isCompleted); //返回已完成任务
    }
    return tasks.value; //返回所有任务
  });
</script>

<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-md mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
      <header class="bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white">
        <h1 class="text-3xl font-black tracking-tight">Task Hub</h1>
        <p class="text-blue-100/80 text-sm">Vue3+Tailwind</p>
      </header>
      <main class="p-6">
        <div class="flex gap-2 mb-8">
          <input v-model="newTaskTitle" @keyup.enter="addTask" type="text" placeholder="添加新任务..." class="flex-1 bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand/50 outline-none transition-all"/>
          <button @click="addTask" class="bg-brand text-white px-6 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all">+</button>
        </div>
        <div class="flex p-1 bg-slate-100 rounded-xl mb-6">
          <button v-for="f in ['all', 'active', 'completed']" :key="f" @click="currentFilter = f" :class="['flex-1 py-1.5 text-xs font-bold rounded-lg transition-all capitalize',
             currentFilter === f ? 'bg-white text-brand shadow-sm' : 'text-slate-500']">
            {{ f }}
          </button>
        </div>
        <ul class="space-y-3">
          <TransitionGroup name="list">
          <li v-for="task in filteredTasks" :key="task.id" class="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-white transition-all">
            <div class="flex items-center gap-3">
              <input type="checkbox" :checked="task.isCompleted"
                @change="toggleTask(task.id)"
                class="w-5 h-5 accent-brand cursor-pointer"/>
              <span :class="['text-slate-700 font-medium', task.isCompleted ? 'line-through text-slate-400 opacity-50' : '']">
                {{ task.title }}
              </span>
            </div>
            <button @click="removeTask(task.id)" class="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all p-1">
              ✕
            </button>
          </li>
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