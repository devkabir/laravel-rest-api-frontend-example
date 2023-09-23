<template>
    <div class="flex flex-col items-center h-full py-8 my-8">
        <div>
            <router-link to="/">
                <Logo class="w-20 h-20 text-gray-500 fill-current" />
            </router-link>
        </div>

        <div class="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import { RouterView } from 'vue-router';

</script>

<style scoped></style>