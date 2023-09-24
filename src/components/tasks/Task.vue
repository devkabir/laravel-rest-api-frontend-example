<template>
    <div class="grid items-center gap-6 p-4 shadow bg-gray-50">
        <h1 class="font-semibold text-gray-600">{{ task.name }}</h1>
        <h3 class="text-gray-500">Created by {{ task.creator.name }}</h3>
        <p class="text-gray-500">{{ task.description }}</p>
        <ul class="grid grid-cols-2 gap-4 mt-4 text-gray-500">
            <li>Comments: {{ task.comments_count }}</li>
            <li>Assignees: {{ task.users_count }}</li>
            <li>Created: {{ task.created_at }}</li>
            <li>Updated: {{ task.updated_at }}</li>
        </ul>
        <div class="flex justify-between w-full gap-4">
            <button @click="$router.push({ name: 'TaskDetails', params: { id: task.id } })">View</button>
            <button class="danger" @click="handleDelete(task.id)">Delete</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import { handleError } from 'vue';

defineProps({
    task: {
        type: Object,
        required: true
    }
})
const { deleteTask } = useTaskStore()

const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
        deleteTask(id)
    }
}
</script>

<style scoped></style>