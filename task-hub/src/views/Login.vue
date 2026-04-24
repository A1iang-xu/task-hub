<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);

const handleLogin = () => {
  isLoading.value = true;
  setTimeout(() => {
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/');
    isLoading.value = false;
  }, 1000);
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="p-8 bg-white rounded-3xl shadow-xl w-full max-w-sm border border-slate-100">
      <h2 class="text-2xl font-black mb-6 text-slate-800">Welcome Back!</h2>
      <button @click="handleLogin" 
      :disabled="isLoading" 
      class="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
      <p class="mt-4 text-center text-xs text-slate-400">测试环境：点击即可登录</p>
    </div>
  </div>
</template>

