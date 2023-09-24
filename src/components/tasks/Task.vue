<template>
    <div class="grid items-center gap-6 p-4 shadow bg-gray-50">
        <h1 class="font-semibold text-gray-600">{{ task.name }}</h1>
        <p class="text-gray-500">{{ task.description }}</p>
        <div class="flex justify-between w-full gap-4">
            <button @click="$router.push({ name: 'TaskDetails', params: { id: task.id } })">View</button>
            <button class="danger" @click="deleteTask(task.id)">Delete</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task';

defineProps({
    task: {
        type: Object,
        required: true
    }
})
const { deleteTask } = useTaskStore()
</script>

<style scoped></style>