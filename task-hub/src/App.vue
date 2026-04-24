<script setup lang="ts">
import router from './router';

</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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