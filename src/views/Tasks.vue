<template>
    <div>
        <div class="flex items-center justify-between p-4 mx-auto shadow max-w-7xl bg-gray-50">
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Tasks
            </h2>
            <button type="button" class="primary" @click="$router.push('/tasks/create')">Create New</button>
        </div>
        <div class="p-8">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';


</script>

<style scoped></style>