<script setup>
import {ref} from 'vue';

//定义组件向外抛出的时间名
const emit = defineEmits(['add-task']);
const title = ref(''); //输入框绑定的变量  
const handleSubmit = () => {
  const value = title.value.trim();
  if (value === '') return; //防止添加空任务
  emit('add-task', value); //向父组件抛出事件并传递新任务标题
  title.value = ''; //清空输入框
};
</script>

<template>
    <div class="flex gap-2 mb-8">
        <input v-model="title" 
        @keyup.enter="handleSubmit" type="text" 
        placeholder="添加新任务..." class="flex-1 bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-brand/50 outline-none transition-all"/>
        <button @click="handleSubmit" class="bg-brand text-white px-6 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all">
            +
        </button>
    </div>
</template>