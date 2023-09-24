<template>
    <header>
        <nav class="bg-white border-b border-gray-300">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex items-center shrink-0">
                            <router-link to="/">
                                <Logo class="block w-auto h-9" />
                            </router-link>
                        </div>

                        <div class="flex ml-10 -my-px space-x-8">
                            <router-link to="/"
                                class="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                                Dashboard
                            </router-link>
                            <router-link to="/tasks"
                                class="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                                Tasks
                            </router-link>
                        </div>
                    </div>

                    <div class="inline-flex items-center gap-4">
                        <button @click="logout">Logout</button>
                    </div>


                </div>
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