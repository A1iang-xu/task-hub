<script setup>
const modelValue = defineModel(); //定义v-model绑定的变量

const filters = ['all', 'active', 'completed']; //定义过滤条件列表
</script>

<template>
    <div class="flex p-1 bg-slate-100 rounded-xl mb-6">
    <button v-for="f in filters" :key="f" @click="modelValue = f" :class="[
       'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all capitalize',
       modelValue === f ? 'bg-white text-brand shadow-sm' : 'text-slate-500']">
        {{ f }}
    </button>
    </div>
</template>