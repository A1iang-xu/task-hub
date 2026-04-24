import { defineStore } from "pinia";
import { ref, computed,watch } from "vue";
import { useLocalStorage } from "../composables/useLocalStorage";
export const useTaskStore = defineStore('task-store', () => {
    //1.状态(State)
    const savedTask = localStorage.getItem('my-tasks');
    const tasks = useLocalStorage('my-tasks',[]);
    const filter = useLocalStorage('task-filter', 'all'); //当前任务过滤条件
    //2.派生状态(Getters)
        const filteredTasks = computed(() => {
    if (filter.value === 'active') return tasks.value.filter(t => !t.isCompleted);
    if (filter.value === 'completed') return tasks.value.filter(t => t.isCompleted);
    return tasks.value;
    })
    //   3.核心方法(Actions)
    const addTask = (title) => {
    tasks.value.unshift({ id: crypto.randomUUID(), title, isCompleted: false });
    }
    const removeTask = (id) => {
    tasks.value = tasks.value.filter(t => t.id !== id);
    }
    const toggleTask = (id) => {
    const task = tasks.value.find(t => t.id === id);
    if (task) task.isCompleted = !task.isCompleted;
    }
    //4.监听器(Watches)
    watch(tasks, (newVal) => {
    localStorage.setItem('my-tasks', JSON.stringify(newVal));
    }, { deep: true })

    return {
    tasks,
    filter,
    filteredTasks,
    addTask,
    removeTask,
    toggleTask
    }
})