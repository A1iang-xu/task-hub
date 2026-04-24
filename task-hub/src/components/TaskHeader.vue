<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/taskStore';
//1.初始化任务状态管理
const taskStore = useTaskStore();
//2.解构出状态和方法，并使用storeToRefs包裹状态以保持响应式
const { tasks } = storeToRefs(taskStore);
//3.编写进度逻辑
const progress = computed(() => {
    const total = tasks.value.length;
  if (total === 0) return 0;
  const completedCount = tasks.value.filter(t => t.isCompleted).length;
  return Math.round((completedCount / total) * 100);
});

</script>


<template>  
    <header class="bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white">
        <h1 class="text-3xl font-black tracking-tight">Task Hub</h1>
        <div class="mt-6">
            <div class="flex justify-between items-end mb-2">
                <p class="text-blue-100/80 text-xs font-bold uppercase tracking-wider">完成进度: </p>
                <span class="text-2xl font-mono font-black">{{ progress }}%</span>
            </div>
            <div class="h-2 w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div class="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-500 ease-out"
                    :style="{ width: `${progress}%` }">
                </div>
            </div>
        </div>
    </header>
</template>