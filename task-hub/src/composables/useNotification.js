// src/composables/useNotification.js
import { ref } from 'vue';
const message = ref('');
const isVisible = ref(false);

export function useNotification() {
  const notify = (msg, duration = 2000) => {
    message.value = msg;
    isVisible.value = true;
    setTimeout(() => {
      isVisible.value = false;
    }, duration);
  };

  return { message, isVisible, notify };
}