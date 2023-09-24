<template>
    <div class=" flex items-center justify-between p-4 mx-auto shadow bg-white w-full">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            Tasks
        </h2>
        <button type="button" class="primary" @click="$router.push('/tasks/create')">Create New</button>
    </div>
    <div class="m-8">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';


</script>

<style scoped></style>