<template>
    <div class="grid grid-cols-1 gap-6 my-8 xl:grid-cols-3" ref="el" v-if="tasks">
        <Task v-for="task in tasks" :key="task.id" :task="task" />
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3" v-if="loading">
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
    </div>
    <p v-if="!loading && !Object.values(tasks).length">No tasks</p>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Task from './Task.vue';
import TaskSkeleton from '@/components/skeletons/TaskSkeleton.vue';
import { useTaskStore } from '@/stores/task';
import { useFetchStore } from '@/stores/fetch';
import { onBeforeMount } from 'vue';
const { tasks } = storeToRefs(useTaskStore());
const { getTasks, loadTasks } = useTaskStore();
const { loading } = storeToRefs(useFetchStore());


window.onscroll = () => {
    let bottomOfWindow = Math.ceil(document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight;

    if (bottomOfWindow) {
        loadTasks();
    }
}

onBeforeMount(() => {
    getTasks();
})
</script>

<style scoped></style>