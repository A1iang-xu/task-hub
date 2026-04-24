<script setup lang="ts">
import router from './router';
import { useNotification } from './composables/useNotification';
const { message, isVisible } = useNotification();
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <div v-if="isVisible" class="fixed top-5 left-1/2 -translate-x-1/2 bg-black/80 text-white px-5 py-2 rounded-lg shadow-lg z-9999">
    {{ message }}
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