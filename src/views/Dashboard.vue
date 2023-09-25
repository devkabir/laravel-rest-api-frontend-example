<template>
    <header class="bg-white border-b border-gray-200">

        <nav class="bg-white shadow mx-auto  px-4 sm:px-6 lg:px-8 py-2 flex justify-between">
            <div class="flex gap-4 items-center">
                <router-link to="/">
                    <Logo class="block w-auto h-9" />
                </router-link>
                <router-link to="/"
                    class="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                    Dashboard
                </router-link>
                <router-link to="/tasks"
                    class="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                    Tasks
                </router-link>
            </div>
            <div class="inline-flex items-center gap-4">
                <span>{{ user?.name }}</span>
                <button @click="logout">Log out</button>
            </div>
        </nav>

    </header>

    <!-- Page Content -->
    <main>
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import router from '@/router';
import { useFetchStore } from '@/stores/fetch';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
const { getUser, logout } = useUserStore()
const { user } = storeToRefs(useUserStore())
onBeforeMount(getUser)

</script>

<style scoped></style>