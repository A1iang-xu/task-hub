import {ref} from 'vue';

export function useNotification() {
    const message = ref('');
    const isvisible = ref(false);
    const notify = (msg,duration = 2000) => {
        message.value = msg;
        isvisible.value = true;
        setTimeout(() => {
            isvisible.value = false;
        }, duration);
    };

    return {
        message,
        isvisible,
        notify
    };
}